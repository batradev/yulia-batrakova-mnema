import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.scss";

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };
  return (
    <div>
      <h1 className="text-gradient">mnema</h1>
      <p className="welcome-text">
        We turn words into images to make learning easy and effective.
        Experience the full power of mnemonics!
      </p>
      <button className="get-started-button" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}

export default HomePage;
