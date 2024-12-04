import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import SignInWithFacebook from "./signInWithFacebook";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h3>Login</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>

          <p className="form-footer">
            New user? <Link to="/register">Register here</Link>
          </p>

          <p className="form-footer">
            Don't want to Login. <Link to="/">Go back to Home</Link>
          </p>

          <SignInwithGoogle />
          <SignInWithFacebook />
        </form>
      </div>
    </div>
  );
}

export default Login;
