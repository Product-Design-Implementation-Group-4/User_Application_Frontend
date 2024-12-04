import React from "react";
import { Link } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import UserList from "../components/users/UserList";
import "./Home.css";

function Home() {
  return (
    <div>
      <NavbarHome />
      <main>
        <div className="home__helper-box">
          <p>
            Want to be a Helper? Click to Log In and become a helper. <Link to="/login">LOG IN</Link>
          </p>
          <p>
            Want to post a Job? Click to Job Post. <Link to="/job-post">JOB POST</Link>
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