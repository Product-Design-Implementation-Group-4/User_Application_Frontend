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
      <div className="user-card__top-section">
        <div className="user-card__uploaded-image-container">
          <img
            src={user.uploadedImages?.[currentImageIndex] || "https://firebasestorage.googleapis.com/v0/b/testandroidpro-179da.appspot.com/o/profile_pictures%2FDALL%C2%B7E%202024-11-27%2000.23.59%20-%20A%20simple%20user%20avatar%20placeholder%20with%20a%20gray%20background%20and%20the%20text%20'NO%20IMAGE'%20in%20clear%2C%20bold%20font%20in%20the%20center.%20The%20background%20should%20be%20solid%20gray.webp?alt=media&token=429426cf-9301-4580-95bd-a5623134a7ab"}
            alt="Uploaded"
            className="user-card__uploaded-image"
          />
          <div className="user-card__slideshow-buttons">
            <button className="user-card__prev-button" onClick={handlePrevImage}>
              &#8249;
            </button>
            <button className="user-card__next-button" onClick={handleNextImage}>
              &#8250;
            </button>
          </div>
        </div>

        <div className="user-card__description-container">
          <p>{user.description || "No description available."}</p>
        </div>
      </div>

      <div className="user-card__bottom-section">
        <div className="user-card__profile-info">
          <div className="user-card__profile-picture-container">
            <img
              src={user.photo || "https://via.placeholder.com/50"}
              alt="Profile"
              className="user-card__profile-picture"
            />
            <h4 className="user-card__h4">{user.name || "Anonymous"}</h4>
          </div>
          <div className="user-card__info-container">
  <div className="info-row">
    <strong>Email:</strong>
    <span>{user.email || "N/A"}</span>
  </div>
  <div className="info-row">
    <strong>Phone:</strong>
    <span>{user.phone || "N/A"}</span>
  </div>
  <div className="info-row">
    <strong>Location:</strong>
    <span>{user.location || "Unknown"}</span>
  </div>
  <div className="info-row">
    <strong>Helper Type:</strong>
    <span>{user.helperType || "N/A"}</span>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
