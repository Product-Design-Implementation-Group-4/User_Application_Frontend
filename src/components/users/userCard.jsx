import React, { useState } from "react";
import "./UserCard.css";

function UserCard({ user }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % user.uploadedImages?.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + user.uploadedImages?.length) % user.uploadedImages?.length
    );
  };

  return (
    <div className="user-card">
      
      <div className="top-section">
        <div className="uploaded-image-container">
          <img
            src={user.uploadedImages?.[currentImageIndex] || "https://firebasestorage.googleapis.com/v0/b/testandroidpro-179da.appspot.com/o/profile_pictures%2FDALL%C2%B7E%202024-11-27%2000.23.59%20-%20A%20simple%20user%20avatar%20placeholder%20with%20a%20gray%20background%20and%20the%20text%20'NO%20IMAGE'%20in%20clear%2C%20bold%20font%20in%20the%20center.%20The%20background%20should%20be%20solid%20gray.webp?alt=media&token=429426cf-9301-4580-95bd-a5623134a7ab"}
            alt="Uploaded"
            className="uploaded-image"
          />
          <div className="slideshow-buttons">
            <button className="prev-button" onClick={handlePrevImage}>
              &#8249;
            </button>
            <button className="next-button" onClick={handleNextImage}>
              &#8250;
            </button>
          </div>
        </div>

        <div className="description-container">
          <p>{user.description || "No description available."}</p>
        </div>
      </div>

      <div className="bottom-section">
        <div className="profile-info">
          <div className="profile-picture-container">
            <img
              src={user.photo || "https://via.placeholder.com/50"}
              alt="Profile"
              className="profile-picture"
            />
            <h4>{user.name || "Anonymous"}</h4>
          </div>
          <div className="profile-picture-container">
          <p><strong>Email:</strong> {user.email || "N/A"}</p>
          <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
          <p><strong>Location:</strong> {user.location || "Unknown"}</p>
          <p><strong>Helper Type:</strong> {user.helperType || "N/A"}</p>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default UserCard;
