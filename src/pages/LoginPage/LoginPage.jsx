import React from "react";
import "./LoginPage.scss";

function LoginPage() {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="login">
      <h1 className="login__title">Login to Mnema</h1>
      <button className="login__button" onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
}

export default LoginPage;
