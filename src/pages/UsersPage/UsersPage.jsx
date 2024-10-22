import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UsersPage.scss";
import deleteIcon from "../../assets/icon-delete.svg";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/users`,
          {
            withCredentials: true,
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}`,
        {
          withCredentials: true,
        }
      );
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="users-page">
      <h1>Admin Dashboard</h1>
      <div className="users-page__user-list">
        {users.map((user) => (
          <div key={user.id} className="users-page__user">
            <span className="users-page__email">{user.email}</span>
            <img
              src={deleteIcon}
              alt="Delete"
              className="users-page__delete-icon"
              onClick={() => handleDeleteUser(user.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
