import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";


function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">Mnema</Link> 
      </div>
    </header>
  );
}

export default Header;