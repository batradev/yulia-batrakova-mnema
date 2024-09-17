import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ResultsPage.scss';

function ResultsPage() {
  const [results, setResults] = useState([]);
  const [selectedWords, setSelectedWords] = useState({});
  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/results`, {
          params: { deck_id: deckId },
          withCredentials: true,
        });
        const initialSelection = {};
        response.data.forEach(word => {
          initialSelection[word.word] = true;
        });
        setResults(response.data);
        setSelectedWords(initialSelection);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [deckId]);

  const handleCheckboxChange = (word) => {
    setSelectedWords(prevState => ({
      ...prevState,
      [word]: !prevState[word],
    }));
  };

  const handleSubmit = async () => {
    const wordsToGenerate = results
      .filter(result => selectedWords[result.word])
      .map(result => ({
        id: result.id,
        word: result.word,
        mnemonic_desc: result.mnemonic_desc,
        translation: result.translation,
      }));

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/generate-images`, { words: wordsToGenerate }, { withCredentials: true });
      console.log('Images generated successfully:', response.data);
      navigate(`/visuals/${deckId}`);
    } catch (error) {
      console.error('Error generating images:', error);
    }
  };

  return (
    <div className="results-page">
      <h1 className="results-page__title">My Cards</h1>
      <table className="results-page__table">
        <thead>
          <tr>
            <th>Word</th>
            <th>Translation</th>
            <th>Mnemonic Image Description</th>
            <th>Image Generation</th> 
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td className="results-page__word">{result.word}</td>
              <td className="results-page__translation">{result.translation}</td>
              <td>{result.mnemonic_desc}</td>
              <td className="results-page__table--checkbox">
                <input
                  type="checkbox"
                  checked={selectedWords[result.word]}
                  onChange={() => handleCheckboxChange(result.word)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="results-page__button" onClick={handleSubmit}>Generate Images</button>
    </div>
  );
}

export default ResultsPage;
