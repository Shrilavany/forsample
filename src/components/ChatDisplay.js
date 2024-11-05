import React, { useState, useEffect } from "react";
import "./ChatInput.css";
import microphoneIcon from "../assets/microphone-icon.png"; // Ensure this path is correct

const keywordsWithQuestions = [
  {
    keyword: "pH values",
    question:
      "What are the trends of the “pH” values over a period of last 1w, 1m etc..?",
    answer: {
      text: "Over the last week, the pH values for the cooling tower water exhibited fluctuations...",
      image:
        "https://i.pinimg.com/564x/88/f2/c7/88f2c785b768dd29c6b75397f70bf4ef.jpg", // Replace with your actual URL
    },
  },
  {
    keyword: "pH",
    question: "Can you tell me about the pH values?",
    answer: {
      text: "The pH values range between...",
      image:
        "https://i.pinimg.com/564x/88/f2/c7/88f2c785b768dd29c6b75397f70bf4ef.jpg", // Replace with your actual URL
    },
  },
  {
    keyword: "Alert conditions",
    question:
      "What are the repetitive “Alert” conditions the system has been in the recent past?",
    answer: {
      text: "In recent weeks, the system has frequently triggered alerts for high temperature...",
      image: null, // No image for this answer
    },
  },
  {
    keyword: "Actions",
    question: "What actions were taken to resolve alerts?",
    answer: {
      text: "The Operations team promptly investigated the alerts...",
      image:
        "https://i.pinimg.com/564x/dc/a5/c7/dca5c7bf1025e99361d9318cd9b610f3.jpg", // No image for this answer
    },
  },
];

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        handleSend(); // Automatically send the message once recognized
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (message.trim()) {
      setResponses((prevResponses) => [
        ...prevResponses,
        { text: message, sender: "user" },
      ]);

      // Normalize user input to lowercase and trim whitespace
      const userInputLower = message.toLowerCase().trim();

      // Check for predefined answers based on keywords
      const foundKeyword = keywordsWithQuestions.find((item) =>
        userInputLower.includes(item.keyword.toLowerCase())
      );

      let botResponse = {
        text: "I'm sorry, I don't understand the question.",
        image: null,
      };

      // If a keyword is found, set the corresponding answer
      if (foundKeyword) {
        botResponse = foundKeyword.answer;
      } else {
        // Debugging statement to see what the input was
        console.log("User Input: ", message);
        console.log(
          "Keywords: ",
          keywordsWithQuestions.map((k) => k.keyword)
        );
      }

      setMessage("");

      setTimeout(() => {
        setResponses((prevResponses) => [
          ...prevResponses,
          { text: botResponse.text, sender: "bot", image: botResponse.image },
        ]);
      }, 1000);
    }
  };

  const handleMicClick = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        recognition.start();
        setIsListening(true);
      }
    }
  };

  const showQuestion = (index) => {
    const question = keywordsWithQuestions[index].question;
    setMessage(question);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-left">
        <form onSubmit={handleSend} className="chatbot-input-form">
          <div className="input-container">
            <input
              type="text"
              placeholder="Type your message or use voice..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="chatbot-input"
            />
            <button
              type="button"
              className="mic-button"
              onClick={handleMicClick}
            >
              <img
                src={microphoneIcon}
                alt="Mic"
                className={`mic-icon ${isListening ? "listening" : ""}`}
              />
            </button>
          </div>
          <button type="submit" className="send-button">
            Search
          </button>
        </form>

        {/* Hints Section */}
        <div className="hints-section">
          {keywordsWithQuestions.map((item, index) => (
            <button
              key={index}
              className="hint-button"
              onClick={() => showQuestion(index)}
            >
              {item.keyword}
            </button>
          ))}
        </div>
      </div>
      <div className="divider"></div>
      <div className="chatbot-right">
        <div className="chatbot-messages">
          {responses.map((response, index) => (
            <div
              key={index}
              className={`message ${
                response.sender === "user" ? "user" : "bot"
              }`}
            >
              {response.text}
              {/* Display image if available */}
              {response.image && (
                <img
                  src={response.image}
                  alt="Related"
                  className="response-image"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
