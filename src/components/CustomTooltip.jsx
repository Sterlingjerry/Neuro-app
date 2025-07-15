import React from 'react'; // Ensure React is imported

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-lg text-gray-800">
        <p className="font-semibold font-montserrat text-brand-blue">{`Date: ${label}`}</p>
        <p className="text-sm font-montserrat text-brand-black">{`Mood: ${payload[0].payload.mood}`}</p>
        <p className="text-xs font-montserrat text-brand-black/60">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
