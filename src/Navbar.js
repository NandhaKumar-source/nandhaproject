import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling
import usericon from './images/user.png'; // Default user icon

const Navbar = ({ user, onLogout }) => {
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);

  const handleAuthMenuToggle = () => {
    setIsAuthMenuOpen(!isAuthMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <Link to="/">Carepoint</Link>
      </div>
      <div className="nav-main">
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/hospitals">Hospitals</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
        </div>
        <div className="navbar-user">
          <button className="auth-toggle" onClick={handleAuthMenuToggle}>
            <img
              src={user?.profilePicture ? `http://localhost:3000/${user.profilePicture}` : usericon} 
              alt="User Icon" 
              className={`user-icon ${user?.profilePicture ? 'profile' : 'default'}`} 
            />
          </button>
          {isAuthMenuOpen && (
            <div className="auth-menu">
              {!user ? (
                <>
                  <Link to="/login">Log In</Link>
                  <Link to="/signup">Sign Up</Link>
                </>
              ) : (
                <>
                  <Link to="/profile">Profile</Link>
                  <Link to="/settings">Settings</Link>
                  <button onClick={onLogout}>Logout</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
