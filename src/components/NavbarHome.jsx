import React from 'react';
import './NavbarHome.css';
import companyLogo from '../assets/company.png'; // Import the image

const NavbarHome = ({ onLogin, onSignUp }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Use the image as the logo */}
        <a href="/">
          <img src={companyLogo} alt="Company Logo" className="logo-image" />
        </a>
      </div>
      <ul className="navbar-links">
        <li><a href="/home">Home</a></li>
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
