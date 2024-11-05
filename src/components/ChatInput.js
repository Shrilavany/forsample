/*import React, { useState, useEffect } from "react";
import "./ChatInput.css"; // Ensure this file is named ChatInput.css
import micImage from "../assets/micro-phone13.png"; // Ensure this path is correct

// Questions with keywords
const questions = [
  {
    keyword: "status",
    questions: [
      "What is the current status of the cooling tower?",
      "Are there any alarms or warnings on the cooling tower control panel?",
      "What is the current operational mode of the cooling tower (e.g., manual, automatic)?",
      "Has the cooling tower recently undergone maintenance?",
    ],
  },
  {
    keyword: "water quality",
    questions: [
      "What is the current pH level of the cooling water?",
      "Can you provide the latest readings for Total Dissolved Solids (TDS) in the water?",
      "What is the current concentration of biocides or corrosion inhibitors?",
      "Are there any signs of scaling, corrosion, or biological growth in the tower?",
    ],
  },
  {
    keyword: "temperature",
    questions: [
      "What is the current water temperature at the inlet and outlet of the cooling tower?",
      "Have you noticed any unusual fluctuations in water temperature?",
      "Is the water flow rate within normal operating ranges?",
      "Have you checked the heat load on the cooling tower recently?",
    ],
  },
  {
    keyword: "fan operation",
    questions: [
      "What is the current speed or RPM of the cooling tower fan?",
      "Are there any unusual noises or vibrations coming from the fan or motor?",
      "Have you checked the motor amperage or voltage readings recently?",
      "Is the fan cycling on and off as expected?",
    ],
  },
  {
    keyword: "pump operation",
    questions: [
      "What is the current water level in the cooling tower basin?",
      "Is the water pump operating normally, or are there any unusual noises?",
      "What is the status of the makeup water valve? Is it supplying enough water?",
      "Have you observed any leaks or overflows in the cooling tower system?",
    ],
  },
  {
    keyword: "safety",
    questions: [
      "Is there any unusual odor or visible steam near the cooling tower?",
      "Have you checked for any signs of Legionella or other biological hazards?",
      "Are there any wind or weather factors currently affecting the cooling tower’s performance?",
      "Is there any issue with drift from the cooling tower causing water or mist in nearby areas?",
    ],
  },
  {
    keyword: "energy efficiency",
    questions: [
      "What is the current energy consumption of the cooling tower system?",
      "Have there been any recent increases in energy usage?",
      "Are there any efficiency issues noted, like irregular fan cycling or overuse of chemicals?",
    ],
  },
  {
    keyword: "maintenance",
    questions: [
      "When was the last time the cooling tower was cleaned or descaled?",
      "When were the sensors, such as temperature and flow sensors, last calibrated?",
      "Are there any overdue maintenance tasks for the cooling tower?",
      "Have there been any recent repairs to the cooling tower or associated equipment?",
    ],
  },
  {
    keyword: "control system",
    questions: [
      "Is the control system responding correctly to temperature and flow changes?",
      "Have you noticed any delays or malfunctions in the automation commands?",
      "Is the cooling tower connected to the central monitoring system and communicating properly?",
      "Are there any unusual log entries or diagnostic messages from the automation system?",
    ],
  },
  {
    keyword: "troubleshooting",
    questions: [
      "Is there an issue with water temperature regulation, such as temperature not reaching the setpoint?",
      "Is the cooling tower’s water level fluctuating or not stable?",
      "Are the cooling fans operating as expected, or is there an unusual cycling pattern?",
      "Is there any recent data on changes in heat load or environmental factors?",
    ],
  },
];

const images = [
  "https://i.pinimg.com/564x/91/37/a3/9137a3116479b85327c3974a80f62e8e.jpg",
  "https://cdn.leonardo.ai/users/95626727-f1ba-4161-8268-b4f2a44d51f1/generations/6b83cbed-a97f-4b77-ba31-93eae625321f/Leonardo_Phoenix_A_futuristic_industrial_setting_with_a_large_2.jpg",
  "https://cdn.leonardo.ai/users/95626727-f1ba-4161-8268-b4f2a44d51f1/generations/3ff6f0d6-d88d-4a00-b319-31e9f6476baf/Leonardo_Phoenix_A_detailed_illustration_of_a_complex_industri_2.jpg",
  "https://cdn.leonardo.ai/users/95626727-f1ba-4161-8268-b4f2a44d51f1/generations/82fadee6-92a7-46be-b59f-dea3b6127dcd/Leonardo_Phoenix_A_modern_sleek_computer_desktop_with_a_dark_g_3.jpg",
  "https://cdn.leonardo.ai/users/95626727-f1ba-4161-8268-b4f2a44d51f1/generations/3ff6f0d6-d88d-4a00-b319-31e9f6476baf/Leonardo_Phoenix_A_detailed_illustration_of_a_complex_industri_0.jpg",
  "https://cdn.leonardo.ai/users/95626727-f1ba-4161-8268-b4f2a44d51f1/generations/82fadee6-92a7-46be-b59f-dea3b6127dcd/Leonardo_Phoenix_A_modern_sleek_computer_desktop_with_a_dark_g_1.jpg",
];

const Chatbot = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const toggleMic = () => {
    setIsRecording((prev) => !prev);
  };

  const handleSearch = (input) => {
    if (!input) {
      setResponse("Please enter a keyword to search.");
      return;
    }

    const matchedQuestions = questions.find((q) =>
      q.keyword.toLowerCase().includes(input.toLowerCase())
    );

    if (matchedQuestions) {
      setResponse(matchedQuestions.questions.join(" "));
    } else {
      setResponse("No questions found for that keyword.");
    }
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
          {/* Feature images displayed below the welcome message *}
          <div className="feature-images">
            <img src={images[currentImageIndex]} alt="Feature" />
          </div>
          <div className="search-area">
            <input
              type="text"
              placeholder="Enter a keyword..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e.target.value);
                  e.target.value = ""; // Clear the input field
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
              onClick={() =>
                handleSearch(document.querySelector('input[type="text"]').value)
              }
            >
              Search
            </button>
          </div>
        </div>

        <div className="right-side">
          <h2>Response</h2>
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;*/
import React, { useState, useEffect } from "react";
import "./ChatInput.css"; // Ensure this file is named ChatInput.css
import micImage from "../assets/micro-phone13.png"; // Ensure this path is correct

