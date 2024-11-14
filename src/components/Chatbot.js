import React, { useState } from "react";
import { Vega } from "react-vega";
import { useNavigate } from "react-router-dom";
import "./Chatbot.css";
import micImage from "../assets/micro-phone13.png";
import videoSrc from "../assets/cooling tower1.mp4";
import profileLogo from "../assets/profile.gif";
import settingsLogo from "../assets/settings.gif";
import aboutLogo from "../assets/About.gif";

const Chatbot = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [responses, setResponses] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chartSpec, setChartSpec] = useState(null);
  const [videoVisible, setVideoVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // API base URL
  const API_URL = "https://ff2d-34-41-224-241.ngrok-free.app/ask";

  // Toggle microphone state
  const toggleMic = () => {
    setIsRecording((prev) => !prev);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle search and make an API call
  const handleSearch = async (input) => {
    if (!input) {
      setResponses((prev) => [
        ...prev,
        { response: "Please enter something to search." },
      ]);
      return;
    }

    setIsLoading(true);
    console.log("Sending payload:", JSON.stringify({ question: input })); // Changed from query to question

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }), // Changed from query to question
      });

      if (!response.ok) {
        console.error("Response error:", response.statusText);
        setResponses((prev) => [
          ...prev,
          {
            question: input,
            response: "There was an error with the request.",
          },
        ]);
      } else {
        const data = await response.json();
        console.log("Received data:", data);

        if (data.answer) {
          setResponses((prev) => [
            ...prev,
            { question: input, response: data.answer },
          ]);

          if (data.chart) {
            renderChart(data.chart);
          }
          setVideoVisible(false);
        } else {
          setResponses((prev) => [
            ...prev,
            {
              question: input,
              response: "Sorry, I couldn't find an answer for that.",
            },
          ]);
          setVideoVisible(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponses((prev) => [
        {
          response:
            "There was an error processing your request. Please try again later.",
        },
      ]);
    }

    setIsLoading(false);
  };

  // Render chart if data includes chart info
  const renderChart = (chartData) => {
    const { type, data } = chartData;
    const chartTypes = {
      line: {
        mark: "line",
        encoding: {
          x: { field: "time", type: "ordinal" },
          y: {
            field: "inlet",
            type: "quantitative",
            scale: { domain: [20, 40] },
          },
          color: { field: "outlet", type: "quantitative" },
        },
      },
      bar: {
        mark: "bar",
        encoding: {
          x: { field: "component", type: "ordinal" },
          y: { field: "percentage", type: "quantitative" },
        },
      },
      pie: {
        mark: "arc",
        encoding: {
          theta: { field: "percentage", type: "quantitative" },
          color: { field: "component", type: "ordinal" },
        },
      },
    };

    const spec = {
      width: 400,
      height: 300,
      data: { values: data },
      mark: chartTypes[type]?.mark || "bar",
      encoding: chartTypes[type]?.encoding || chartTypes.bar.encoding,
    };

    setChartSpec(spec);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="chatbot-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-links">
          <li>
            <img
              src={profileLogo}
              alt="Profile"
              onClick={() => navigate("/profile")}
              title="Profile"
              style={{ cursor: "pointer", width: "50px", height: "50px" }}
            />
          </li>
          <li>
            <img
              src={settingsLogo}
              alt="Settings"
              onClick={() => navigate("/settings")}
              title="Settings"
              style={{ cursor: "pointer", width: "50px", height: "50px" }}
            />
          </li>
          <li>
            <img
              src={aboutLogo}
              alt="About Us"
              onClick={() => navigate("/about")}
              title="About Us"
              style={{ cursor: "pointer", width: "50px", height: "50px" }}
            />
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="chatbot-content">
          <div className="left-side">
            <h1>Welcome to the Chatbot</h1>
            {videoVisible && (
              <div className="video-container">
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </div>
            )}
            <div className="search-area">
              <input
                type="text"
                placeholder="Enter your query..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(inputValue);
                    setInputValue("");
                  }
                }}
              />
              <button
                className={`mic-button ${isRecording ? "recording" : ""}`}
                onClick={toggleMic}
                style={{
                  backgroundColor: isRecording ? "red" : "white",
                  color: isRecording ? "white" : "black",
                }}
              >
                <img
                  src={micImage}
                  alt="Mic"
                  style={{ width: "24px", height: "24px" }}
                />
              </button>
              <button
                className="search-button"
                onClick={() => {
                  handleSearch(inputValue);
                  setInputValue("");
                }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Response Area */}
          <div className="response-container">
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <div className="response-item">
                {responses.map((item, index) => (
                  <div key={index}>
                    {item.question && (
                      <p>
                        <strong>Q:</strong> {item.question}
                      </p>
                    )}
                    <p>
                      <strong>A:</strong> {item.response}
                    </p>
                    {chartSpec && <Vega spec={chartSpec} />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </div>
    </div>
  );
};

export default Chatbot;
