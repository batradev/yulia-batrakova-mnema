import React from "react";
import "./UserProfilePage.scss";
import List from "../../components/List/List";

function UserProfilePage() {

  const userOptions = {
    name: "John Doe",
    email: "john.doe@example.com",
    interests: ["Reading", "Writing", "Drawing", "Reading", "Writing", "Drawing"],
    professions: ["Developer", "Designer", "Developer", "Designer", "Developer", "Designer",],
  };

 
  const handleOptionSelect = (option) => {
    console.log("Selected:", option);
    
  };

  return (
    <div>
      <h1>User Profile</h1>
      <List
        items={[
          { label: "Name", options: [userOptions.name] },
          { label: "Email", options: [userOptions.email] },
          { label: "Interests", options: userOptions.interests },
          { label: "Professions", options: userOptions.professions },
        ]}
        onOptionSelect={handleOptionSelect}
        showDeleteButton={false} 
      />
    </div>
  );
}

export default UserProfilePage;

