import React, { useState } from 'react';
import axios from 'axios';
import './WordsAdditionPage.scss';
import { useParams, useNavigate } from 'react-router-dom';


function WordsAdditionPage() {
  const { deckId } = useParams(); 
  const [words, setWords] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const wordsArray = words.split(/[\s,.]+/).filter(Boolean); 
      const response = await axios.post('https://localhost:8080/api/words', {
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
      <h1>Add your words</h1>
      <textarea
        placeholder="Type here"
        value={words}
        onChange={(e) => setWords(e.target.value)}
      />
      <button onClick={handleSubmit}>Ready</button>
    </div>
  );
}

export default WordsAdditionPage;

