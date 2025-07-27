import React from 'react';
import { MapPin, Phone, Mail, Download } from 'lucide-react';

const Hero = ({ data }) => {
  const handleDownloadResume = () => {
    // Mock download functionality - will be implemented with backend
    console.log('Downloading resume...');
    alert('Resume download will be available soon!');
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">{data.name}</h1>
            <h2 className="hero-subtitle">{data.title}</h2>
            <p className="hero-description">{data.subtitle}</p>
            
            <div className="hero-contact">
              <div className="contact-item">
                <MapPin size={16} />
                <span>{data.location}</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>{data.phone}</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>{data.email}</span>
              </div>
            </div>

            <div className="hero-actions">
              <button 
                className="btn-primary"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </button>
              <button 
                className="btn-secondary"
                onClick={handleDownloadResume}
              >
                <Download size={16} />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;