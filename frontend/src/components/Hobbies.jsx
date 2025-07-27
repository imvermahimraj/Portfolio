import React from 'react';
import { Activity, TrendingUp, Puzzle } from 'lucide-react';

const Hobbies = ({ data }) => {
  const getIcon = (iconType) => {
    switch (iconType) {
      case 'tennis':
        return <Activity size={24} className="hobby-icon" />;
      case 'trending':
        return <TrendingUp size={24} className="hobby-icon" />;
      case 'puzzle':
        return <Puzzle size={24} className="hobby-icon" />;
      default:
        return <Activity size={24} className="hobby-icon" />;
    }
  };

  return (
    <section className="hobbies-section" id="hobbies">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{data.title}</h2>
          <p className="section-subtitle">{data.description}</p>
        </div>
        
        <div className="hobbies-grid">
          {data.items.map((hobby, index) => (
            <div key={index} className="hobby-card">
              <div className="hobby-header">
                <div className="hobby-icon-wrapper">
                  {getIcon(hobby.icon)}
                </div>
                <h3 className="hobby-title">{hobby.title}</h3>
              </div>
              
              <div className="hobby-content">
                <p className="hobby-description">{hobby.description}</p>
                {hobby.highlight && (
                  <div className="hobby-highlight">
                    <span className="highlight-text">💡 {hobby.highlight}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;