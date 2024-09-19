import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./ResultsPage.scss";

function ResultsPage() {
  const [results, setResults] = useState([]);
  const [selectedWords, setSelectedWords] = useState({});
  const [loading, setLoading] = useState(false);
  const { deckId } = useParams();
  const navigate = useNavigate();

  const maxSelectedWords = 5; 

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/results`,
          {
            params: { deck_id: deckId },
            withCredentials: true,
          }
        );
        const initialSelection = {};
        response.data.forEach((word) => {
          initialSelection[word.word] = false;
        });
        setResults(response.data);
        setSelectedWords(initialSelection);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [deckId]);

  const handleCheckboxChange = (word) => {
    const selectedCount = Object.values(selectedWords).filter(Boolean).length;

    if (selectedCount >= maxSelectedWords && !selectedWords[word]) {
      alert(`You can select up to ${maxSelectedWords} words only. This is a temporary limit in the test version, and we are working on improvements!`);
      return;
    }

    setSelectedWords(prevState => ({
      ...prevState,
      [word]: !prevState[word],
    }));
  };

  const handleSubmit = async () => {
    const wordsToGenerate = results
      .filter((result) => selectedWords[result.word])
      .map((result) => ({
        id: result.id,
        word: result.word,
        mnemonic_desc: result.mnemonic_desc,
        translation: result.translation,
      }));
    setLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/generate-images`,
        { words: wordsToGenerate },
        { withCredentials: true }
      );
      navigate(`/visuals/${deckId}`);
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="results-page">
      <h1 className="results-page__title">My Cards</h1>
      <p className="results-page__text">
      Please select no more than 5 words to generate images at once. This limit is part of our test version.
      </p>
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
              <td className="results-page__translation">
                {result.translation}
              </td>
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
      <Button
        text="Generate Images"
        onClick={handleSubmit}
        className="results-page__button"
        loading={loading}
      />
    </div>
  );
}

export default ResultsPage;
