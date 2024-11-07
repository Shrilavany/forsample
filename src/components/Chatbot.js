import React, { useState, useEffect } from "react";
import { Vega } from "react-vega";
import "./Chatbot.css";
import micImage from "../assets/micro-phone13.png";
import videoSrc from "../assets/cooling tower1.mp4"; // Path to your video

const Chatbot = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [responses, setResponses] = useState([]); // Store multiple responses
  const [inputValue, setInputValue] = useState("");
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chartSpec, setChartSpec] = useState(null);

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestionsAndAnswers(data.questions);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const toggleMic = () => {
    setIsRecording((prev) => !prev);
  };

  const handleSearch = (input) => {
    if (!input) {
      setResponses((prev) => [
        ...prev,
        { response: "Please enter something to search." },
      ]);
      return;
    }

    if (!questionsAndAnswers || questionsAndAnswers.length === 0) {
      setResponses((prev) => [
        ...prev,
        { response: "Data is still loading. Please try again later." },
      ]);
      return;
    }

    const matchedQuestion = questionsAndAnswers.find((q) =>
      q.question.toLowerCase().includes(input.toLowerCase())
    );

    if (matchedQuestion) {
      setResponses((prev) => [
        ...prev,
        { question: input, response: matchedQuestion.answer },
      ]);
      renderChart(matchedQuestion); // Render chart if applicable
    } else {
      setResponses((prev) => [
        ...prev,
        {
          question: input,
          response: "Sorry, I couldn't find an answer for that.",
        },
      ]);
    }
  };

  const renderChart = (matchedQuestion) => {
    const { type, data } = matchedQuestion;
    if (type === "chart") {
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

      // Set chart configuration according to data type
      const spec = {
        width: 400,
        height: 300,
        data: { values: data.values },
        mark: chartTypes[type]?.mark || "bar", // Default to bar if type is missing
        encoding: chartTypes[type]?.encoding || chartTypes.bar.encoding, // Default to bar encoding
      };

      setChartSpec(spec); // Update chart state to render
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="chatbot-container">
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/history">History</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
        </ul>
      </nav>

      <div className="chatbot-content">
        <div className="left-side">
          <h1>Welcome to the Chatbot</h1>
          <div className="video-container">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
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
              onClick={() => handleSearch(inputValue)}
            >
              Search
            </button>
          </div>
        </div>

        <div className="right-side">
          <h2>Responses</h2>
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <div className="response-container">
              {responses.map((item, index) => (
                <div key={index} className="response-item">
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
  );
};

export default Chatbot;
