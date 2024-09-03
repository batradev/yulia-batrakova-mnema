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
        const response = await axios.get('https://localhost:8080/api/languages', {
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
        'https://localhost:8080/api/decks',
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
    <div className="deck-addition-page">
      <h1>Let's create a deck!</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <input
        type="text"
        placeholder="Name of the deck"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
      />
      <div className="language-selectors">
        <div
          className="language-selector"
          onMouseEnter={() => setIsNativeLanguageSelector(true)}
          onClick={() => setIsModalOpen(true)}
        >
          {selectedNativeLanguage ? languages.find(lang => lang.id === selectedNativeLanguage).name : 'language you speak'}
        </div>
        <div
          className="language-selector"
          onMouseEnter={() => setIsNativeLanguageSelector(false)}
          onClick={() => setIsModalOpen(true)}
        >
          {selectedTargetLanguage ? languages.find(lang => lang.id === selectedTargetLanguage).name : 'language you want to learn'}
        </div>
      </div>
     
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="language-list">
              {languages.map((language) => (
                <div
                  key={language.id}
                  className="language-item"
                  onClick={() => handleLanguageSelect(language.id)}
                >
                  {language.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <button onClick={handleCreateDeck}>Create</button>
    </div>
  );
}

export default DeckAdditionPage;
