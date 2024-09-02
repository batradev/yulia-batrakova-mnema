import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfessionSelectionPage.scss";
import { useNavigate } from "react-router-dom";

function ProfessionSelectionPage() {
  const [professions, setProfessions] = useState([]);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const navigate = useNavigate();

  const fetchProfessions = async () => {
    try {
      const response = await axios.get(
        "https://localhost:8080/api/professions",
        {
          withCredentials: true,
        }
      );

      setProfessions(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchProfessions();
  }, []);

  const handleProfessionClick = (professionId) => {
    setSelectedProfessions((prevSelected) => {
      if (prevSelected.includes(professionId)) {
        return prevSelected.filter((id) => id !== professionId);
      } else {
        return [...prevSelected, professionId];
      }
    });
  };

  const saveProfessions = async () => {
    try {
      await axios.post(
        "https://localhost:8080/api/user-professions",
        { professions: selectedProfessions },
        { withCredentials: true }
      );
      navigate("/deck-addition");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <h1>What do you do for living?</h1>
      <div className="professions-cloud">
        {professions.map((profession) => (
          <div
            key={profession.id}
            className={`profession-tag ${
              selectedProfessions.includes(profession.id) ? "selected" : ""
            }`}
            onClick={() => handleProfessionClick(profession.id)}
          >
            {profession.name}
          </div>
        ))}
      </div>
      <button onClick={saveProfessions}>Save Professions</button>
    </div>
  );
}

export default ProfessionSelectionPage;
