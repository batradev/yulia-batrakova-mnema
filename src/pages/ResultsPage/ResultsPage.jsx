import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ResultsPage.scss';

function ResultsPage() {
  const [results, setResults] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('https://localhost:8080/api/results', {
          params: { deck_id: deckId },
          withCredentials: true,
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [deckId]);

  return (
    <div className="results-page">
      <h1>Results</h1>
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Translation</th>
            <th>Mnemonic Image Description</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.word}</td>
              <td>{result.translation}</td>
              <td>{result.mnemonic_desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>I like it</button>
    </div>
  );
}

export default ResultsPage;

