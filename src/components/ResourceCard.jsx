import React from 'react'; // Ensure React is imported

const ResourceCard = ({ title, description, link }) => {
  return (
    <div className="bg-indigo-50 p-6 rounded-xl shadow-lg flex flex-col transition-all transform hover:scale-102 duration-300 border border-indigo-100 hover:border-indigo-300 cursor-pointer">
      <h3 className="text-xl font-semibold font-montserrat text-brand-blue mb-3">{title}</h3>
      <p className="font-montserrat text-brand-black/80 mb-4 flex-grow">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto px-5 py-2 bg-indigo-600 text-white rounded-full text-center hover:bg-indigo-700 active:bg-indigo-800 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
      >
        Learn More
      </a>
    </div>
  );
};

export default ResourceCard;
