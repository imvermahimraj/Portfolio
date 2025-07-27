import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

const Experience = ({ data }) => {
  return (
    <section className="experience-section" id="experience">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Professional Experience</h2>
        </div>
        
        <div className="experience-timeline">
          {data.map((job, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3 className="job-title">{job.title}</h3>
                <div className="job-meta">
                  <div className="company-info">
                    <span className="company-name">{job.company}</span>
                    <div className="job-location">
                      <MapPin size={14} />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="job-duration">
                    <Calendar size={14} />
                    <span>{job.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="experience-content">
                <ul className="responsibilities-list">
                  {job.responsibilities.map((responsibility, respIndex) => (
                    <li key={respIndex} className="responsibility-item">
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;