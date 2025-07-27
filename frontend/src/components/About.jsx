import React from 'react';
import { CheckCircle } from 'lucide-react';

const About = ({ data }) => {
  return (
    <section className="about-section" id="about">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Professional Summary</h2>
        </div>
        
        <div className="about-content">
          <div className="about-summary">
            <p className="summary-text">{data.summary}</p>
          </div>
          
          <div className="about-strengths">
            <h3 className="strengths-title">Key Strengths</h3>
            <div className="strengths-grid">
              {data.strengths.map((strength, index) => (
                <div key={index} className="strength-item">
                  <CheckCircle size={16} className="strength-icon" />
                  <span className="strength-text">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;