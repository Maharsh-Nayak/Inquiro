import React, { useState } from "react";
import "./GetStartedPage.css";

const GetStartedPage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
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
