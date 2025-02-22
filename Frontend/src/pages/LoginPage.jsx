import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css"; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [error, setErro] = useState(false); // State for error mes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);

    try {
      let response = await axios.post('/api/users/login', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log("Response:", response.status);
      if (response.status === 200) {
        console.log("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);

      if (error.response) {
        setErro(true);
        if (error.response.status === 404) {
          console.log("User not found. Redirecting to register page.");
          setErrorMessage("User not found. Please register.");
          navigate("/get-started");
        } else if (error.response.status === 401) {
          setErrorMessage("Incorrect password. Please try again.");
        } else {
          setErrorMessage("Something went wrong. Please try again later.");
        }
      } else {
        setErrorMessage("Server not responding. Check your internet connection.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Inquiro</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      {/* Show error message if exists */}
      {error && <p className="error-message">{errorMessage}</p>}

      <p className="register-link">
        Don't have an account? <a href="/get-started">Register here</a>
      </p>
      <button className="btn-back" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default LoginPage;
