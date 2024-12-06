import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import "./Jobs.css";

function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState({});
  const [infoVisible, setInfoVisible] = useState(false); // State to control info box visibility

  const PAGE_SIZE = 5;

  const fetchJobs = async (reset = false) => {
    setLoading(true);
    const db = getFirestore();
    const jobsCollection = collection(db, "Jobs");
    const jobsQuery = query(
      jobsCollection,
      orderBy("createdAt", "desc"),
      reset ? limit(PAGE_SIZE) : startAfter(lastVisible || 0),
      limit(PAGE_SIZE)
    );

    const snapshot = await getDocs(jobsQuery);

    if (!snapshot.empty) {
      const jobsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setJobs((prevJobs) => (reset ? jobsList : [...prevJobs, ...jobsList]));
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchJobs(true);
  }, []);

  const handleEditClick = (jobId) => {
    if (editingJobId === jobId) {
      saveJobChanges(jobId);
    } else {
      const job = jobs.find((job) => job.id === jobId);
      setEditedJob({ ...job });
      setEditingJobId(jobId);
    }
  };

  const saveJobChanges = async (jobId) => {
    const db = getFirestore();
    const jobDocRef = doc(db, "Jobs", jobId);

    try {
      await updateDoc(jobDocRef, editedJob);

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, ...editedJob } : job
        )
      );

      setEditingJobId(null);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedJob((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeleteJob = async (jobId) => {
    const db = getFirestore();
    const jobDocRef = doc(db, "Jobs", jobId);

    try {
      await deleteDoc(jobDocRef);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const toggleInfo = () => {
    setInfoVisible(!infoVisible); // Toggle the visibility of the info box
  };

  return (
    <div>
      <NavbarHome />
      <div className="jobs-container">
        {/* Info button at the top right */}
        <button className="info-btn" onClick={toggleInfo}>
          Info
        </button>

        {/* Info box content */}
        {infoVisible && (
          <div className="info-box">
            <p>
              This page contains the information about your posted job. If you want to edit or delete your posted job hover your cursor to the right top and bottom right corner of your posted job box.
            </p>
          </div>
        )}

        <h1>Job Listing</h1>

        <div className="jobs-grid">
          {jobs.map((job) => (
            <div
              className={`job-card ${editingJobId === job.id ? "editing" : ""}`}
              key={job.id}
            >
              <button
                className="edit-btn"
                onClick={() => handleEditClick(job.id)}
              >
                {editingJobId === job.id ? "Save" : "Edit"}
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteJob(job.id)}
              >
                Delete
              </button>
              <div className="job-description">
                {editingJobId === job.id ? (
                  <textarea
                    value={editedJob.description || ""}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="editable-textarea"
                  />
                ) : (
                  <p>{job.description}</p>
                )}
              </div>
              <div className="job-details">
                {["name", "email", "phone", "helperType", "location"].map(
                  (field) => (
                    <p key={field}>
                      <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{" "}
                      {editingJobId === job.id ? (
                        <input
                          type="text"
                          value={editedJob[field] || ""}
                          onChange={(e) =>
                            handleInputChange(field, e.target.value)
                          }
                          className="editable-input"
                        />
                      ) : (
                        <span>{job[field]}</span>
                      )}
                    </p>
                  )
                )}
                <p>
                  <strong>Posted At:</strong>{" "}
                  <span>
                    {new Date(job.createdAt.seconds * 1000).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {loading && <p>Loading...</p>}
        {hasMore && !loading && (
          <button onClick={() => fetchJobs()} className="load-more-btn">
            Load More
          </button>
        )}
        {!hasMore && <p>No more jobs available</p>}
      </div>
    </div>
  );
}

export default Jobs;
