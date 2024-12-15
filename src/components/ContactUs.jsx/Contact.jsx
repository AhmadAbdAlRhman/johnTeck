import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import './Contact.css'; // تأكد من أنك تضيف هذا الملف

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-item">
        <FontAwesomeIcon icon={faFacebookSquare} size="2x" className="icon" />
        <p className="contact-title">Facebook</p>
        <a target="_blank"
        rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=61556634712053" className="contact-link"> facebook.com</a>
      </div>

      <div className="contact-item">
        <FontAwesomeIcon icon={faInstagram} size="2x" className="icon" />
        <p className="contact-title">Instagram</p>
        <a  target="_blank"
        rel="noopener noreferrer" href="https://www.instagram.com/johntekvalves/" className="contact-link">instagram.com/johntekvalves/ </a>
      </div>

      <div className="contact-item">
        <FontAwesomeIcon icon={faEnvelope} size="2x" className="icon" />
        <p className="contact-title">Email</p>
        <a  target="_blank"
        rel="noopener noreferrer" href="mailto:info@johntekvalves.com" className="contact-link">info@johntekvalves.com </a>
      </div>

      <div className="contact-item">
        <FontAwesomeIcon icon={faPhone} size="2x" className="icon" />
        <p className="contact-title">Phone</p>
        <a  target="_blank"
        rel="noopener noreferrer" href="tel:+0981398162735" className="contact-link">+0981398162735 </a>
      </div>
    </div>
  );
};

export default Contact;
