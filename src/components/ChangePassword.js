// ChangePassword.js
import React, { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setFeedbackMessage("New passwords do not match.");
      setIsSuccess(false);
      return;
    }

    if (newPassword.length < 6) {
      setFeedbackMessage("New password must be at least 6 characters.");
      setIsSuccess(false);
      return;
    }

    setFeedbackMessage("Password updated successfully.");
    setIsSuccess(true);
  };

  return (
    <div className="change-password-page">
      <div className="change-password-container">
        <h2 className="change-password-title">Change Password</h2>
        <form onSubmit={handleSubmit}>
          {/* Current Password Field */}
          <div className="form-group">
            <label>Current Password</label>
            <div className="input-container">
              <input
                type={showPassword.current ? "text" : "password"}
                className="input-field"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => togglePasswordVisibility("current")}
              >
                {showPassword.current ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          {/* New Password Field */}
          <div className="form-group">
            <label>New Password</label>
            <div className="input-container">
              <input
                type={showPassword.new ? "text" : "password"}
                className="input-field"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPassword.new ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          {/* Confirm New Password Field */}
          <div className="form-group">
            <label>Confirm New Password</label>
            <div className="input-container">
              <input
                type={showPassword.confirm ? "text" : "password"}
                className="input-field"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPassword.confirm ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          <button type="submit" className="change-password-button">
            Update Password
          </button>
        </form>

        {feedbackMessage && (
          <p className={isSuccess ? "success-message" : "feedback-message"}>
            {feedbackMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
