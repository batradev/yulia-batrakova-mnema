import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './UserProfilePage.scss';

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user-profile`, {
          withCredentials: true,
        });
        setUserData(response.data.user);
        setInterests(response.data.interests);
        setProfessions(response.data.professions);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/user-profile-update`,
        {
          interests,  
          professions, 
        },
        {
          withCredentials: true,
        }
      );
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const fetchAllInterests = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/interests`, {
        withCredentials: true,
      });
      setAllInterests(response.data);
      setIsInterestModalOpen(true);
    } catch (error) {
      console.error('Error loading interests:', error);
    }
  };

  const fetchAllProfessions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/professions`, {
        withCredentials: true,
      });
      setAllProfessions(response.data);
      setIsProfessionModalOpen(true);
    } catch (error) {
      console.error('Error loading professions:', error);
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInterestModalOpen, isProfessionModalOpen]);

  const handleInterestSelect = (interestId) => {
    if (interests.includes(interestId)) {
      setInterests(interests.filter((id) => id !== interestId));
    } else {
      setInterests([...interests, interestId]);
    }
  };

  const handleProfessionSelect = (professionId) => {
    if (professions.includes(professionId)) {
      setProfessions(professions.filter((id) => id !== professionId));
    } else {
      setProfessions([...professions, professionId]);
    }
  };

  return (
    <div className="user-profile-page">
      <h1>User Profile</h1>
      <div className="user-profile-page__details">
        <div className="user-profile-page__field-info">
          <strong>Name: </strong>{userData.name}
        </div>
        <div className="user-profile-page__field-info">
          <strong>Email: </strong>{userData.email}
        </div>
        <div className="user-profile-page__field" onClick={fetchAllInterests}>
          <strong>Interests: </strong>{interests.join(', ')}
        </div>
        <div className="user-profile-page__field" onClick={fetchAllProfessions}>
          <strong>Professions: </strong>{professions.join(', ')}
        </div>
      </div>
      <button className="user-button" onClick={handleUpdateProfile}>Update Profile</button>

      {isInterestModalOpen && (
        <div className="modal" ref={modalRef}> 
          <div className="modal-content" ref={interestModalRef}>
            <h2>Select Interests</h2>
            <div className="modal-list">
              {allInterests.map((interest) => (
                <div
                  key={interest.id}
                  className={`modal-item ${interests.includes(interest.name) ? 'selected' : ''}`}
                  onClick={() => handleInterestSelect(interest.name)}
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
                  className={`modal-item ${professions.includes(profession.name) ? 'selected' : ''}`}
                  onClick={() => handleProfessionSelect(profession.name)}
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
