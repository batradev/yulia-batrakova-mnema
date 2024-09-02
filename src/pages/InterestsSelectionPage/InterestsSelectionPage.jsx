import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./InterestsSelectionPage.scss";

function InterestsSelectionPage() {
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();

  const fetchInterests = async () => {
    try {
      const response = await axios.get("https://localhost:8080/api/interests", {
        withCredentials: true,
      });
      setInterests(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  const handleInterestClick = (interestId) => {
    setSelectedInterests((prevSelected) => {
      if (prevSelected.includes(interestId)) {
        return prevSelected.filter((id) => id !== interestId);
      } else {
        return [...prevSelected, interestId];
      }
    });
  };

  const saveInterests = async () => {
    try {
      await axios.post(
        "https://localhost:8080/api/user-interests",
        { interests: selectedInterests },
        { withCredentials: true }
      );
      navigate("/profession-selection");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <h1>What do you like to do?</h1>
      <div className="interests-cloud">
        {interests.map((interest) => (
          <div
            key={interest.id}
            className={`interest-tag ${
              selectedInterests.includes(interest.id) ? "selected" : ""
            }`}
            onClick={() => handleInterestClick(interest.id)}
          >
            {interest.name}
          </div>
        ))}
      </div>
      <button onClick={saveInterests}>Save Interests</button>
    </div>
  );
}

export default InterestsSelectionPage;
