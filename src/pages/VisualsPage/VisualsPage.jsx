import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from "../../components/Button/Button"; 
import './VisualsPage.scss';

function VisualsPage() {
  const [visuals, setVisuals] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const fetchVisuals = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/visuals`, {
          params: { deck_id: deckId },
          withCredentials: true,
        });
        setVisuals(response.data);
      } catch (error) {
        console.error('Error fetching visuals:', error);
      }
    };

    fetchVisuals();
  }, [deckId]);

  return (
    <div className="visuals-page">
      <div className="visuals-page__content">
        {visuals.map((visual, index) => (
          <div key={index} className="visuals-page__item">
           <img src={visual.image_path} alt={visual.word} className="visuals-page__image" />


            <div className="visuals-page__text">
              <h2>{visual.translation}</h2>
              <p><em>{visual.word}</em></p>
              <p>{visual.mnemonic_desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Button 
        text="Download Deck" 
        // onClick={handleSubmit} 
        className="visuals-page__button"
      />
    </div>
  );
}

export default VisualsPage;
