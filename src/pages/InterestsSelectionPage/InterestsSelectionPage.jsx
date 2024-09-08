import React from "react";
import SelectionPage from "../../components/SelectionPage/SelectionPage";

function InterestsSelectionPage() {
  const fetchUrl = `${process.env.REACT_APP_API_BASE_URL}/api/interests`
  const saveUrl = `${process.env.REACT_APP_API_BASE_URL}/api/user-interests`
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

