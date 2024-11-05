import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Categories from "./components/Categories";
import ChatInput from "./components/ChatInput";
import Login from "./components/Login"; // Import for Login component
import Profile from "./components/Profile"; // Import for Profile component
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
          <Route path="/chat-input" element={<ChatInput />} />
          {/* Navigates to Profile page */}
          <Route path="/profile" element={<Profile />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
