import React, { useEffect, useState } from "react";
import { auth, db, storage } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import '../ProfileEdit.css';

function ProfileEdit() {
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  const [profilePicture, setProfilePicture] = useState(""); 
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadingProfilePic, setUploadingProfilePic] = useState(false); 
  const [uploadingImages, setUploadingImages] = useState(false); 
  const navigate = useNavigate();

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            setEditedDetails(docSnap.data()); 
            setProfilePicture(docSnap.data()?.photo || ""); 
            setUploadedImages(docSnap.data()?.uploadedImages || []); 
          } else {
            alert("No user data found in Firestore.");
          }
        } catch (error) {
          alert(`Error fetching user data: ${error.message}`);
        }
      }
    });

    return () => unsubscribe();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSaveDetails = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        await updateDoc(docRef, { ...editedDetails, photo: profilePicture, uploadedImages });
        setUserDetails((prev) => ({ ...prev, ...editedDetails, photo: profilePicture, uploadedImages }));
        setIsEditing(false); 
        alert("Profile updated successfully!");
      }
    } catch (error) {
      alert(`Error updating profile: ${error.message}`);
    }
  };


  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingProfilePic(true); 
      const fileName = `profile_pictures/${auth.currentUser.uid}_${file.name}`;
      const fileRef = ref(storage, fileName);

      try {
        const uploadTask = uploadBytesResumable(fileRef, file);
        await uploadTask;

        const downloadURL = await getDownloadURL(fileRef);
        setProfilePicture(downloadURL); 
        setUploadingProfilePic(false); 
      } catch (error) {
        console.error("Error uploading profile picture: ", error);
        alert("Error uploading profile picture, please try again.");
        setUploadingProfilePic(false); 
      }
    }
  };


  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploadingImages(true); 
    const uploadedFiles = [];

    for (const file of files) {
      const fileName = `${auth.currentUser.uid}_${file.name}`; 
      const fileRef = ref(storage, `users/cars/${fileName}`);

      try {
        const uploadTask = uploadBytesResumable(fileRef, file);
        await uploadTask;

        const downloadURL = await getDownloadURL(fileRef);
        uploadedFiles.push(downloadURL);
      } catch (error) {
        console.error("Error uploading image: ", error);
        alert("Error uploading image, please try again.");
      }
    }

    setUploadedImages((prevState) => [...prevState, ...uploadedFiles]);
    setUploadingImages(false);
  };

 
  const handleSaveUploadedImages = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        await updateDoc(docRef, { uploadedImages });
        setUserDetails((prev) => ({ ...prev, uploadedImages }));
        alert("Uploaded images saved successfully!");
      }
    } catch (error) {
      alert(`Error saving images: ${error.message}`);
    }
  };


  const handleRemoveImage = async (imageURL) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this image?");
      if (!confirmed) return;


      setUploadedImages((prevState) => prevState.filter((image) => image !== imageURL));


      const imageName = decodeURIComponent(imageURL.split("/o/").pop().split("?")[0]);
      const path = imageName.replace("users%2Fcars%2F", "users/cars/");
      const imageRef = ref(storage, path);

      await deleteObject(imageRef);
      console.log("Image removed from storage");

      alert("Image removed successfully!");
    } catch (error) {
      console.error("Error removing image from storage:", error);
      alert("Error removing image, please try again.");
    }
  };

  return (
    <div>
      <div className="app-container">
        <Navbar  />
        <button 
        onClick={() => navigate("/")} 
        className="back-button" 
        style={{
          position: "absolute",
          top: "200px",
          left: "5px",
          padding: "5px 5px",  
          fontSize: "12px",      
          backgroundColor: "#007bff", 
          color: "white",        
          border: "none",        
          borderRadius: "5px", 
          cursor: "pointer",      
          width: "100px", 
          height: "auto", 
        }}
      >
        Home
      </button>
        <div className="profile-content">
          <div className="profile-section">
            {isEditing ? (
              <>
                <h1>Edit Profile</h1>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={editedDetails.name || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Phone:
                  <input
                    type="text"
                    name="phone"
                    value={editedDetails.phone || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Location:
                  <input
                    type="text"
                    name="location"
                    value={editedDetails.location || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    name="description"
                    value={editedDetails.description || ""}
                    onChange={handleInputChange}
                  />
                </label>

              
                <div>
                  <label>Upload Profile Picture:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                  />
                  {uploadingProfilePic && <p>Uploading...</p>}
                  {profilePicture && !uploadingProfilePic && (
                    <img src={profilePicture} alt="Profile" style={{ width: "150px", borderRadius: "50%" }} />
                  )}
                </div>

                <button onClick={handleSaveDetails}>Save Profile</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            ) : (
              <>
                <h1>Welcome, {userDetails?.name || "User"}</h1>
                <p><strong>Email:</strong> {userDetails?.email}</p>
                <p><strong>Phone:</strong> {userDetails?.phone || "Not provided"}</p>
                <p><strong>Location:</strong> {userDetails?.location || "Not provided"}</p>
                <p><strong>Description:</strong> {userDetails?.description || "No description available"}</p>
                {userDetails?.photo && <img src={userDetails.photo} alt="Profile" style={{ width: "150px", borderRadius: "50%" }} />}
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              </>
            )}
          </div>

        
          <div className="images-section">
            <h3>Upload Car Images or Others:</h3>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            {uploadingImages && <p>Uploading images...</p>}
            <div className="image-preview-container">
              {uploadedImages.map((imageURL, index) => (
                <div key={index} className="image-preview">
                  <img src={imageURL} alt={`Uploaded ${index}`} className="uploaded-image" />
                  <button
                    className="delete-image-button"
                    onClick={() => handleRemoveImage(imageURL)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleSaveUploadedImages}>Save Images</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
