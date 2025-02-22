import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; 
const LandingPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Inquiro</h1>
        <div className="nav-links">
          <a href="#about">About Us</a>
          <button className="btn-login" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h2 className="tagline">Your Gateway to Exam Success</h2>
        <h1 className="app-name">Inquiro</h1>
        <button className="btn btn-primary" onClick={() => navigate("/get-started")}>
          Get Started
        </button>
      </header>

      {/* Scrollable Info Section */}
      <section className="exam-info">
        <h2>Explore Exams</h2>
        <div className="exam-list">
          <div className="exam-card">
            <h3>GATE</h3>
            <p>Graduate Aptitude Test in Engineering</p>
          </div>
          <div className="exam-card">
            <h3>CAT</h3>
            <p>Common Admission Test for MBA</p>
          </div>
          <div className="exam-card">
            <h3>IELTS</h3>
            <p>International English Language Testing System</p>
          </div>
          <div className="exam-card">
            <h3>GRE</h3>
            <p>Graduate Record Examination</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
