import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
            console.log("No user data found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        console.log("User is not logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

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
        console.log("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="app-container">
      <Navbar userDetails={userDetails} handleLogout={handleLogout} />
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
