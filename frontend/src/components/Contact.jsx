import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { portfolioAPI } from '../services/api';

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submissionState, setSubmissionState] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || 
        !formData.subject.trim() || !formData.message.trim()) {
      setSubmissionState({
        loading: false,
        success: false,
        error: 'Please fill in all fields'
      });
      return;
    }

    if (formData.message.trim().length < 10) {
      setSubmissionState({
        loading: false,
        success: false,
        error: 'Message must be at least 10 characters long'
      });
      return;
    }

    setSubmissionState({
      loading: true,
      success: false,
      error: null
    });

    try {
      const result = await portfolioAPI.submitContactForm(formData);
      
      if (result.success) {
        setSubmissionState({
          loading: false,
          success: true,
          error: null
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmissionState(prev => ({ ...prev, success: false }));
        }, 5000);
      } else {
        setSubmissionState({
          loading: false,
          success: false,
          error: result.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setSubmissionState({
        loading: false,
        success: false,
        error: 'Network error. Please check your connection and try again.'
      });
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Let's discuss opportunities and collaborate on exciting projects
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-info-title">Contact Information</h3>
            
            <div className="contact-details">
              <div className="contact-item">
                <Mail size={20} className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">Email</span>
                  <a href={`mailto:${data.email}`} className="contact-value">
                    {data.email}
                  </a>
                </div>
              </div>
              
              <div className="contact-item">
                <Phone size={20} className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">Phone</span>
                  <a href={`tel:${data.phone}`} className="contact-value">
                    {data.phone}
                  </a>
                </div>
              </div>
              
              <div className="contact-item">
                <MapPin size={20} className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">{data.location}</span>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href={`https://${data.linkedin}`} className="social-link" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a href={`https://${data.github}`} className="social-link" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Success Message */}
              {submissionState.success && (
                <div className="form-message success-message">
                  <CheckCircle size={16} />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {/* Error Message */}
              {submissionState.error && (
                <div className="form-message error-message">
                  <AlertCircle size={16} />
                  <span>{submissionState.error}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  disabled={submissionState.loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  disabled={submissionState.loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  disabled={submissionState.loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="form-textarea"
                  required
                  disabled={submissionState.loading}
                />
              </div>
              
              <button 
                type="submit" 
                className={`btn-primary btn-submit ${submissionState.loading ? 'loading' : ''}`}
                disabled={submissionState.loading}
              >
                {submissionState.loading ? (
                  <>
                    <div className="button-spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;