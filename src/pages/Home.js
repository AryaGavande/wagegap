import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-section">
        <h1>NegotiateHer</h1>
        <p className="subheading">
          Empowering women with AI-driven salary insights and negotiation tools.
        </p>
      </div>
      <div className="features-section">
        <h2>Why NegotiateHer?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>AI-Powered Insights</h3>
            <p>Get personalized salary negotiation scripts based on industry data.</p>
          </div>
          <div className="feature">
            <h3>Real-Time Salary Data</h3>
            <p>Compare salaries across roles and industries to strengthen your case.</p>
          </div>
          <div className="feature">
            <h3>Career Growth</h3>
            <p>Leverage expert insights to confidently navigate job offers.</p>
          </div>
        </div>
      </div>

      {/* 🔹 Full Feature List */}
      <div className="intro-section">
        <h2>Take Control of Your Salary</h2>
        <p>Use AI-powered strategies to confidently negotiate what you deserve.</p>
        
        <div className="feature-list">
          <h3>💡 How Can NegotiateHer Help You?</h3>
          <ul>
            <li><strong>Legal Aid Guidance: </strong> Learn your rights in pay discrimination cases.</li>
            <li><strong>Resume & Offer Review: </strong> Get AI-powered feedback on your resume and job offers.</li>
            <li><strong>Cold Email Generator: </strong> Auto-generate professional salary negotiation emails.</li>
            <li><strong>Salary Negotiation Roleplay: </strong> Practice HR-style conversations in a safe environment.</li>
            <li><strong>Industry-Specific Salary Insights: </strong> Get real-time salary benchmarks for your role and location.</li>
            <li><strong>Negotiation Script Builder: </strong> Receive a customized negotiation script for your industry.</li>
          </ul>
        </div>

        <button className="chat-button" onClick={() => navigate("/bot")}>
          Start Chatting Now
        </button>
      </div>
    </div>
  );
}

export default Home;
