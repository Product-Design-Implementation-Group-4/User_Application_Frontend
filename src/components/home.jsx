import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Assuming you have a global stylesheet

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1 className="logo">My App</h1>
        <div className="nav-buttons">
          <button className="nav-button" onClick={handleLogin}>
            Login
          </button>
          <button className="nav-button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </nav>
      <main className="home-content">
        <h1>Welcome to My App!</h1>
        <p>
          This is your one-stop solution for connecting with helpers and managing
          your profile seamlessly. Sign in or sign up to get started.
        </p>
      </main>
    </div>
  );
}

export default Home;
