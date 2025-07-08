import React from "react";

const ExpertCard = ({ image, name, expertise, description, rating }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl">
    <div className="w-24 h-24 rounded-full border-4 border-green-100 mb-4 overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-xl font-bold text-green-800 mb-1 text-center">{name}</h3>
    <p className="text-green-600 font-semibold mb-2 text-center">{expertise}</p>
    <p className="text-gray-600 text-center text-sm mb-4">{description}</p>
    <div className="flex items-center gap-1">
      <span className="text-yellow-500 text-lg">★</span>
      <span className="text-yellow-600 font-bold text-lg">{rating}</span>
    </div>
  </div>
);

export default ExpertCard; 