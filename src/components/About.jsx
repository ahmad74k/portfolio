import React from 'react';

const About = () => {
  const skills = ['Python', 'SQL', 'Tableau', 'Power BI', 'Machine Learning'];

  return (
    <section id="about" className="section">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p>Data analyst with 5+ years of experience in transforming complex datasets into strategic business insights. Specialized in statistical analysis, data visualization, and predictive modeling.</p>
        </div>
        <div className="skills">
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
