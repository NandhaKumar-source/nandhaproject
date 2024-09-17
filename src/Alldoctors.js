import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate for React Router v6
import '../src/alldoctor.css'
function DepartmentDetails1() {
  const { departmentId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    console.log('Department ID:', departmentId); // Debugging output

    const fetchDoctors = async () => {
      try {
        if (!departmentId) {
          throw new Error('Department ID is missing');
        }
        const response = await fetch(`http://localhost:3000/carepoint/doctors/${departmentId}`);
        
        if (response.ok) {
          const doctorsData = await response.json();
          setDoctors(doctorsData);
        } else {
          throw new Error('Failed to fetch doctors');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [departmentId]);

  // Function to handle navigation to the doctor's detailed page
  const handleViewDoctor = (doctorId) => {
    navigate(`/doctor/${doctorId}`); // Assuming the route for doctor details is `/doctor/:doctorId`
  };

  return (
    <div className="department-details">
      <h1>Doctors in Department</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {doctors.map(doctor => (
            <li key={doctor._id} className="doctor-item">
              <h2>{doctor.username}</h2>
              <p><strong>Category:</strong> {doctor.doctorDetails.category}</p>
              <p><strong>Experience:</strong> {doctor.doctorDetails.workExperience}</p>
              <p><strong>Location:</strong> {doctor.doctorDetails.location}</p>
              <p><strong>Contact Number:</strong> {doctor.mobileNumber}</p>
              {doctor.profilePicture && (
                <img
                  src={`http://localhost:3000/${doctor.profilePicture}`} // Adjust this if the URL structure is different
                  alt={doctor.username}
                  className="doctor-picture"
                />
              )}
              <button onClick={() => handleViewDoctor(doctor._id)}>View Doctor Details</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DepartmentDetails1;
