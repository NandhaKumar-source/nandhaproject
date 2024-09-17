import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DoctorDetails() {
  const { doctorId } = useParams(); // Get doctorId from URL parameters
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/carepoint/users/user/${doctorId}`);
        if (response.ok) {
          const doctorData = await response.json();
          setDoctor(doctorData);
        } else {
          throw new Error('Failed to fetch doctor details');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  const handleBookAppointment = () => {
    navigate(`/appointments?doctorId=${doctorId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="doctor-details">
      <h1>{doctor.username}</h1>
      <p><strong>Category:</strong> {doctor.doctorDetails.category}</p>
      <p><strong>Experience:</strong> {doctor.doctorDetails.workExperience}</p>
      <p><strong>Location:</strong> {doctor.doctorDetails.location}</p>
      <p><strong>Contact Number:</strong> {doctor.mobileNumber}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      {doctor.profilePicture && (
        <img
          src={`http://localhost:3000/${doctor.profilePicture}`}
          alt={doctor.username}
          className="doctor-picture"
        />
      )}
      <p><strong>About:</strong> {doctor.doctorDetails.about}</p>
      <button onClick={handleBookAppointment}>Book Appointment</button>
    </div>
  );
}

export default DoctorDetails;
