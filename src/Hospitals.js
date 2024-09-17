import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../src/hospitals.css';

function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:3000/carepoint/hospitals');

        if (response.ok) {
          const hospitalsData = await response.json();
          setHospitals(hospitalsData);
        } else {
          throw new Error('Failed to fetch hospitals');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleNavigateToDepartments = (hospitalId) => {
    navigate(`/hospitals/${hospitalId}/departments`); // Navigate to the departments page with hospitalId
  };

  return (
    <div className="hospitals-container">
      <h1>Hospitals List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <ul>
            {hospitals.map(hospital => (
              <li key={hospital._id} className="hospital-item">
                <h2>{hospital.name}</h2>
                <div className="description">
                  <p>{hospital.description}</p>
                </div>
                <div className="picture">
                  {hospital.picture && (
                    <img
                      src={`http://localhost:3000/${hospital.picture}`} // Adjust this if the URL structure is different
                      alt={hospital.name}
                      className="hospital-picture"
                    />
                  )}
                </div>
                <div className="details">
                  <p className="contact"><strong>Contact Number:</strong> {hospital.contactNumber}</p>
                  <p className="location"><strong>Location:</strong> {hospital.location}</p>
                  {hospital.yearsRunning && <p className="years-running"><strong>Years Running:</strong> {hospital.yearsRunning}</p>}
                </div>
                <button className="navigate-button" onClick={() => handleNavigateToDepartments(hospital.hospitalId)}>Enter</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Hospitals;
