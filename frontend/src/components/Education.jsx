import React from 'react';
import { GraduationCap, Award } from 'lucide-react';

const Education = ({ data }) => {
  return (
    <section className="education-section" id="education">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Education & Certifications</h2>
        </div>
        
        <div className="education-content">
          <div className="education-item">
            <div className="education-header">
              <GraduationCap size={24} className="education-icon" />
              <div className="education-details">
                <h3 className="degree-title">{data.degree}</h3>
                <p className="institution-name">{data.institution}</p>
                <p className="institution-location">{data.location}</p>
              </div>
            </div>
          </div>
          
          {data.certifications && data.certifications.length > 0 && (
            <div className="certifications-section">
              <h3 className="certifications-title">Certifications</h3>
              <div className="certifications-list">
                {data.certifications.map((certification, index) => (
                  <div key={index} className="certification-item">
                    <Award size={16} className="certification-icon" />
                    <span className="certification-name">{certification}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;