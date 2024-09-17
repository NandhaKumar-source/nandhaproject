// import logo from './logo.svg';
// import './App.css';
// import ShopList from './components/Shop';
// import SignupForm from './Ssignup'
// import LoginForm from './Llogin'
// import Navbar from './Navbar';
// function App() {
//   return (
//     <div className="App">
//      <ShopList/> 
//      <SignupForm/> 
//      <LoginForm/>
//      <Navbar/>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Hospitals from './Hospitals';
import Categories from './Categories';
import Doctors from './Doctors';
import Appointment from './Appointment';
import LoginForm from './Llogin';
import SignupForm from './Ssignup';
import Profile from './Profile';
import Settings from './Settings';
import About from './About';
import Services from './Services';
import Footer from './Footer';
import Departments from './Departments';
import DepartmentDetails from './Departmentdetails';
import DepartmentDetails1 from './Alldoctors';
import DoctorDetails from './Doctors';
import AppointmentForm from './Appointmebt';

const App = () => {
  const [user, setUser] = useState(null); // Replace with actual user state

  const handleLogout = () => {
    setUser(null);
    // Handle logout logic
  };

  return (
    <Router>
      {/* <Navbar user={user} onLogout={handleLogout} /> */}
      {/* <Footer/> */}
      <Routes>
       <Route path="/" element={<Home />} />
          <Route path="/hospitals" element={<Hospitals />} />
         <Route path="/hospitals/:hospitalId/departments" element={<Departments />} /> 
         <Route path="/departments/:id" element={<DepartmentDetails />} />
         <Route path="/doctors/:departmentId" element={<DepartmentDetails1 />} />
         <Route path="/doctor/:doctorId" element={<DoctorDetails />} />
         <Route path="/appointments" element={<AppointmentForm />} />
         {/* <Route path="/hospitals/:hospitalId/categories/:categoryId/doctors" element={<Doctors />} />
        <Route path="/doctors/:doctorId/appointment" element={<Appointment />} />  */} 
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} /> */}
        {/* Add other routes here */}
      </Routes> 
    </Router>
  );
};

export default App;
