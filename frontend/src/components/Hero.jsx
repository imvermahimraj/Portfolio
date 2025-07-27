import React, { useState } from 'react';
import { MapPin, Phone, Mail, Download, AlertCircle } from 'lucide-react';
import { portfolioAPI } from '../services/api';

const Hero = ({ data }) => {
  const [downloadState, setDownloadState] = useState({
    loading: false,
    error: null
  });

  const handleDownloadResume = async () => {
    setDownloadState({
      loading: true,
      error: null
    });

    try {
      const result = await portfolioAPI.downloadResume();
      
      if (result.success) {
        setDownloadState({
          loading: false,
          error: null
        });
      } else {
        setDownloadState({
          loading: false,
          error: result.error || 'Resume not available for download yet'
        });
      }
    } catch (error) {
      setDownloadState({
        loading: false,
        error: 'Failed to download resume. Please try again.'
      });
    }

    // Clear error after 5 seconds
    if (downloadState.error) {
      setTimeout(() => {
        setDownloadState(prev => ({ ...prev, error: null }));
      }, 5000);
    }
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

            {/* Download Error Message */}
            {downloadState.error && (
              <div className="hero-error-message">
                <AlertCircle size={16} />
                <span>{downloadState.error}</span>
              </div>
            )}

            <div className="hero-actions">
              <button 
                className="btn-primary"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </button>
              <button 
                className={`btn-secondary ${downloadState.loading ? 'loading' : ''}`}
                onClick={handleDownloadResume}
                disabled={downloadState.loading}
              >
                {downloadState.loading ? (
                  <>
                    <div className="button-spinner"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Download Resume
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;