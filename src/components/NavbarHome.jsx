import React from "react";
import './NavbarHome.css';

const NavbarHome = ({ onLogin, onSignUp }) => {
  return (
    <nav className="navbar-home">
      <div className="navbar-logo">
        <a href="/">Company Logo</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/support">Support</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
      <div className="navbar-buttons">
        <button className="btn signup" onClick={onSignUp}>Sign Up</button>
        <button className="btn login" onClick={onLogin}>Login</button>
      </div>
    </nav>
  );
};

export default NavbarHome;
