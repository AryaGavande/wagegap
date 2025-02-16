import React from "react";
import "../styles/about.css"; // Add styling

function About() {
    return (
      <div className="about-container">
        <h2>Our Mission</h2>
        <p>
          Our goal is to empower individuals with knowledge and tools to confidently 
          negotiate salaries and demand fair pay.
        </p>
  
        <h2>Meet the Team</h2>
        <div className="team-section">
          
          {/* Arya */}
          <div className="team-card">
            <img src="/arya.jpeg" alt="Arya's Cat" className="team-img"/>
            <h3>Arya</h3>
            <p><strong>Major:</strong> Computer Science & Statistics</p>
            <p><strong>Role:</strong> Chatbot API Integration & Backend Developer</p>
            <a href="https://www.linkedin.com/in/arya-gavande" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
  
          {/* Parnika */}
          <div className="team-card">
            <img src="/par.jpeg" alt="Parnika's Cat" className="team-img"/>
            <h3>Parnika</h3>
            <p><strong>Major:</strong> Computer Science & Data Science</p>
            <p><strong>Role:</strong> Salary Data Research & BLS API Integration</p>
            <a href="https://www.linkedin.com/in/parnika-dandepally-5a1b03294/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
  
          {/* Likitha */}
          <div className="team-card">
            <img src="/lik.jpeg" alt="Likitha's Cat" className="team-img"/>
            <h3>Likitha</h3>
            <p><strong>Major:</strong> Data Science</p>
            <p><strong>Role:</strong> Frontend & UI Designer</p>
            <a href="https://www.linkedin.com/in/likitha-devi-temmanaboyina/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
  
        </div>
  
        <h2>Connect With Us</h2>
        <p>Interested in collaborating or learning more? Contact us at <strong>contact@negotiateher.com</strong></p>
      </div>
    );
  }

export default About;