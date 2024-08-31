import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/protected-data', {
//           credentials: 'include', 
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error('Error:', error);
//         navigate('/login', { replace: true }); 
//       }
//     };

//     fetchData();
//   }, [navigate]);

const navigate = useNavigate();

const handleLogout = async () => {
  try {
    const response = await fetch('http://localhost:8080/logout', {
      method: 'GET',
      credentials: 'include', 
    });

    const result = await response.json();

    if (result.success) {
      navigate('/login');
    } else {
      console.error('Failed to logout');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const handleAddDeck = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/check-interests', {
      method: 'GET',
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error('Failed to check interests');
    }

    const result = await response.json();

    if (result.hasInterests) {
      navigate('/deck-addition'); 
    } else {
      navigate('/interests-selection'); 
    }
  } catch (error) {
    console.error('Error checking interests:', error);
    navigate('/login'); 
  }
};


  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <div>
        <h2>Protected Data</h2>
        {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>} */}
      </div>
      <button onClick={handleAddDeck}>Add deck</button>
      <button onClick={handleLogout}>Logout</button>
     
    </div>
  );
}

export default Dashboard;
