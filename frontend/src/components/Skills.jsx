import React from 'react';

const Skills = ({ data }) => {
  return (
    <section className="skills-section" id="skills">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Technical Skills</h2>
        </div>
        
        <div className="skills-grid">
          {data.categories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;