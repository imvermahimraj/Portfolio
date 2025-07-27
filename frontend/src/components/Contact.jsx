import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission - will be implemented with backend
    console.log('Contact form submitted:', formData);
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
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
                />
              </div>
              
              <button type="submit" className="btn-primary btn-submit">
                <Send size={16} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;