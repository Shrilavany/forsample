// src/components/Profile.js
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Profile.css"; // Include the CSS for styling

const Profile = () => {
  const navigate = useNavigate(); // Create navigate function
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    age: "",
    bloodGroup: "",
    gender: "",
    role: "", // Add role to userData
  });

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null); // Ref for the file input

  useEffect(() => {
    // Fetch user data from localStorage
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const age = localStorage.getItem("age");
    const bloodGroup = localStorage.getItem("bloodGroup");
    const gender = localStorage.getItem("gender");
    const role = localStorage.getItem("role"); // Fetch role
    const image = localStorage.getItem("profileImage");

    if (username && email && age && bloodGroup && gender && role) {
      setUserData({
        username,
        email,
        age,
        bloodGroup,
        gender,
        role, // Set role in userData state
      });
    }

    if (image) {
      setProfileImage(image);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfileImage(base64Image);
        localStorage.setItem("profileImage", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleBack = () => {
    navigate("/chat-input"); // Navigate to the home page
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-info">
        <div className="profile-image-upload">
          <label htmlFor="profileImageInput">
            <img
              src={profileImage || "default-profile.png"} // Replace with a default image if none is uploaded
              alt="Profile"
              className="profile-image"
            />
          </label>
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef} // Attach the ref here
            style={{ display: "none" }}
          />
        </div>
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Age:</strong> {userData.age}
          </p>
          <p>
            <strong>Blood Group:</strong> {userData.bloodGroup}
          </p>
          <p>
            <strong>Gender:</strong> {userData.gender}
          </p>
          <p>
            <strong>Role:</strong> {userData.role} {/* Display role here */}
          </p>
        </div>
        <div className="profile-buttons">
          <button className="edit-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
          <button className="back-button" onClick={handleBack}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
