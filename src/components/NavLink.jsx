import React from 'react'; // Ensure React is imported

const NavLink = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-5 py-2 rounded-full bg-brand-blue text-black font-medium font-montserrat hover:bg-black hover:text-brand-blue active:bg-brand-blue/80 transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-75"
  >
    {children}
  </button>
);

export default NavLink;
