import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.scss"; 

function DashboardPage() {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get("https://localhost:8080/api/get-decks", {
          withCredentials: true,
        });
        setDecks(response.data);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
  }, []);

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

  
  const handleDeckClick = (deckId) => {
    navigate(`/visuals/${deckId}`);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>

      <div className="decks-container">
        {decks.map((deck) => (
          <div
            key={deck.id}
            className="deck-card"
            onClick={() => handleDeckClick(deck.id)}
          >
            <h2>{deck.name}</h2>
            <p>{deck.word_count} words</p>
          </div>
        ))}
      </div>

      <button className="button" onClick={handleAddDeck}>Add deck</button>
      <button className="button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DashboardPage;
