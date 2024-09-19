import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user-role`, {
          withCredentials: true,
        });
        setIsAdmin(response.data.is_admin); 
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/logout`, {
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
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) => 
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Users
          </NavLink>
        )}
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
