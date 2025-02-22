import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import "./LoginPage.css"; 
import GetStartedPage from "./GetStartedPage";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    try{
      let Response = await axios.post('/api/users/login', formData, {
        headers: {
          'Content-Type': 'application/json'  // Add this line
        }})
        console.log("Response:", Response.status);
        if(Response.status === 200){
          console.log("Login successful");
          navigate("/"); // Redirect to Get Started page after login
        }
      }catch (error) {
        console.log("Error:", error);
        if(error.response.status === 404){
          console.log("User not found");
          navigate("/get-started"); // Redirect to Get Started page after login
        }
        else if(error.response.status === 401){
          console.log("Login failed");
          navigate("/login"); // Redirect to Get Started page after login
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
      <p className="register-link">
        Don't have an account? <a href="/get-started">Register here</a>
      </p>
      <button className="btn-back" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default LoginPage;
