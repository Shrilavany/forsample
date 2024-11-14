import React, { useState, useEffect } from "react";
import "./SettingsPage.css";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("security");
  const [theme, setTheme] = useState("light");
  const [showAlert, setShowAlert] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false); // State for chat activation
  const navigate = useNavigate();

  // Toggle function for 2FA with alert
  const handleTwoFactorToggle = () => {
    setIsTwoFactorEnabled((prev) => !prev);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Display alert for 3 seconds
  };

  // Apply theme as a class to the main container
  useEffect(() => {
    document.body.className = theme; // Set theme as a body class for global effect
  }, [theme]);

  // Function to handle the start of chat support
  const handleStartChatSupport = () => {
    setIsChatActive(true);
    navigate("/support-chatbot"); // Navigate to SupportChatbotPage
  };

  return (
    <div className={`settings-page ${theme}`}>
      {/* Background */}
      <div className="background-overlay"></div>

      {/* Main content container */}
      <div className="settings-container">
        {/* Header and Tabs */}
        <div className="settings-header-and-tabs">
          {/* Header */}
          <div className="settings-header">
            <h1 className="settings-title">Settings</h1>
            <button className="logout-button">Logout</button>
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            <div className="flex">
              {["security", "preferences", "notifications", "support"].map(
                (tab) => (
                  <button
                    key={tab}
                    className={`tab-button ${
                      activeTab === tab
                        ? "tab-button-active"
                        : "tab-button-inactive"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content-card">
          {activeTab === "security" && (
            <div>
              <h2 className="section-title">Password & Security</h2>
              <div className="form-group">
                <button
                  className="button-primary compact"
                  onClick={() => navigate("/change-password")}
                >
                  Change Password
                </button>
                <div className="permission-item">
                  <div>
                    <h3 className="notification-title">
                      Two-factor Authentication
                    </h3>
                    <p className="notification-description">
                      Secure your account with 2FA
                    </p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      className="toggle-input"
                      checked={isTwoFactorEnabled}
                      onChange={handleTwoFactorToggle}
                    />
                    <div className="toggle-slider"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div>
              <h2 className="section-title">Preferences</h2>
              <div className="form-group">
                <label className="notification-title block mb-2">Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="input-select"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
              <div>
                <h3 className="notification-title mb-2">App Permissions</h3>
                {["Camera", "Microphone", "Storage"].map((permission) => (
                  <div key={permission} className="permission-item">
                    <span>{permission}</span>
                    <label className="toggle-switch">
                      <input type="checkbox" className="toggle-input" />
                      <div className="toggle-slider"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h2 className="section-title">Notifications</h2>
              <div className="form-group">
                {["Email", "SMS", "In-app"].map((type) => (
                  <div key={type} className="notification-item">
                    <div className="notification-text">
                      <h3 className="notification-title">
                        {type} Notifications
                      </h3>
                      <p className="notification-description">
                        Receive {type.toLowerCase()} updates and alerts
                      </p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" className="toggle-input" />
                      <div className="toggle-slider"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "support" && (
            <div>
              <h2 className="section-title">Support</h2>
              <div className="space-y-6">
                <div className="form-group">
                  <h3 className="notification-title">Email Support</h3>
                  <p className="notification-description">
                    support@example.com
                  </p>
                </div>
                <div className="form-group">
                  <h3 className="notification-title">Phone Support</h3>
                  <p className="notification-description">1-800-123-4567</p>
                </div>
                <button
                  className="button-primary compact"
                  onClick={handleStartChatSupport}
                >
                  Start Chat Support
                </button>
              </div>
              <div className="form-group">
                <h3 className="notification-title">Feedback & Suggestions</h3>
                <textarea
                  className="textarea-feedback"
                  placeholder="Share your feedback or report issues..."
                />
                <button className="button-primary compact">
                  Submit Feedback
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Alert Message for 2FA */}
        {showAlert && (
          <div className="alert-box">
            {isTwoFactorEnabled
              ? "Two-factor authentication has been enabled for your account."
              : "Two-factor authentication has been disabled for your account."}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
