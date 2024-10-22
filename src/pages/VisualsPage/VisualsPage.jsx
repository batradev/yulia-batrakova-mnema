import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./VisualsPage.scss";

function VisualsPage() {
  const [visuals, setVisuals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { deckId } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchVisuals = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/${user.id}/decks/${deckId}/words`,
          {
            params: { type: "visuals" },
            withCredentials: true,
          }
        );
        setVisuals(response.data);
      } catch (error) {
        console.error("Error fetching visuals:", error);
      }
    };

    fetchVisuals();
  }, [deckId]);

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="visuals-page">
      <div className="visuals-page__content">
        {visuals.map((visual, index) => (
          <div key={index} className="visuals-page__item">
            <img
              src={visual.image_path}
              alt={visual.word}
              className="visuals-page__image"
            />

            <div className="visuals-page__text">
              <h2>{visual.translation}</h2>
              <p>
                <em>{visual.word}</em>
              </p>
              <p>{visual.mnemonic_desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        text="Download Deck"
        onClick={handleDownloadClick}
        className="visuals-page__button"
      />

      {showModal && (
        <div className="modal">
          <div className="modal__content">
            <p>
              You're using our test version. Soon, you'll be able to download
              decks for Anki and easily master your vocabulary.
            </p>
            <Button
              text="Close"
              onClick={handleCloseModal}
              className="modal__close-button"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VisualsPage;
