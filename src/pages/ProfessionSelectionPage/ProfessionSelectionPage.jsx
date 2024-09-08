
import React from "react";
import SelectionPage from "../../components/SelectionPage/SelectionPage";

function ProfessionSelectionPage() {
  const fetchUrl = `${process.env.REACT_APP_API_BASE_URL}/api/professions`
  const saveUrl = `${process.env.REACT_APP_API_BASE_URL}/api/user-professions`
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
