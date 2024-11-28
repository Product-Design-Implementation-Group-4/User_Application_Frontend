import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import UserList from "../components/users/UserList";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handlePost = () => {
    navigate("/login");
  };
  return (
    <div>
      <NavbarHome/>
      <main>
        <div className="helper-box">
          <p>
            Want to be a Helper? Click to Log In and become a helper. <a href="/login">LOG IN</a>
          </p>
          <p>
          Want to post a Job? Click to Job Post. <a href="/login">JOB POST</a>
          </p>
        </div>
      
      <div className="profile-content">
        <UserList />
        </div>
      </main>
    </div>
  );
}

export default Home;
