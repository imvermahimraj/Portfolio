import React from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Education from './Education';
import Interests from './Interests';
import Hobbies from './Hobbies';
import Contact from './Contact';
import Footer from './Footer';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';
import { usePortfolio } from '../hooks/usePortfolio';

const Portfolio = () => {
  const { portfolioData, loading, error } = usePortfolio();

  if (loading) {
    return (
      <div className="portfolio-loading">
        <LoadingSpinner size="large" message="Loading Himraj's Portfolio..." />
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="portfolio-error">
        <div className="error-content">
          <h2>Unable to Load Portfolio</h2>
          <p>Please check your internet connection and try again.</p>
          <button 
            className="btn-primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="portfolio-container">
        {error && (
          <div className="portfolio-warning">
            <p>{error}</p>
          </div>
        )}
        <Header />
        <Hero data={portfolioData.hero} />
        <About data={portfolioData.about} />
        <Skills data={portfolioData.skills} />
        <Experience data={portfolioData.experience} />
        <Projects data={portfolioData.projects} />
        <Education data={portfolioData.education} />
        <Interests data={portfolioData.interests} />
        <Hobbies data={portfolioData.hobbies} />
        <Contact data={portfolioData.contact} />
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Portfolio;