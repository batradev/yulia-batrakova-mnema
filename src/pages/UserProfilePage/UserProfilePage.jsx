import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserProvider";
import "./UserProfilePage.scss";

const UserProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [interests, setInterests] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [allInterests, setAllInterests] = useState([]);
  const [allProfessions, setAllProfessions] = useState([]);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [isProfessionModalOpen, setIsProfessionModalOpen] = useState(false);

  const interestModalRef = useRef(null);
  const professionModalRef = useRef(null);
  const modalRef = useRef(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userData.id) {
        return;
      }
      try {
        const interestsResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/${userData.id}/interests`,
          {
            withCredentials: true,
          }
        );
        setInterests(interestsResponse.data.interests);

        const professionsResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/${userData.id}/professions`,
          {
            withCredentials: true,
          }
        );
        setProfessions(professionsResponse.data.professions);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    fetchUserData();
  }, [userData]);

  const fetchAllInterests = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/interests`,
        {
          withCredentials: true,
        }
      );
      setAllInterests(response.data);
      setIsInterestModalOpen(true);
    } catch (error) {
      console.error("Error loading interests:", error);
    }
  };

  const fetchAllProfessions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/professions`,
        {
          withCredentials: true,
        }
      );
      setAllProfessions(response.data);
      setIsProfessionModalOpen(true);
    } catch (error) {
      console.error("Error loading professions:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !interestModalRef.current?.contains(event.target) &&
        !professionModalRef.current?.contains(event.target)
      ) {
        setIsInterestModalOpen(false);
        setIsProfessionModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isInterestModalOpen, isProfessionModalOpen]);

  const handleInterestSelect = async (interestId, interestName) => {
    let updatedInterests;
    if (interests.includes(interestName)) {
      updatedInterests = interests.filter((name) => name !== interestName);
      setInterests(updatedInterests);

      try {
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/${userData.id}/interests/${interestId}`,
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Error removing interest:", error);
      }
    } else {
      updatedInterests = [...interests, interestName];
      setInterests(updatedInterests);

      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/${userData.id}/interests`,
          {
            items: updatedInterests.map(
              (interest) =>
                allInterests.find((item) => item.name === interest)?.id
            ),
          },
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Error adding interest:", error);
      }
    }
  };

  const handleProfessionSelect = async (professionId, professionName) => {
    let updatedProfessions;
    if (professions.includes(professionName)) {
      updatedProfessions = professions.filter(
        (name) => name !== professionName
      );
      setProfessions(updatedProfessions);

      try {
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/${userData.id}/professions/${professionId}`,
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Error removing profession:", error);
      }
    } else {
      updatedProfessions = [...professions, professionName];
      setProfessions(updatedProfessions);

      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/${userData.id}/professions`,
          {
            items: updatedProfessions.map(
              (profession) =>
                allProfessions.find((item) => item.name === profession)?.id
            ),
          },
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Error adding profession:", error);
      }
    }
  };

  return (
    <div className="user-profile-page">
      <h1>User Profile</h1>
      <div className="user-profile-page__details">
        <div className="user-profile-page__field-info">
          <strong>Name: </strong>
          {userData.name}
        </div>
        <div className="user-profile-page__field-info">
          <strong>Email: </strong>
          {userData.email}
        </div>
        <div className="user-profile-page__field" onClick={fetchAllInterests}>
          <strong>Interests: </strong>
          {interests.join(", ")}
        </div>
        <div className="user-profile-page__field" onClick={fetchAllProfessions}>
          <strong>Professions: </strong>
          {professions.join(", ")}
        </div>
      </div>

      {isInterestModalOpen && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content" ref={interestModalRef}>
            <h2>Select Interests</h2>
            <div className="modal-list">
              {allInterests.map((interest) => (
                <div
                  key={interest.id}
                  className={`modal-item ${
                    interests.includes(interest.name) ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleInterestSelect(interest.id, interest.name)
                  }
                >
                  {interest.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isProfessionModalOpen && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content" ref={professionModalRef}>
            <h2>Select Professions</h2>
            <div className="modal-list">
              {allProfessions.map((profession) => (
                <div
                  key={profession.id}
                  className={`modal-item ${
                    professions.includes(profession.name) ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleProfessionSelect(profession.id, profession.name)
                  }
                >
                  {profession.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
