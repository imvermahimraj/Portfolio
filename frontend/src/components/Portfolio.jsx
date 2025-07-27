import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Education from './Education';
import Interests from './Interests';
import Contact from './Contact';
import Footer from './Footer';
import { mockData } from '../data/mockData';

const Portfolio = () => {
  const [portfolioData] = useState(mockData);

  return (
    <div className="portfolio-container">
      <Header />
      <Hero data={portfolioData.hero} />
      <About data={portfolioData.about} />
      <Skills data={portfolioData.skills} />
      <Experience data={portfolioData.experience} />
      <Projects data={portfolioData.projects} />
      <Education data={portfolioData.education} />
      <Interests data={portfolioData.interests} />
      <Contact data={portfolioData.contact} />
      <Footer />
    </div>
  );
};

export default Portfolio;