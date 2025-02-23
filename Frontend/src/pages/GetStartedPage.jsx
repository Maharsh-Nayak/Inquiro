import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetStartedPage.css";
import axios from "axios";
import "./LoginPage.css"; 
import "./CommunityPage";

const GetStartedPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    exam: "GATE",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message on new submit
    console.log("User Data:", formData);

    try {
      let Response = await axios.post('https://inquiro.onrender.com/api/users/sign_up', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log("Response:", Response);
      if (Response.status === 200) {
        console.log("Registration successful");
        navigate("/community");
      }
    } catch (error) {
      console.log("Error:", error);

      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage("User already exists. Please log in.");
          navigate("/login");
        } else if (error.response.status === 401) {
          setErrorMessage("Registration failed. Please try again.");
        } else {
          setErrorMessage("Something went wrong. Please try again later.");
        }
      } else {
        setErrorMessage("Server not responding. Check your internet connection.");
      }
    }
  };

  return (
    <div className="get-started-container">
      <h2>Get Started with Inquiro</h2>
      <form onSubmit={handleSubmit} className="get-started-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="exam" value={formData.exam} onChange={handleChange} required>
          <option value="GATE">GATE</option>
          <option value="CAT">CAT</option>
          <option value="IELTS">IELTS</option>
          <option value="GRE">GRE</option>
        </select>
        <button type="submit" className="btn btn-primary">Register</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </form>

      {/* Show error message if exists */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default GetStartedPage;
