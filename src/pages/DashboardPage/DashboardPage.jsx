import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
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

  const handleAddDeck = async () => {
    try {
      const response = await axios.get(
        "https://localhost:8080/api/check-interests",
        {
          withCredentials: true,
        }
      );

      if (response.data.hasInterests) {
        navigate("/deck-addition");
      } else {
        navigate("/interests-selection");
      }
    } catch (error) {
      console.error("Error checking interests:", error);
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleAddDeck}>Add deck</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
