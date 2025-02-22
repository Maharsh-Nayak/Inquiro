import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetStartedPage.css";
import axios from "axios";
import "./LoginPage.css"; 

const GetStartedPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    exam: "GATE",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
    try{
      let Response = await axios.post('/api/users/sign_up', formData, {
        headers: {
          'Content-Type': 'application/json'  // Add this line
        }})
        console.log("Response:", Response);
        if(Response.status === 200){
          console.log("Login successful");
          navigate("/") // Redirect to Get Started page after login
        }
      }catch (error) {
        console.log("Error:", error);
        if(error.response.status === 400){
          console.log("User found");
          alert("User already exists");
          navigate("/login"); // Redirect to Get Started page after login
        }
        else if(error.response.status === 401){
          console.log("Login failed");
          navigate("/login"); // Redirect to Get Started page after login
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
      </form>
    </div>
  );
};

export default GetStartedPage;
