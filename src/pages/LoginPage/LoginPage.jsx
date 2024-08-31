import React from 'react';

function LoginPage() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/auth/google';
  };

  return (
    <div>
    <h1>Login to Mnema</h1>
    <button onClick={handleLogin}>Login with Google</button>
  </div>
  );
}

export default LoginPage;