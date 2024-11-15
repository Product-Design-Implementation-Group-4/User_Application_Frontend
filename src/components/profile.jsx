import React, { useEffect, useState } from "react";
import { auth, db, storage } from "./firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { deleteObject, ref, getMetadata } from "firebase/storage";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import Navbar from "./navbar";
import "../App.css";
import "../index.css";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: ""
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserDetails(data);
            setFormData({
              name: data.name || "",
              email: data.email || user.email,
              phone: data.phone || "",
              location: data.location || ""
            });
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

      
      if (userDetails.photo) {
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
      window.location.href = "/"; 
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      const userRef = doc(db, "Users", auth.currentUser.uid);
      try {
        await setDoc(userRef, formData, { merge: true });
        alert("Profile updated successfully!");
      } catch (error) {
        alert(`Error updating profile: ${error.message}`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert("User logged out successfully!");
      window.location.href = "/login"; 
    } catch (error) {
      alert(`Error logging out: ${error.message}`);
    }
  };

  return (
    <div className="app-container">
      <Navbar userDetails={userDetails} handleLogout={handleLogout} handleDeleteAccount={handleDeleteAccount} />
      <div className="profile-container">
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <select name="location" value={formData.location} onChange={handleChange} required>
              <option value="">Select location</option>
              <option value="Oulu">Oulu</option>
              <option value="Helsinki">Helsinki</option>
              <option value="Tampere">Tampere</option>
              <option value="Turku">Turku</option>
              <option value="Vasa">Vasa</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
