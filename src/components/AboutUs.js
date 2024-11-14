// About.js
import React, { useState } from "react";
import "./AboutUs.css";

const About = ({ userType }) => {
  const [speechSynthesisInstance, setSpeechSynthesisInstance] = useState(null);

  const getCategoryContent = () => {
    switch (userType) {
      case "Engineering Team":
        return "Our Engineering Team category allows engineers to monitor and adjust cooling tower operations, troubleshoot issues, and ensure optimal performance.";
      case "Supervisors/Plant Managers":
        return "Supervisors and Plant Managers can access high-level insights on operational efficiency and maintenance schedules, helping them make informed decisions for overall plant productivity.";
      case "Environmental & Safety Officers":
        return "Environmental & Safety Officers can monitor environmental compliance and safety standards, ensuring that cooling tower operations meet regulatory guidelines.";
      case "IT Automation Specialists":
        return "IT Automation Specialists can integrate our application with other systems, ensuring seamless data flow and automation across the facility.";
      default:
        return "Our chatbot serves various roles within your organization, enhancing efficiency, safety, and compliance through advanced automation technology.";
    }
  };

  const getAllTextToRead = () => {
    return `
      Welcome to our Cooling Tower Automation application, where we enhance operational efficiency using advanced technology. 
      Our chatbot assists users with quick, accurate responses to inquiries, empowering teams with real-time data and insights. 
      Our Product Range includes Induced Draft FRP Cooling Towers, Square & Round Shaped Cooling Towers, Fanless Filles Cooling Towers, 
      Modular & Cross Flow Cooling Towers, Dry Cooling Towers & Timber Cooling Towers, Heat Exchangers & FRP Tanks, 
      and Cooling Tower Spares & Turnkey Projects. 
      ${getCategoryContent()}
    `;
  };

  const startReading = () => {
    const utterance = new SpeechSynthesisUtterance(getAllTextToRead());
    utterance.lang = "en-US";
    setSpeechSynthesisInstance(utterance);
    window.speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    if (speechSynthesisInstance) {
      window.speechSynthesis.cancel();
      setSpeechSynthesisInstance(null);
    }
  };

  return (
    <div className="aboutContainer">
      <div className="leftSection">
        <div className="imageContainer">
          <img
            src="https://instrumentationtools.com/wp-content/uploads/2017/02/instrumentationtools.com_plc-and-scada-animation.gif"
            alt="Cooling Tower Automation"
            className="gifImage"
          />
        </div>
      </div>

      <div className="rightSection">
        <h1 className="heading">About Us</h1>
        <p className="introText">
          Welcome to our Cooling Tower Automation application, where we enhance
          operational efficiency using advanced technology. Our chatbot assists
          users with quick, accurate responses to inquiries, empowering teams
          with real-time data and insights.
        </p>

        <div className="featuresContainer">
          <h2 className="subheading">Our Product Range</h2>
          <ul className="productList">
            <li>Induced Draft FRP Cooling Towers</li>
            <li>Square & Round Shaped Cooling Towers</li>
            <li>Fanless Filles Cooling Towers</li>
            <li>Modular & Cross Flow Cooling Towers</li>
            <li>Dry Cooling Towers & Timber Cooling Towers</li>
            <li>Heat Exchangers & FRP Tanks</li>
            <li>Cooling Tower Spares & Turnkey Projects</li>
          </ul>
        </div>

        <p className="text">{getCategoryContent()}</p>

        <div className="voiceControl">
          <button className="voiceButton startRead" onClick={startReading}>
            Start Read
          </button>
          <button className="voiceButton stopRead" onClick={stopReading}>
            Stop Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
