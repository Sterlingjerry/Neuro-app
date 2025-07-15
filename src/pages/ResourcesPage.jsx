import React from 'react'; // Ensure React is imported
import ResourceCard from '../components/ResourceCard'; // Adjust path

const ResourcesPage = () => {
  const resources = [
    {
      title: "Mindfulness Exercises",
      description: "Simple exercises to help you stay present and reduce stress.",
      link: "https://www.mindful.org/meditation/mindfulness-for-beginners/"
    },
    {
      title: "Coping Strategies for Stress",
      description: "Practical tips and techniques to manage everyday stress.",
      link: "https://www.apa.org/topics/stress/tips"
    },
    {
      title: "Understanding Anxiety",
      description: "Learn about anxiety symptoms, causes, and how to cope.",
      link: "https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Anxiety-Disorders"
    },
    {
      title: "Sleep Hygiene Tips",
      description: "Improve your sleep quality for better mental and physical health.",
      link: "https://www.cdc.gov/sleep/about_sleep/sleep_hygiene.html"
    },
    {
      title: "Connecting with Support",
      description: "Information on reaching out for professional help or peer support.",
      link: "https://www.mentalhealth.gov/get-help/getting-therapy"
    },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-bold font-montserrat text-brand-blue mb-8 text-center">Helpful Resources</h2>
      <p className="text-lg font-montserrat text-brand-black/80 mb-8 text-center max-w-2xl mx-auto">
        Explore these resources to learn more about mental well-being, coping strategies, and where to find support.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {resources.map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
