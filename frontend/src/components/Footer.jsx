import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-brand-text">Himraj Verma</span>
            <p className="footer-tagline">Quality Assurance Engineer</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4 className="footer-section-title">Quick Links</h4>
              <div className="footer-nav">
                <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
                  About
                </button>
                <button onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}>
                  Skills
                </button>
                <button onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}>
                  Experience
                </button>
                <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                  Projects
                </button>
              </div>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-section-title">Contact</h4>
              <div className="footer-contact">
                <p>imvermahimraj@gmail.com</p>
                <p>+91-9766567561</p>
                <p>Pune, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>© {currentYear} Himraj Verma. All rights reserved.</p>
          </div>
          <div className="footer-made-with">
            <p>
              Made with <Heart size={14} className="heart-icon" /> by Himraj Verma
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;