import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SupportChatbotPage.css";

const SupportChatbotPage = () => {
  const [showGif, setShowGif] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [predefinedQuestions, setPredefinedQuestions] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/chatbot.json")
      .then((response) => response.json())
      .then((data) => {
        setPredefinedQuestions(data.predefinedQuestions);
      })
      .catch((error) => console.error("Error fetching questions:", error));

    if (showGif) {
      setTimeout(() => {
        setShowGif(false);
        setMessages([
          { text: "Welcome to the chatbot! Ask me anything.", isBot: true },
        ]);
      }, 4000);
    }
  }, []);

  const getBotResponse = (userQuestion) => {
    const match = predefinedQuestions.find((q) =>
      q.question.toLowerCase().includes(userQuestion.toLowerCase())
    );
    return match ? match.response : "Sorry, I don't understand that question.";
  };

  const handleUserInput = () => {
    if (userInput.trim()) {
      setIsLoading(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userInput, isBot: false },
      ]);
      setTimeout(() => {
        const response = getBotResponse(userInput);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response, isBot: true },
        ]);
        setIsLoading(false);
      }, 1500);
      setUserInput("");
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`support-chatbot ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="chat-container">
        {showGif ? (
          <div className="gif-container">
            <img
              src="https://i.pinimg.com/originals/e7/78/2b/e7782b954b20ab768c74fc1dfd6f9377.gif"
              alt="Welcome"
              className="welcome-gif"
            />
          </div>
        ) : (
          <div className="chat-box">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${
                  message.isBot ? "bot-message" : "user-message"
                }`}
              >
                <div className="message-content">
                  <div
                    className={`message-logo ${
                      message.isBot ? "bot-logo" : "user-logo"
                    }`}
                  >
                    <img
                      src={
                        message.isBot
                          ? "https://www.fastcapital360.com/wp-content/uploads/2021/03/graphic_01-2.gif"
                          : "https://cdnl.iconscout.com/lottie/premium/thumb/female-user-profile-5273097-4424674.gif"
                      }
                      alt="Profile"
                    />
                  </div>
                  <div className="message-text">{message.text}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!showGif && (
          <div className="input-section">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              onClick={handleUserInput}
              disabled={isLoading}
              className="send-button"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        )}
      </div>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default SupportChatbotPage;
