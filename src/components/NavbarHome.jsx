import React from 'react';
import './NavbarHome.css';
import companyLogo from '../assets/company.png'; // Import the image

const NavbarHome = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src={companyLogo} alt="Company Logo" className="logo-image" />
        </a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/jobs">Jobs</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/support">Support</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
      
    </nav>
  );
};

export default NavbarHome;
