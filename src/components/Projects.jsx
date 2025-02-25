import React, { useState } from 'react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      category: 'dashboard',
      image: './images/market-analysis.jpg',
      title: 'Market Analysis Dashboard',
      description: 'Interactive dashboard analyzing market trends and consumer behavior patterns.',
      tags: ['Tableau', 'Data Viz']
    },
    {
      category: 'ml',
      image: './images/sales-prediction.jpg',
      title: 'Predictive Sales Model',
      description: 'ML model predicting sales trends with 95% accuracy.',
      tags: ['Python', 'ML']
    },
    {
      category: 'analysis',
      image: './images/customer-segmentation.jpg',
      title: 'Customer Segmentation',
      description: 'Advanced clustering analysis for targeted marketing strategies.',
      tags: ['Python', 'Analytics']
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="section">
      <h2>Featured Projects</h2>
      <div className="filter-container">
        {['all', 'dashboard', 'ml', 'analysis'].map(filter => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div key={index} className="project-card" data-category={project.category}>
            <img src={project.image} alt={project.title} />
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
