import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";
import Button from "../../components/Button/Button";
import "./WordsAdditionPage.scss";
import { useParams, useNavigate } from "react-router-dom";

function WordsAdditionPage() {
  const { deckId } = useParams();
  const [words, setWords] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleSubmit = async () => {
    try {
      const wordsArray = words.split(/[\s,.]+/).filter(Boolean);
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/${user.id}/decks/${deckId}/words`,
        {
          words: wordsArray,
          deck_id: deckId,
        },
        {
          withCredentials: true,
        }
      );

      navigate(`/decks/${deckId}/results`);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert(error.response.data.error);
      } else {
        console.error("Error submitting words:", error);
      }
    }
  };

  return (
    <div className="words-addition-page">
      <h1 className="words-addition-page__title">Add your words</h1>
      <p className="words-addition-page__instruction">
        Enter words in the language you speak, and we’ll translate them.
      </p>

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
