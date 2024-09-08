import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.scss";

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="home">
      <div className="home__container">
      <span className="home__icon">💡</span> 
      <h1 className="home__logo text-gradient">mnema</h1>
      </div>
      <p className="home__description">
        We turn words into images to make learning easy and effective.
        Experience the full power of mnemonics!
      </p>
      <button className="home__button home__button--get-started" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}

export default HomePage;
