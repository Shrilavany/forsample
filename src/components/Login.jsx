import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Include the CSS for styling

const Login = () => {
  const [name, setName] = useState(""); // Changed from username to name
  const [role, setRole] = useState(""); // State for role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // State for password
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const navigate = useNavigate();

  const handleRegister = () => {
    // Basic input validation
    if (!name || !role || !email || !password || !bloodGroup || !gender) {
      setError("All fields are required.");
      return;
    }

    // Log the user data to the console (simulating registration)
    const userData = {
      name,
      role,
      email,
      password,
      bloodGroup,
      gender,
    };

    console.log("User registered successfully:", userData);

    // Store user data in localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password); // Note: Storing password in localStorage is not recommended
    localStorage.setItem("bloodGroup", bloodGroup);
    localStorage.setItem("gender", gender);

    // Navigate to the homepage after successful registration
    navigate("/chat-input");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalSubmit = () => {
    // Navigate to home when modal submit is clicked
    navigate("/chat-input");
  };

  // Function to navigate to the categories page
  const handleCategories = () => {
    navigate("/categories"); // Adjust the route according to your setup
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

      {/* Button for explaining categories */}
      <button className="explain-categories-button" onClick={handleCategories}>
        Explain Categories
      </button>

      {/* Modal */}
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
            <button className="modal-close-button" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .explain-categories-button {
          position: absolute;
          top: 20px; /* Adjust the position from the top */
          right: 20px; /* Adjust the position from the right */
          padding: 10px 15px;
          background-color: #007bff; /* Button background color */
          color: white; /* Text color */
          border: none;
          border-radius: 5px; /* Rounded corners */
          cursor: pointer;
          font-size: 16px; /* Font size */
        }

        .explain-categories-button:hover {
          background-color: #0056b3; /* Darker shade on hover */
        }
      `}</style>
    </div>
  );
};

export default Login;
