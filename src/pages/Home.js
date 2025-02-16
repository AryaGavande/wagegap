import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; 

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>NegotiateHer</h1>
        <p className="subheading">
          Empowering women with AI-driven salary insights and negotiation tools.
        </p>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why NegotiateHer?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>💡 AI-Powered Insights</h3>
            <p>Get personalized salary negotiation scripts based on industry data.</p>
          </div>
          <div className="feature">
            <h3>📊 Real-Time Salary Data</h3>
            <p>Compare salaries across roles and industries to strengthen your case.</p>
          </div>
          <div className="feature">
            <h3>👩‍💼 Career Growth</h3>
            <p>Leverage expert insights to confidently navigate job offers.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <h2>Take Control of Your Salary</h2>
        <p>Use data-driven strategies to confidently negotiate what you deserve.</p>
        <Link to="/bot" className="cta-button">Start Chatting Now</Link>
      </div>
    </div>
  );
}

export default Home;
