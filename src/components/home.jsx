import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div>
      <NavbarHome onLogin={handleLogin} onSignUp={handleSignUp} />
      <main>
        <h1>Welcome to My App!</h1>
        <p>This is your one-stop solution for managing your profile seamlessly. Sign in or sign up to get started.</p>
      </main>
    </div>
  );
}

export default Home;
