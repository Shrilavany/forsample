import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [signInError, setSignInError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    // Check if the email is already registered
    if (localStorage.getItem("email") === email) {
      setError("You are already signed up. Please go to the sign-in page.");
      return;
    }

    // Check if all fields are filled
    if (!name || !role || !email || !password || !bloodGroup || !gender) {
      setError("All fields are required.");
      return;
    }

    // Store user data in localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("bloodGroup", bloodGroup);
    localStorage.setItem("gender", gender);

    // Log stored data for debugging
    console.log("Signup successful:");
    console.log("Stored Name:", name);
    console.log("Stored Role:", role);
    console.log("Stored Email:", email);
    console.log("Stored Password:", password);
    console.log("Stored Blood Group:", bloodGroup);
    console.log("Stored Gender:", gender);

    // Navigate to the chat input page after successful registration
    navigate("/chat-input");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setSignInError(""); // Clear any previous error on modal open
  };

  const handleModalSubmit = () => {
    // Check if name and email match the stored data
    if (
      localStorage.getItem("name") === name &&
      localStorage.getItem("email") === email
    ) {
      console.log("Signin successful for:", name);
      navigate("/chat-input");
    } else {
      setSignInError("Invalid credentials. Please check your name and email.");
      console.log("Signin failed for:", name);
    }
  };

  const handleCategories = () => {
    navigate("/categories");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <button className="sign-in-button" onClick={toggleModal}>
          Sign In
        </button>
        <h2>Create Account</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="Operators">Operators</option>
            <option value="Maintenance Personnel">Maintenance Personnel</option>
            <option value="Engineering Team">Engineering Team</option>
            <option value="Supervisors/Plant Managers">
              Supervisors/Plant Managers
            </option>
            <option value="Environmental & Safety Officers">
              Environmental & Safety Officers
            </option>
            <option value="IT Automation Specialists">
              IT Automation Specialists
            </option>
          </select>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          >
            <option value="" disabled>
              Select your blood group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={gender === "Other"}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleRegister}>Register</button>
        </form>
      </div>

      <button className="explain-categories-button" onClick={handleCategories}>
        Explain Categories
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Sign In</h3>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleModalSubmit}>Let's Go</button>
            {signInError && <p className="error-message">{signInError}</p>}
            <button className="modal-close-button" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
