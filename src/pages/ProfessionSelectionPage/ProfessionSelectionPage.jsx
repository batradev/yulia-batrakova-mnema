import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import SelectionPage from "../../components/SelectionPage/SelectionPage";

function ProfessionSelectionPage() {
  const [userData, setUserData] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const fetchUrl = `${process.env.REACT_APP_API_BASE_URL}/api/professions`;
  const saveUrl = `${process.env.REACT_APP_API_BASE_URL}/api/users/${userData.id}/professions`;
  return (
    <SelectionPage
      title="What do you do for a living?"
      fetchUrl={fetchUrl}
      saveUrl={saveUrl}
      nextPage="/deck-addition"
    />
  );
}

export default ProfessionSelectionPage;
