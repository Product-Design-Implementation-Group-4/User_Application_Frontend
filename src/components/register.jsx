import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import "../App.css";
import "../index.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [photo, setPhoto] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!email || !password || !confirmPassword || !fname || !lname) {
      alert("All fields are required!");
      return;
    }
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "bottom-center",
      });
      return;
    }
  
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const defaultPhotoURL = "https://firebasestorage.googleapis.com/v0/b/testandroidpro-179da.appspot.com/o/profile_pictures%2F20200226_004549156_iOS.png?alt=media&token=87c5c172-ca08-4822-a52d-090f548395f0";
  
      let photoURL = defaultPhotoURL;
  
      if (photo) {
        const storageRef = ref(getStorage(), `profile_pictures/${user.uid}`);
        try {
          const snapshot = await uploadBytes(storageRef, photo);
          const url = await getDownloadURL(snapshot.ref);
          photoURL = url;
          alert("Profile picture uploaded successfully!");
        } catch (error) {
          alert("Failed to upload profile picture: " + error.message);
          toast.error("Failed to upload photo", {
            position: "bottom-center",
          });
        }
      }
  
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: photoURL,
        });
      }
  
      alert("User registered successfully!");
      toast.success("User Registered Successfully!", {
        position: "top-center",
      });
  
      navigate("/profile");
    } catch (error) {
      alert("Error during registration: " + error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };
  
  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setPhoto(file); 
    } else {
      toast.error("Please upload a valid image file", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <form onSubmit={handleRegister} className="form">
          <h3>Sign Up</h3>
          
          
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your first name"
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your last name"
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>

          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          
          <div className="form-group">
            <label>Profile Picture</label>
            <input
              type="file"
              className="form-control"
              onChange={handlePhotoChange} 
            />
          </div>

          
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          
          <div className="form-footer">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
