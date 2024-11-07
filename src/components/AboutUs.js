import React from "react";
import "./AboutUs.css"; // Import the updated CSS file

const About = () => {
  return (
    <div className="aboutContainer">
      <div className="leftSection">
        <div className="imageContainer">
          <img
            src="https://i.pinimg.com/originals/15/fa/6e/15fa6e6c9c2f0b4cf42dbb90a4852544.gif"
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

        <p className="text">
          Our chatbot serves as a reliable assistant for operators, engineers,
          and supervisors, providing insights into operational performance,
          troubleshooting, and technical support. By streamlining communication,
          we aim to improve decision-making and productivity in industrial
          environments.
        </p>
      </div>
    </div>
  );
};

export default About;
