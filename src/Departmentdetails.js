import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../src/departmentdetails.css';

function DepartmentDetails() {
  const { id } = useParams(); // departmentId from URL
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await fetch(`http://localhost:3000/carepoint/departments/${id}`);

        if (response.ok) {
          const departmentData = await response.json();
          setDepartment(departmentData);
        } else {
          throw new Error('Failed to fetch department details');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleEnterClick = () => {
    navigate(`/doctors/${id}`); // Use navigate to change the route
  };

  return (
    <div className="department-details-container">
      <h1>Department Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : department ? (
        <div className="department-details">
          <h2>{department.departmentName}</h2>
          <p><strong>Contact Number:</strong> {department.departmentContactNumber}</p>
          <p><strong>Working Hours:</strong> {department.workingHours}</p>
          <p><strong>Breaks:</strong></p>
          <ul>
            {department.breaks.map((brk, index) => (
              <li key={index}>{brk.start} - {brk.end}</li>
            ))}
          </ul>
          <p><strong>Services:</strong></p>
          <ul>
            {department.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
          <p><strong>Number of Doctors:</strong> {department.numberOfDoctors}</p>
          <button onClick={handleEnterClick} className="enter-button">
            Enter
          </button>
        </div>
      ) : (
        <p>No department details available.</p>
      )}
    </div>
  );
}

export default DepartmentDetails;
