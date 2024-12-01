import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import UserList from "../components/users/UserList";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <NavbarHome />
      <main>
        <div className="home__helper-box">
          <p>
            Want to be a Helper? Click to Log In and become a helper. <a href="/login">LOG IN</a>
          </p>
          <p>
            Want to post a Job? Click to Job Post. <a href="/job-post">JOB POST</a>
          </p>
        </div>
      
        <div className="home__profile-content">
          <UserList />
        </div>
      </main>
    </div>
  );
}

export default Home; 