import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/home";
import Support from "./components/support";
import Contacts from "./components/contact";
import Services from "./components/services";
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
      setLoading(false); // Ensure we stop the loading state once the user state is set
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Show a loading spinner or message until user authentication status is determined
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
