import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ For internal navigation

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Premium liquor store offering quality spirits, wines
            and beers at competitive prices.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@liquorstore.com</p>
          <p>Phone: (123) 456-7890</p>
          <div className="footer-socials">
            {/* ✅ External links should be full URLs */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Liquor Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
