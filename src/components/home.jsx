import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import UserList from "../components/users/UserList";

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
      <NavbarHome/>
      <main>
        <h1  style={{
            marginTop: "200px",
          }}>Welcome to My App!</h1>
        <button style={{
            marginBottom: "5px",
            height: "40px",
            width: "100px",
            fontSize: "16px",
            backgroundColor: "blue",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }} className="login-button" onClick={handleLogin}>Login</button>
        <UserList />
      </main>
    </div>
  );
}

export default Home;
