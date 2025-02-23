import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Cookies from "js-cookie";
import gateImage from "../assets/WhatsApp Image 2025-02-23 at 15.48.45_2167de68.jpg";
import catImage from "../assets/WhatsApp Image 2025-02-23 at 15.41.47_ddc660dc.jpg";
import ieltsImage from "../assets/WhatsApp Image 2025-02-23 at 15.50.50_8f15aa6d.jpg";
import greImage from "../assets/WhatsApp Image 2025-02-23 at 15.46.39_0db4a43a.jpg";

const LandingPage = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      navigate("/community");
    }
  }, [navigate]);

  // Function to scroll to About Us section
  const scrollToAbout = () => {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Inquiro</h1>
        <div className="nav-links">
          <button className="btn-link" onClick={scrollToAbout}>
            About Us
          </button>
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

      {/* Scrollable Section with Exam Details */}
      <section className="exam-details">
        <h2>Explore Exams</h2>

        {/* GATE */}
        <div className="exam-section">
          <img src={gateImage} alt="GATE Exam" className="exam-image left" />
          <div className="exam-description right">
            <h3>GATE</h3>
            <p>The Graduate Aptitude Test in Engineering (GATE) is an entrance exam for postgraduate engineering programs.</p>
          </div>
        </div>

        {/* CAT */}
        <div className="exam-section reverse">
          <div className="exam-description left">
            <h3>CAT</h3>
            <p>The Common Admission Test (CAT) is an entrance exam for MBA programs in India's top business schools.</p>
          </div>
          <img src={catImage} alt="CAT Exam" className="exam-image right" />
        </div>

        {/* IELTS */}
        <div className="exam-section">
          <img src={ieltsImage} alt="IELTS Exam" className="exam-image left" />
          <div className="exam-description right">
            <h3>IELTS</h3>
            <p>The International English Language Testing System (IELTS) measures English proficiency for study or work abroad.</p>
          </div>
        </div>

        {/* GRE */}
        <div className="exam-section reverse">
          <div className="exam-description left">
            <h3>GRE</h3>
            <p>The Graduate Record Examination (GRE) is a standardized test for admission to graduate schools worldwide.</p>
          </div>
          <img src={greImage} alt="GRE Exam" className="exam-image right" />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-us">
        <h2>About Inquiro</h2>
        <p>
          Inquiro is an innovative platform designed to help students prepare for competitive exams like GATE, CAT, IELTS, and GRE. 
          Our goal is to provide structured study resources, a supportive community, and real-time progress tracking to enhance 
          your learning experience. Join us and take the next step toward exam success!
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
