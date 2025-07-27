import React from 'react';
import { ExternalLink, Code } from 'lucide-react';

const Projects = ({ data }) => {
  return (
    <section className="projects-section" id="projects">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Project Highlights</h2>
        </div>
        
        <div className="projects-grid">
          {data.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <Code size={20} className="project-icon" />
              </div>
              
              <div className="project-content">
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  <h4 className="tech-title">Technologies Used:</h4>
                  <div className="tech-tags">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="project-achievements">
                  <h4 className="achievements-title">Key Achievements:</h4>
                  <ul className="achievements-list">
                    {project.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="achievement-item">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;