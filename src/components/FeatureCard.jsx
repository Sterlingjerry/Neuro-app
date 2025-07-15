import React, { useContext } from 'react'; // Ensure useContext is imported
import { AppContext } from '../App'; // Adjust path

const FeatureCard = ({ title, description, icon, linkText, linkPage }) => {
  const { setCurrentPage } = useContext(AppContext);
  return (
    <div className="bg-indigo-50 p-6 rounded-xl shadow-lg flex flex-col items-center text-center h-full transition-all transform hover:scale-102 duration-300 border border-indigo-100 hover:border-indigo-300 cursor-pointer">
      <div className="text-5xl mb-4 transform hover:rotate-6 transition-transform duration-300">{icon}</div>
      <h3 className="text-2xl font-semibold font-montserrat text-brand-blue mb-3">{title}</h3>
      <p className="font-montserrat text-brand-black/80 mb-5 flex-grow">{description}</p>
      <button
        onClick={() => setCurrentPage(linkPage)}
        className="mt-auto px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 active:bg-indigo-800 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
      >
        {linkText}
      </button>
    </div>
  );
};

export default FeatureCard;