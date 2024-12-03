import React, { useEffect, useState } from "react";
import { auth, db, storage } from "./firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { deleteObject, ref, getMetadata } from "firebase/storage";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import "./Profile.css";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
  
          if (!docSnap.exists()) {
            console.warn("User data not found, retrying...");
            setTimeout(async () => {
              const retrySnap = await getDoc(docRef);
              if (retrySnap.exists()) {
                setUserDetails(retrySnap.data());
              } else {
                alert("No user data found in Firestore.");
              }
            }, 1000); 
          } else {
            setUserDetails(docSnap.data());
          }
        } catch (error) {
          alert(`Error fetching user data: ${error.message}`);
        }
      }
    });
  
    return () => unsubscribe();
  }, []);

  const handleReauthentication = async () => {
    const user = auth.currentUser;
    if (user) {
      const password = prompt("Please enter your password to confirm deletion:");
      if (!password) {
        alert("Reauthentication cancelled.");
        return false;
      }

      try {
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
        return true;
      } catch (error) {
        alert(`Reauthentication failed: ${error.message}`);
        return false;
      }
    }
    return false;
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmed) return;

    try {
      const userDocRef = doc(db, "Users", user.uid);
      await deleteDoc(userDocRef);

      if (userDetails?.photo) {
        const photoRef = ref(storage, `profile_pictures/${user.uid}`);
        try {
          await getMetadata(photoRef);
          await deleteObject(photoRef);
        } catch (error) {
          if (error.code !== "storage/object-not-found") {
            throw error;
          }
        }
      }

      await user.delete();

      alert("Account deleted successfully.");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        alert("Session expired. Please reauthenticate to delete your account.");
        const reauthenticated = await handleReauthentication();
        if (reauthenticated) {
          handleDeleteAccount();
        }
      } else {
        alert(`Error deleting account: ${error.message}`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert("User logged out successfully!");
      navigate("/");
    } catch (error) {
      alert(`Error logging out: ${error.message}`);
    }
  };

  const navigateToForm = () => {
    navigate("/submit-form");
  };

  const navigateToEdit = () => {
    navigate("/profile-edit");
  };

  return (
    <div className="profile-euniq-container">
  <Navbar
    userDetails={userDetails}
    handleLogout={handleLogout}
    handleDeleteAccount={handleDeleteAccount}
  />
  <div className="profile-euniq-content">
    
    <div className="profile-euniq-helper-box">
      <h2>Want to be a Helper?</h2>
      <p>Click below to fill out the form and become a helper.</p>
      <button className="profile-euniq-helper-button" onClick={navigateToForm}>
        Submit Form
      </button>
      <h2>Want to edit profile?</h2>
      <p>Click below to edit your profile.</p>
      <button className="profile-euniq-helper-button" onClick={navigateToEdit}>
        Profile Edit
      </button>
    </div>

    
    <div className="profile-euniq-right">
     
      <div className="profile-euniq-images">
        {userDetails?.uploadedImages && userDetails.uploadedImages.length > 0 ? (
          <div>
            <h3>Uploaded Images:</h3>
            <ul className="profile-euniq-image-gallery">
              {userDetails.uploadedImages.map((imageURL, index) => (
                <li key={index}>
                  <img src={imageURL} alt={`Uploaded ${index}`} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No images uploaded.</p>
        )}
      </div>

      
      <div className="profile-euniq-info-main">
        <h1>
          Welcome
        </h1>
        <h2>{" "}
        {userDetails?.name || `${userDetails?.firstName} ${userDetails?.lastName}`}</h2>
        <p><strong>Email: {userDetails?.email}</strong></p>
        <p><strong>Phone: {userDetails?.phone || "Not provided"}</strong></p>
        <p><strong>Location: {userDetails?.location || "Not provided"}</strong></p>
        <p><strong>Helper Type: {userDetails?.helperType || "Not specified"}</strong></p>
        <p><strong>Description: {userDetails?.description || "No description available"}</strong></p>
      </div>
    </div>
  </div>
</div>

  );
  
}

export default Profile;