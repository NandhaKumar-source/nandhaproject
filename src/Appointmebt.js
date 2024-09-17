import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AppointmentForm() {
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    userId: '', // Assume user ID is available through authentication
    doctorId: '',
    hospitalId: '', // Will be set dynamically
    departmentId: '', // Will be set dynamically
    departmentName: '', // Will be set dynamically
    date: '',
    time: '',
    reasonForVisit: '',
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  // Fetch hospitals
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:3000/carepoint/hospitals');
        if (response.ok) {
          const data = await response.json();
          console.log('Hospitals data:', data);
          if (Array.isArray(data)) {
            setHospitals(data);
          } else {
            console.error('Unexpected hospitals data format:', data);
          }
        } else {
          const error = await response.json();
          console.error('Failed to fetch hospitals:', error.message);
        }
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  // Fetch departments when a hospital is selected
  useEffect(() => {
    const fetchDepartments = async () => {
      if (appointmentData.hospitalId) {
        try {
          const response = await fetch(`http://localhost:3000/carepoint/departments/${appointmentData.hospitalId}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Departments data:', data);
            if (Array.isArray(data)) {
              setDepartments(data);
            } else {
              console.error('Unexpected departments data format:', data);
              setDepartments([]);
            }
          } else {
            const error = await response.json();
            console.error('Failed to fetch departments:', error.message);
            setDepartments([]);
          }
        } catch (error) {
          console.error('Error fetching departments:', error);
          setDepartments([]);
        }
      }
    };

    fetchDepartments();
  }, [appointmentData.hospitalId]);

  const fetchAppointments = async (doctorId) => {
    if (doctorId) {
      console.log('Fetching appointments for doctorId:', doctorId);
      try {
        console.log('Sending request to:', `http://localhost:3000/carepoint/users/user/${appointmentData.doctorId}`);
        const response = await fetch(`http://localhost:3000/carepoint/users/user/${appointmentData.doctorId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Response received:', response);
        console.log('Response status:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('Appointments data received:', data);
          setDoctors(Array.isArray(data) ? data : []);
        } else {
          const error = await response.json();
          console.error('Failed to fetch appointments:', error.message || error);
          setDoctors([]);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setDoctors([]);
      }
    } else {
      console.warn('No doctorId specified');
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Submitting appointment with data:', appointmentData); // Debug appointmentData

    try {
      const response = await fetch('http://localhost:3000/carepoint/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Appointment created:', result);
        navigate('/success'); // Redirect to a success page
      } else {
        const error = await response.json();
        console.error('Failed to book appointment:', error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Hospital:
        <select
          value={appointmentData.hospitalId}
          onChange={(e) => {
            const selectedHospitalId = e.target.value;
            setAppointmentData({
              ...appointmentData,
              hospitalId: selectedHospitalId,
              departmentId: '', // Reset department and doctor selections
              departmentName: ''
            });
          }}
        >
          <option value="">Select a hospital</option>
          {hospitals.map(hospital => (
            <option key={hospital._id} value={hospital.hospitalId}>{hospital.name}</option>
          ))}
        </select>
      </label>

      <label>
        Department:
        <select
          value={appointmentData.departmentId}
          onChange={(e) => {
            const selectedDept = departments.find(dept => dept._id === e.target.value);
            setAppointmentData({
              ...appointmentData,
              departmentId: e.target.value,
              departmentName: selectedDept ? selectedDept.departmentName : ''
            });
          }}
        >
          <option value="">Select a department</option>
          {departments.map(department => (
            <option key={department._id} value={department._id}>{department.departmentName}</option>
          ))}
        </select>
      </label>

      <label>
  Doctor:
  <select
    value={appointmentData.doctorId}
    onChange={(e) => {
      const selectedDoctorId = e.target.value;
      console.log('Selected doctor ID:', selectedDoctorId); // Debug selected doctor ID
      setAppointmentData({ ...appointmentData, doctorId: selectedDoctorId });
      console.log('Calling fetchAppointments with doctorId:', selectedDoctorId);
      fetchAppointments(selectedDoctorId); // Call fetchAppointments when doctor is selected
    }}
  >
    <option value="">Select a doctor</option>
    {doctors.map(doctor => (
      <option key={doctor._id} value={doctor._id}>{doctor.username}</option>
    ))}
  </select>
</label>
      <label>
        Date:
        <input
          type="date"
          value={appointmentData.date}
          onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
        />
      </label>

      <label>
        Time:
        <input
          type="time"
          value={appointmentData.time}
          onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
        />
      </label>

      <label>
        Reason for Visit:
        <input
          type="text"
          value={appointmentData.reasonForVisit}
          onChange={(e) => setAppointmentData({ ...appointmentData, reasonForVisit: e.target.value })}
        />
      </label>

      <button type="submit">Book Appointment</button>
    </form>
  );
}

export default AppointmentForm;