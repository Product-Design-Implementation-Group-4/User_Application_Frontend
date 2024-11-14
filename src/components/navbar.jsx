import React from "react";
import "./Navbar.css";
import companyLogo from "../assets/company.png";

function Navbar({ userDetails, handleLogout, handleDeleteAccount }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={companyLogo} alt="Company Logo" />
      </div>
      {userDetails && (
        <div className="navbar-user">
          <img src={userDetails.photo} alt="Profile" className="user-photo" />
          <div className="user-details">
            <p className="user-name">{userDetails.firstName} {userDetails.lastName}</p>
            <p className="user-email">{userDetails.email}</p>
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          <button className="delete-button" onClick={handleDeleteAccount}>Delete Account</button> {/* New delete button */}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
