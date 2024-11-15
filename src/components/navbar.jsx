import React, { useState, useEffect } from "react";
import "./Navbar.css";
import companyLogo from "../assets/company.png";

function Navbar({ userDetails, handleLogout, handleDeleteAccount }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  useEffect(() => {
    const handleClickOutside = (event) => {

      if (event.target.closest('.navbar-user') === null) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={companyLogo} alt="Company Logo" />
      </div>
      {userDetails && (
        <div className="navbar-user">
          
          <img
            src={userDetails.photo}
            alt="Profile"
            className="user-photo"
            onClick={toggleDropdown} 
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <p className="user-name">{userDetails.firstName} {userDetails.lastName}</p>
              <p className="user-email">{userDetails.email}</p>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
              <button className="delete-button" onClick={handleDeleteAccount}>Delete Account</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
