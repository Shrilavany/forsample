import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming react-router for navigation
import "./SplashScreen.css"; // Custom styling for splash screen

const SplashScreen = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    // Countdown timer for 4 seconds with visual updates
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        const newCount = prev - 1;

        // Stop countdown at 0
        if (newCount <= 0) {
          clearInterval(countdownTimer); // Clear the countdown timer
        }
        return newCount;
      });
    }, 1000);

    // Navigate to categories after 4 seconds
    const timer = setTimeout(() => {
      navigate("/Login"); // Navigate to the categories page
    }, 4000);

    // Cleanup timers on component unmount
    return () => {
      clearInterval(countdownTimer);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="content-box">
          <h1>Cooling Tower Automation Chatbot</h1>
          <p>AI-powered chatbot for cooling tower automation</p>
          <p className="countdown">Starting in {countdown} seconds...</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
