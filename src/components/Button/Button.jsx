import React from 'react';
import './Button.scss';

function Button({ text, onClick, className = '', loading = false }) {
  return (
    <button 
      className={`button ${className} ${loading ? 'button--loading' : ''}`} 
      onClick={onClick} 
      disabled={loading} 
    >
      {loading ? (
        <>
          <span className="loading-spinner"></span> 
          Loading... 
        </>
      ) : (
        text
      )}
    </button>
  );
}

export default Button;
