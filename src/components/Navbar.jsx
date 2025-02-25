import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">John Doe</div>
      <div className="nav-links">
        <a href="#hero">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
