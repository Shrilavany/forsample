import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css"; // Importing the CSS for styling

const Categories = () => {
  const navigate = useNavigate();
  const [activeBox, setActiveBox] = useState(null); // State to track the active box for animation

  const handleCategoryClick = (category) => {
    setActiveBox(category); // Set the active box to apply animation
    setTimeout(() => {
      // Navigate to the chat input page with the selected category after a short delay
      navigate(`/chat-input?category=${category}`);
    }, 300); // Match this delay with the CSS transition duration
  };

  const handleVoiceDescription = (description) => {
    // AI Voice synthesis for role description
    const utterance = new SpeechSynthesisUtterance(description);
    speechSynthesis.speak(utterance);
  };

  const categories = [
    {
      name: "Operators",
      image:
        "https://img.freepik.com/premium-photo/industrial-employees-working-together-factory-production-line-isolated-white-background_660230-78986.jpg?w=740",
      description:
        "Operators are responsible for controlling and monitoring equipment.",
    },
    {
      name: "Maintenance Personnel",
      image:
        "https://img.freepik.com/premium-vector/man-stands-front-collection-items-including-man-with-beard_1033579-69847.jpg?w=740",
      description:
        "Maintenance personnel ensure that machinery and equipment run smoothly.",
    },
    {
      name: "Engineering Team",
      image:
        "https://img.freepik.com/premium-vector/professional-construction-projection-engineering-flat-style-vector-illustration_1332465-17559.jpg?w=996",
      description:
        "The engineering team designs and implements system improvements.",
    },
    {
      name: "Supervisors/Plant Managers",
      image:
        "https://img.freepik.com/premium-vector/man-suit-likely-manager-holding-clipboard-while-auditing-business-data-manager-auditing-business-data-simple-minimalist-flat-vector-illustration_538213-118874.jpg?w=740",
      description:
        "Supervisors oversee operations and ensure safety protocols are followed.",
    },
    {
      name: "Environmental & Safety Officers",
      image:
        "https://img.freepik.com/premium-photo/3d-flat-icon-as-safety-engineer-with-iso-certificate-compliance-documentation-concept-as-safet_980716-402667.jpg?w=996",
      description:
        "Environmental and safety officers ensure compliance with regulations.",
    },
    {
      name: "IT Automation Specialists",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-rpa-illustration_23-2149243387.jpg?t=st=1729668884~exp=1729672484~hmac=37eb4c7e944af1a57a992c0195b29397aa1398b1872e0a9a46c9955b2855214a&w=740",
      description:
        "IT automation specialists implement and manage automation solutions.",
    },
  ];

  return (
    <div className="categories-page">
      <h2>Select a Category</h2>
      <div className="category-container">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`category-box ${
              activeBox === category.name ? "active" : ""
            }`} // Apply active class if it's the clicked category
            onClick={() => handleCategoryClick(category.name)} // Call the click handler
            role="button" // Adding role for accessibility
            tabIndex="0" // Make it focusable for keyboard users
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCategoryClick(category.name); // Handle Enter key for accessibility
              }
            }}
          >
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />
            <h3>{category.name}</h3>
            <button
              className="voice-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from bubbling up
                handleVoiceDescription(category.description);
              }}
              title="You can hear the role by voice."
            >
              Hear About Role
            </button>
            <p className="category-description">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
