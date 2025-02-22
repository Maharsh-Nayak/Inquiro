import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import "./LoginPage.css"; 

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
      axios.post('http://localhost:3000/api/users/login', formData).then((response) => {
        if(response.status === 200){
          console.log("Login successful");
          navigate("/"); // Redirect to Get Started page after login
        }
        else
          navigate("/get-started"); // Redirect to Get Started page after login
      });
      }catch (error) {
        console.log("Error:", error);
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
