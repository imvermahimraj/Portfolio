import React from 'react';
import { CheckCircle, Users, Heart } from 'lucide-react';

const About = ({ data }) => {
  return (
    <section className="about-section" id="about">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
        </div>
        
        <div className="about-content">
          <div className="about-main">
            <div className="about-summary">
              <p className="summary-text">{data.summary}</p>
            </div>
            
            {/* Personal Story */}
            <div className="personal-story">
              <div className="story-header">
                <Users size={20} className="story-icon" />
                <h3 className="story-title">My QA Journey</h3>
              </div>
              <p className="story-text">{data.personalStory}</p>
            </div>

            {/* Philosophy */}
            <div className="philosophy">
              <div className="philosophy-header">
                <Heart size={20} className="philosophy-icon" />
                <h3 className="philosophy-title">My Philosophy</h3>
              </div>
              <p className="philosophy-text">{data.philosophy}</p>
            </div>
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