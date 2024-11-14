import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Categories from "./components/Categories";
import Chatbot from "./components/Chatbot";
import Login from "./components/Login"; // Import for Login component
import Profile from "./components/Profile"; // Import for Profile component
import SettingsPage from "./components/SettingsPage"; // Import for SettingsPage component
import AboutUs from "./components/AboutUs"; // Import for AboutUs component
import ChangePassword from "./components/ChangePassword"; // Corrected import path
import SupportChatbotPage from "./components/SupportChatbotPage"; // Corrected import path

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Splash screen shows for a few seconds */}
          <Route path="/" element={<SplashScreen />} />
          {/* Navigates to Login page */}
          <Route path="/login" element={<Login />} />
          {/* Navigates to Categories */}
          <Route path="/categories" element={<Categories />} />
          {/* Navigates to ChatInput */}
          <Route path="/chat-input" element={<Chatbot />} />
          {/* Navigates to Profile page */}
          <Route path="/profile" element={<Profile />} />
          {/* Navigates to Settings page */}
          <Route path="/settings" element={<SettingsPage />} />
          {/* Navigates to AboutUs page */}
          <Route path="/about" element={<AboutUs />} />
          {/* Navigates to ChangePassword page */}
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/support-chatbot" element={<SupportChatbotPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
