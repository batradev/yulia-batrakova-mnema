import React from "react";
import "./IconButton.scss";

function IconButton({ icon, onClick }) {
  return (
    <button className="icon-button" onClick={onClick}>
      {icon}
    </button>
  );
}

export default IconButton;