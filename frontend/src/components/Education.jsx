import React from 'react';
import { Award } from 'lucide-react';

const Education = ({ data }) => {
  return (
    <section className="education-section" id="education">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Certifications</h2>
        </div>
        
        <div className="education-content">
          {data.certifications && data.certifications.length > 0 && (
            <div className="certifications-section">
              <div className="certifications-list">
                {data.certifications.map((certification, index) => (
                  <div key={index} className="certification-item">
                    <Award size={24} className="certification-icon" />
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