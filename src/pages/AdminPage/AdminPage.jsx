import React from "react";
import "./AdminPage.scss";

import List from "../../components/List/List";

function AdminPage() {
  const userAccounts = [
    {
      label: "Account 1",
      email: "user1@example.com",
      details: ["Detail 1", "Detail 2", "Detail 3"],
    },
    {
      label: "Account 2",
      email: "user2@example.com",
      details: ["Detail 1", "Detail 2", "Detail 3"],
    },
    
  ];

  const handleDeleteUser = (user) => {
    console.log("Deleted user:", user);
  };

  const handleOptionSelect = (option) => {
    console.log("Selected:", option);
  };

  return (
    <div>
      <h1>Admin</h1>
      <List
        items={userAccounts.map((user) => ({
          label: user.email,
          options: user.details,
        }))}
        onOptionSelect={handleOptionSelect}
        onDelete={handleDeleteUser}
        showDeleteButton={true} 
      />
    </div>
  );
}

export default AdminPage;
