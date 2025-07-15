import React, { useContext } from 'react'; // Corrected: changed '=>' to 'from'
import { AppContext } from '../App'; // Adjust path
import FeatureCard from '../components/FeatureCard'; // Adjust path

const HomePage = () => {
  const { userId } = useContext(AppContext);

  return (
    <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl text-center border border-gray-200">
      <h2 className="text-4xl md:text-5xl font-extrabold font-montserrat text-brand-black mb-6 leading-tight">Welcome to Your <span className="text-brand-blue">Well-being Hub!</span></h2>
      <p className="text-lg font-montserrat text-brand-black/80 mb-10 max-w-3xl mx-auto leading-relaxed">
        This app is designed to support your mental health and well-being during your academic journey.
        Take a moment to check in with yourself, reflect in your journal, and explore helpful resources.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <FeatureCard
          title="Daily Check-in"
          description="Track your mood and reflect on your day."
          icon="😊"
          linkText="Start Check-in"
          linkPage="checkin"
        />
        <FeatureCard
          title="Journaling"
          description="Express your thoughts and feelings privately."
          icon="✍️"
          linkText="Open Journal"
          linkPage="journal"
        />
        <FeatureCard
          title="Breathing Exercise"
          description="Practice mindful breathing to calm your mind."
          icon="🧘"
          linkText="Start Breathing"
          linkPage="breathing"
        />
        <FeatureCard
          title="Helpful Resources"
          description="Find articles, exercises, and support."
          icon="📚"
          linkText="Explore Resources"
          linkPage="resources"
        />
      </div>
      <p className="text-sm text-gray-500 mt-10">Your User ID: <span className="font-mono text-xs break-all select-all p-1 bg-gray-100 rounded">{userId}</span></p>
    </div>
  );
};

export default HomePage;
