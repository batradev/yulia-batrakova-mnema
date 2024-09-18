import React from "react";
import "./LoginPage.scss";
import Button from "../../components/Button/Button"; 

function LoginPage() {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="login">
      <h1 className="login__title">Login to Mnema</h1>
      <Button 
        text="Login with Google" 
        onClick={handleLogin} 
        className="login__button" 
      />
    </div>
  );
}

export default LoginPage;
