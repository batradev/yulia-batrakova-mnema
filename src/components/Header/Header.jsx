import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("https://localhost:8080/logout", {
        withCredentials: true,
      });

      if (response.data.success) {
        navigate("/login");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="header">
      <div className="header__logo">
        <span className="header__icon">💡</span> 
        <span className="header__title">mnema</span>
      </div>
      <nav className="header__nav">
      <NavLink
          to="/admin"
          className={({ isActive }) => 
            isActive ? "header__link header__link--active" : "header__link"
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/user-profile"
          className={({ isActive }) => 
            isActive ? "header__link header__link--active" : "header__link"
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => 
            isActive ? "header__link header__link--active" : "header__link"
          }
        >
          My decks
        </NavLink>
        <button onClick={handleLogout} className="header__link header__link--logout">
          Log out
        </button>
      </nav>
    </header>
  );
};

export default Header;
