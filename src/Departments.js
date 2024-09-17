import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Departments() {
  const { hospitalId } = useParams();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/carepoint/hospitals/${hospitalId}/departments`);
        if (response.ok) {
          const departmentsData = await response.json();
          setDepartments(departmentsData);
        } else {
          throw new Error('Failed to fetch departments');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [hospitalId]);

  const handleNavigateToDepartment = (departmentId) => {
    navigate(`/departments/${departmentId}`); // Navigate to department details
  };
  return (
    <div className="departments-container">
      <h1>Departments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {departments.map(department => (
            <li key={department.departmentId} className="department-item">
              <h2>{department.departmentName}</h2>
              <button onClick={() => handleNavigateToDepartment(department.departmentId)}>Enter</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Departments;
