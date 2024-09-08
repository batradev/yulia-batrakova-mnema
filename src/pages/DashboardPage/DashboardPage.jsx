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
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/get-decks`,
          {
            withCredentials: true,
          }
        );
        setDecks(response.data);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
  }, []);

  const handleAddDeck = async () => {
    try {
      const response = await axios.get(
        // "https://localhost:8080/api/check-interests"
        `${process.env.REACT_APP_API_BASE_URL}/api/check-interests`,
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
      <h1 className="dashboard__title">My Decks</h1>

      <div className="dashboard__decks">
        {decks.map((deck) => (
          <div
            key={deck.id}
            className="dashboard__deck-card"
            onClick={() => handleDeckClick(deck.id)}
          >
            <h2 className="dashboard__deck-card-name">{deck.name}</h2>
            <p className="dashboard__deck-card-count">{deck.word_count} words</p>
          </div>
        ))}
      </div>

      <button className="dashboard__add-deck-button" onClick={handleAddDeck}>
        Add deck
      </button>
    </div>
  );
}

export default DashboardPage;
