import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.scss';
import deleteIcon from '../../assets/icon-delete.svg'; 

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/users`, {
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/admin/users/${userId}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user.id !== userId)); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="admin-page__user-list">
        {users.map((user) => (
          <div key={user.id} className="admin-page__user">
            <span className="admin-page__email">{user.email}</span>
            <img
              src={deleteIcon}
              alt="Delete"
              className="admin-page__delete-icon"
              onClick={() => handleDeleteUser(user.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