// Questions with keywords
const questions = [
  {
    keyword: "status",
    questions: [
      "What is the current status of the cooling tower?",
      "Are there any alarms or warnings on the cooling tower control panel?",
      "What is the current operational mode of the cooling tower (e.g., manual, automatic)?",
      "Has the cooling tower recently undergone maintenance?",
    ],
  },
  {
    keyword: "water quality",
    questions: [
      "What is the current pH level of the cooling water?",
      "Can you provide the latest readings for Total Dissolved Solids (TDS) in the water?",
      "What is the current concentration of biocides or corrosion inhibitors?",
      "Are there any signs of scaling, corrosion, or biological growth in the tower?",
    ],
  },
  {
    keyword: "temperature",
    questions: [
      "What is the current water temperature at the inlet and outlet of the cooling tower?",
      "Have you noticed any unusual fluctuations in water temperature?",
      "Is the water flow rate within normal operating ranges?",
      "Have you checked the heat load on the cooling tower recently?",
    ],
  },
  {
    keyword: "fan operation",
    questions: [
      "What is the current speed or RPM of the cooling tower fan?",
      "Are there any unusual noises or vibrations coming from the fan or motor?",
      "Have you checked the motor amperage or voltage readings recently?",
      "Is the fan cycling on and off as expected?",
    ],
  },
  {
    keyword: "pump operation",
    questions: [
      "What is the current water level in the cooling tower basin?",
      "Is the water pump operating normally, or are there any unusual noises?",
      "What is the status of the makeup water valve? Is it supplying enough water?",
      "Have you observed any leaks or overflows in the cooling tower system?",
    ],
  },
  {
    keyword: "safety",
    questions: [
      "Is there any unusual odor or visible steam near the cooling tower?",
      "Have you checked for any signs of Legionella or other biological hazards?",
      "Are there any wind or weather factors currently affecting the cooling tower’s performance?",
      "Is there any issue with drift from the cooling tower causing water or mist in nearby areas?",
    ],
  },
  {
    keyword: "energy efficiency",
    questions: [
      "What is the current energy consumption of the cooling tower system?",
      "Have there been any recent increases in energy usage?",
      "Are there any efficiency issues noted, like irregular fan cycling or overuse of chemicals?",
    ],
  },
  {
    keyword: "maintenance",
    questions: [
      "When was the last time the cooling tower was cleaned or descaled?",
      "When were the sensors, such as temperature and flow sensors, last calibrated?",
      "Are there any overdue maintenance tasks for the cooling tower?",
      "Have there been any recent repairs to the cooling tower or associated equipment?",
    ],
  },
  {
    keyword: "control system",
    questions: [
      "Is the control system responding correctly to temperature and flow changes?",
      "Have you noticed any delays or malfunctions in the automation commands?",
      "Is the cooling tower connected to the central monitoring system and communicating properly?",
      "Are there any unusual log entries or diagnostic messages from the automation system?",
    ],
  },
  {
    keyword: "troubleshooting",
    questions: [
      "Is there an issue with water temperature regulation, such as temperature not reaching the setpoint?",
      "Is the cooling tower’s water level fluctuating or not stable?",
      "Are the cooling fans operating as expected, or is there an unusual cycling pattern?",
      "Is there any recent data on changes in heat load or environmental factors?",
    ],
  },
];

