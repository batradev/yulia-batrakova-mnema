import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { UserContext } from "../../context/UserProvider";
import deleteIcon from "../../assets/icon-delete.svg";
import "./DashboardPage.scss";

function DashboardPage() {
  const [decks, setDecks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/${user.id}/decks`,
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
  }, [user]);

  const handleAddDeck = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/${user.id}/interests`,
        {
          withCredentials: true,
        }
      );

      if (response.data.interests.length > 0) {
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
    navigate(`/decks/${deckId}/visuals`);
  };
  const openDeleteModal = (deck) => {
    setSelectedDeck(deck);
    setIsModalOpen(true);
  };

  const handleDeleteDeck = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/${user.id}/decks/${selectedDeck.id}`,
        {
          withCredentials: true,
        }
      );
      setDecks(decks.filter((deck) => deck.id !== selectedDeck.id));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">My Decks</h1>
      <div className="dashboard__decks">
        {decks.map((deck) => (
          <div key={deck.id} className="dashboard__deck-card">
            <img
              src={deleteIcon}
              alt="Delete deck"
              className="dashboard__delete-icon"
              onClick={() => openDeleteModal(deck)}
            />
            <div onClick={() => handleDeckClick(deck.id)}>
              <h2 className="dashboard__deck-card-name">{deck.name}</h2>
              <p className="dashboard__deck-card-count">
                {deck.word_count} words
              </p>
            </div>
          </div>
        ))}
      </div>
      <Button
        text="Add deck"
        onClick={handleAddDeck}
        className="dashboard__add-deck-button"
      />
      {isModalOpen && (
        <div className="dashboard__modal">
          <div className="dashboard__modal-content">
            <p>
              Are you sure you want to delete the deck "{selectedDeck?.name}"?
            </p>
            <Button
              className="dashboard__button"
              text="Yes, delete"
              onClick={handleDeleteDeck}
            />
            <Button
              className="dashboard__button"
              text="Cancel"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
