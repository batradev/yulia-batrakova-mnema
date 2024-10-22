import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./HomePage.scss";

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="home">
      <div className="home__container">
        <span className="home__icon">💡</span>
        <h1 className="home__logo text-gradient">mnema</h1>
      </div>
      <p className="home__description">
        We use mnemonic techniques to create vivid, memorable, and personalized
        images. Learning words is now easy!
      </p>
      <Button
        text="Get Started"
        onClick={handleGetStarted}
        className="home__button home__button--get-started"
      />
    </div>
  );
}

export default HomePage;