const images = [
  "https://i.pinimg.com/564x/91/37/a3/9137a3116479b85327c3974a80f62e8e.jpg",
  "https://cdn.leonardo.ai/users/95626727-f1ba-4161-8268-b4f2a44d51f1/generations/6b83cbed-a97f-4b77-ba31-93eae625321f/Leonardo_Phoenix_A_futuristic_industrial_setting_with_a_large_2.jpg",
  "https://cdn.leonardo.ai/users/95626727-f1ba-4161-8268-b4f2a44d51f1/generations/3ff6f0d6-d88d-4a00-b319-31e9f6476baf/Leonardo_Phoenix_A_detailed_illustration_of_a_complex_industri_2.jpg",
  "https://cdn.leonardo.ai/users/95626727-f1ba-4161-8268-b4f2a44d51f1/generations/82fadee6-92a7-46be-b59f-dea3b6127dcd/Leonardo_Phoenix_A_modern_sleek_computer_desktop_with_a_dark_g_3.jpg",
  "https://cdn.leonardo.ai/users/95626727-f1ba-4161-8268-b4f2a44d51f1/generations/3ff6f0d6-d88d-4a00-b319-31e9f6476baf/Leonardo_Phoenix_A_detailed_illustration_of_a_complex_industri_0.jpg",
  "https://cdn.leonardo.ai/users/95626727-f1ba-4161-8268-b4f2a44d51f1/generations/82fadee6-92a7-46be-b59f-dea3b6127dcd/Leonardo_Phoenix_A_modern_sleek_computer_desktop_with_a_dark_g_1.jpg",
];

const Chatbot = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [response, setResponse] = useState("");
  const [inputValue, setInputValue] = useState(""); // State for input value
  const [suggestions, setSuggestions] = useState([]); // State for suggestions

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const toggleMic = () => {
    setIsRecording((prev) => !prev);
  };

  const handleSearch = (input) => {
    if (!input) {
      setResponse("Please enter a keyword to search.");
      return;
    }

    const matchedQuestions = questions.find((q) =>
      q.keyword.toLowerCase().includes(input.toLowerCase())
    );

    if (matchedQuestions) {
      setResponse(matchedQuestions.questions.join(" "));
    } else {
      setResponse("No questions found for that keyword.");
    }

    // Clear suggestions after search
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setInputValue(input);

    if (input) {
      const filteredSuggestions = questions
        .filter((q) => q.keyword.toLowerCase().includes(input.toLowerCase()))
        .map((q) => q.keyword);

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]); // Clear suggestions after selecting one
  };

  const handleKeywordClick = (keyword) => {
    const matchedQuestions = questions.find((q) => q.keyword === keyword);
    if (matchedQuestions) {
      setResponse(matchedQuestions.questions.join(" "));
    } else {
      setResponse("No questions found for that keyword.");
    }
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
          {/* Feature images displayed below the welcome message */}
          <div className="feature-images">
            <img src={images[currentImageIndex]} alt="Feature" />
          </div>
          <div className="search-area">
            <input
              type="text"
              placeholder="Enter a keyword..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(inputValue);
                  setInputValue(""); // Clear the input field
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
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}

          {/* Keyword Buttons */}
          <div className="keyword-buttons">
            {questions.map((q, index) => (
              <button
                key={index}
                className="keyword-button"
                onClick={() => handleKeywordClick(q.keyword)}
              >
                {q.keyword}
              </button>
            ))}
          </div>
        </div>

        <div className="right-side">
          <h2>Response</h2>
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
