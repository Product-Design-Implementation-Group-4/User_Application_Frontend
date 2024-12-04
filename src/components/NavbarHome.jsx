import React from 'react';
import { Link } from "react-router-dom";
import './NavbarHome.css';
import companyLogo from '../assets/company.png'; // Import the image

const NavbarHome = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={companyLogo} alt="Company Logo" />
        </Link>
      </div>
      <ul className="navbar-links">
      <li><Link to="/">Home</Link></li>
  <li><Link to="/jobs">Jobs</Link></li>
  <li><Link to="/services">Services</Link></li>
  <li><Link to="/support">Support</Link></li>
  <li><Link to="/about">About</Link></li>
  <li><Link to="/contact">Contact Us</Link></li>
      </ul>
      
    </nav>
  );
};

export default NavbarHome;
