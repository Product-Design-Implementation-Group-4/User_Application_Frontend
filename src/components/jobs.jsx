import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import "./Jobs.css";

function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [lastVisible, setLastVisible] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  return (
    <div>
      <NavbarHome />
      <div>
  <button
    onClick={() => navigate(-1)}
    className="back-button"
    style={{
      position: "fixed", // Corrected syntax for position
      top: "200px", // Distance from the top
      right: "5px", // Distance from the right
      padding: "5px 5px", // Padding for the button
      fontSize: "12px", // Font size for text
      backgroundColor: "#007bff", // Button background color
      color: "white", // Text color
      border: "none", // Remove border
      borderRadius: "5px", // Rounded corners
      cursor: "pointer", // Pointer cursor for better UX
      width: "100px", // Button width
      height: "auto", // Auto height to fit content
    }}
  >
    Back
  </button>
</div>
      <div className="jobs-container">
        <h1>Job Listings</h1>
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="job-description">
                <p>{job.description}</p>
              </div>
              <div className="job-details">
                <p>
                  <strong>Name:</strong> <span>{job.name}</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>{job.email}</span>
                </p>
                <p>
                  <strong>Phone:</strong> <span>{job.phone}</span>
                </p>
                <p>
                  <strong>Helper Type:</strong> <span>{job.helperType}</span>
                </p>
                <p>
                  <strong>Location:</strong> <span>{job.location}</span>
                </p>
                <p>
                  <strong>Posted At:</strong> <span>{new Date(job.createdAt.seconds * 1000).toLocaleString()}</span>
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
