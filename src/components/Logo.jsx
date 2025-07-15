import React from 'react';
import logo from '../assets/neuro-logo.png.jpeg'; // Place your logo image in src/assets/neuro-logo.png

const Logo = ({ className = '' }) => (
  <img src={logo} alt="NEURO Logo" className={`h-12 w-auto ${className}`} />
);

export default Logo;
