import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DeckAdditionPage.scss';

function DeckAdditionPage() {
  const [deckName, setDeckName] = useState('');
  const [languages, setLanguages] = useState([]);
  const [selectedNativeLanguage, setSelectedNativeLanguage] = useState(null);
  const [selectedTargetLanguage, setSelectedTargetLanguage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNativeLanguageSelector, setIsNativeLanguageSelector] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/languages`, {
          withCredentials: true,
        });
        setLanguages(response.data);
      } catch (error) {
        console.error('Error loading languages', error);
      }
    };
    fetchLanguages();
  }, []);

  const handleLanguageSelect = (languageId) => {
    if (isNativeLanguageSelector) {
      setSelectedNativeLanguage(languageId);
    } else {
      setSelectedTargetLanguage(languageId);
    }
    setIsModalOpen(false); 
  };

  const handleCreateDeck = async () => {
    if (!deckName || !selectedNativeLanguage || !selectedTargetLanguage) {
      setErrorMessage('Please fill in all fields before creating the deck.');
      return; 
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/decks`,
        {
          name: deckName,
          native_language_id: selectedNativeLanguage,
          target_language_id: selectedTargetLanguage,
        },
        {
          withCredentials: true,
        }
      );
      const deckId = response.data.deckId;
      navigate(`/decks/${deckId}/words-addition`);
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error); 
      } else {
        console.error('Error creating deck:', error);
      }
    }
  };

  return (
    <div className="deck-addition">
      <h1 className="deck-addition__title">Let's create a deck!</h1>
      {errorMessage && <p className="deck-addition__error-message">{errorMessage}</p>}
      <input
        className="deck-addition__input"
        type="text"
        placeholder="Name of the deck"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
      />
      <div className="deck-addition__language-selectors">
        <div className="deck-addition__language-selector" onClick={() => { setIsNativeLanguageSelector(true); setIsModalOpen(true); }}>
          {selectedNativeLanguage ? languages.find(lang => lang.id === selectedNativeLanguage).name : 'language you speak'}
        </div>
        <div className="deck-addition__language-selector" onClick={() => { setIsNativeLanguageSelector(false); setIsModalOpen(true); }}>
          {selectedTargetLanguage ? languages.find(lang => lang.id === selectedTargetLanguage).name : 'language you want to learn'}
        </div>
      </div>
     
      {isModalOpen && (
        <div className="deck-addition__modal">
          <div className="deck-addition__modal-content">
            <div className="deck-addition__language-list">
              {languages.map((language) => (
                <div
                  key={language.id}
                  className="deck-addition__language-item"
                  onClick={() => handleLanguageSelect(language.id)}
                >
                  {language.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <button className="deck-addition__button" onClick={handleCreateDeck}>Create</button>
    </div>
  );
}

export default DeckAdditionPage;
