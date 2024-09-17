import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from './Navbar';

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');

      if (token) {
        try {
          const response = await fetch('http://localhost:3000/carepoint/users/user', {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            throw new Error('Failed to fetch user data');
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const handleBookAppointment = () => {
    if (user) {
      navigate('/hospitals'); // Navigate to the hospitals page if user is logged in
    } else {
      navigate('/signup'); // Redirect to signup page if not logged in
    }
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="home-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="user-profile">
            <h1>Welcome{user ? `, ${user.username}` : ''}</h1>
            {user && user.profilePicture ? (
              <img
                src={`http://localhost:3000/${user.profilePicture}`} // Adjust this if the URL structure is different
                alt="Profile"
                className="profile-picture"
              />
            ) : (
              !user && <p>No profile picture available</p>
            )}
            {user ? (
              <>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </>
            ) : (
              <p>Please sign up to access personalized features.</p>
            )}
            <button onClick={handleBookAppointment}>
              Book Appointment
            </button> {/* Always show the button */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
