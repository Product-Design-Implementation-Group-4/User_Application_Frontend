import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Change here

import Home from "./components/home";
import Support from "./components/support";
import Ticket from "./components/Ticket";
import Contacts from "./components/contact";
import Services from "./components/services";
import About from "./components/about";
import Login from "./components/login";
import SignUp from "./components/register";
import Profile from "./components/profile";
import SubmitForm from "./components/submitForm";
import JobPost from "./components/jobPost";
import Jobs from "./components/jobs";
import ProfileEdit from "./components/profileEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/support" element={<Support />} />
              <Route path="/Ticket" element={<Ticket />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contacts />} />
              <Route path="/job-post" element={<JobPost/>} />
              <Route path="/jobs" element={<Jobs/>} />
              <Route
                path="/login"
                element={user ? <Navigate to="/profile" /> : <Login />}
              />
              <Route
                path="/register"
                element={user ? <Navigate to="/profile" /> : <SignUp />}
              />
              <Route
                path="/profile"
                element={user ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
                path="/submit-form"
                element={user ? <SubmitForm /> : <Navigate to="/login" />}
              />
              <Route
                path="/profile-edit"
                element={user ? <ProfileEdit /> : <Navigate to="/login" />}
              />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
