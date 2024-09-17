import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importing icons
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About CarePoint</h3>
          <p>
            CarePoint is your one-stop platform to find hospitals, choose doctors by specialty, 
            and book appointments conveniently. We make healthcare simple and accessible for everyone.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/hospitals">Hospitals</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="footer-section categories">
          <h3>Doctor Categories</h3>
          <ul>
            <li><Link to="/category/heart-surgeon">Heart Surgeon</Link></li>
            <li><Link to="/category/neurologist">Neurologist</Link></li>
            <li><Link to="/category/dentist">Dentist</Link></li>
            <li><Link to="/category/pediatrician">Pediatrician</Link></li>
          </ul>
        </div>
        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <p>Email: support@carepoint.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-social">
          <p>Follow Us:</p>
          <div className="social-icons">
            <div className="icon-container">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="social-icon" />
                <span className="tooltip">Facebook</span>
              </a>
            </div>
            <div className="icon-container">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="social-icon" />
                <span className="tooltip">Twitter</span>
              </a>
            </div>
            <div className="icon-container">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
                <span className="tooltip">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <p>&copy; 2024 CarePoint. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
