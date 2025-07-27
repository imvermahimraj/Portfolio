import React from 'react';
import { Zap, Users, TrendingUp } from 'lucide-react';

const Interests = ({ data }) => {
  const getIcon = (iconType) => {
    switch (iconType) {
      case 'cycle':
        return <Zap size={24} className="interest-icon" />;
      case 'teach':
        return <Users size={24} className="interest-icon" />;
      case 'growth':
        return <TrendingUp size={24} className="interest-icon" />;
      default:
        return <Zap size={24} className="interest-icon" />;
    }
  };

  return (
    <section className="interests-section" id="interests">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{data.title}</h2>
          <p className="section-subtitle">{data.description}</p>
        </div>
        
        <div className="interests-grid">
          {data.items.map((interest, index) => (
            <div key={index} className="interest-card">
              <div className="interest-header">
                {getIcon(interest.icon)}
                <h3 className="interest-title">{interest.title}</h3>
              </div>
              <p className="interest-description">{interest.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;