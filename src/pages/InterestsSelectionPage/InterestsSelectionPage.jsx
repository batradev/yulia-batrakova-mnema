import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import SelectionPage from "../../components/SelectionPage/SelectionPage";

function InterestsSelectionPage() {
  const [userData, setUserData] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const fetchUrl = `${process.env.REACT_APP_API_BASE_URL}/api/interests`;
  const saveUrl = `${process.env.REACT_APP_API_BASE_URL}/api/users/${userData.id}/interests`;

  return (
    <SelectionPage
      title="What do you like to do?"
      fetchUrl={fetchUrl}
      saveUrl={saveUrl}
      nextPage="/profession-selection"
    />
  );
}

export default InterestsSelectionPage;
