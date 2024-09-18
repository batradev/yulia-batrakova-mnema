import React, { useState } from 'react';
import axios from 'axios';
import Button from "../../components/Button/Button"; 
import './WordsAdditionPage.scss';
import { useParams, useNavigate } from 'react-router-dom';


function WordsAdditionPage() {
  const { deckId } = useParams(); 
  const [words, setWords] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const wordsArray = words.split(/[\s,.]+/).filter(Boolean); 
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/words`, {
        words: wordsArray, 
        deck_id: deckId,
      }, {
        withCredentials: true,
      });

      navigate(`/decks/${deckId}/results`);
    } catch (error) {
      console.error('Error submitting words:', error);
    }
  };

  return (
    <div className="words-addition-page">
      <h1 className="words-addition-page__title">Add your words</h1>
      <textarea
       className="words-addition-page__textarea"
        placeholder="Type here"
        value={words}
        onChange={(e) => setWords(e.target.value)}
      />
      <Button 
        text="Ready" 
        onClick={handleSubmit} 
        className="words-addition-page__button"
      />
    </div>
  );
}

export default WordsAdditionPage;

