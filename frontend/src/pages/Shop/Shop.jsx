import React, { useState } from "react";
import { expertData, chatExperts, fieldVisitExperts } from '../../assets/dummyStoreData';
import toolsAndEquipment from '../../assets/toolsAndEquipment';
import ExpertCard from '../../components/ExpertCard';
import { useNavigate } from 'react-router-dom';

export default function Shop() {
  const [selectedType, setSelectedType] = useState('all');
  const navigate = useNavigate();

  let mainGridData = [];
  if (selectedType === 'experts') mainGridData = expertData;
  else if (selectedType === 'chat') mainGridData = chatExperts;
  else if (selectedType === 'field_visit') mainGridData = fieldVisitExperts;
  else if (selectedType === 'tools') mainGridData = toolsAndEquipment;
  else mainGridData = [
    ...expertData,
    ...chatExperts,
    ...fieldVisitExperts,
    ...toolsAndEquipment
  ];

  // Helper to check if item is a tool/equipment
  const isEquipment = (item) => toolsAndEquipment.includes(item);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20">
      <section className="relative py-16 px-4 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Expert Services & <span className="text-green-600">Smart Farming</span> Solutions</h1>
          <p className="text-lg text-gray-600">Connect with agricultural experts, get personalized consultations, field visits, and access modern tools to maximize your harvest potential.</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="container mx-auto px-4 pt-6">
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {[
            { label: 'All', value: 'all' },
            { label: 'Meet Our Experts', value: 'experts' },
            { label: 'Chat Experts', value: 'chat' },
            { label: 'Field Visits by Experts', value: 'field_visit' },
            { label: 'Tools & Equipment', value: 'tools' },
          ].map(option => (
            <button
              key={option.value}
              className={`px-4 py-2 rounded-full font-medium border transition-all duration-200
                ${selectedType === option.value
                  ? 'bg-green-600 text-white border-green-600 shadow-lg'
                  : 'bg-white text-green-700 border-green-200 hover:bg-green-50'}
              `}
              onClick={() => setSelectedType(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid for Selected Data */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {mainGridData.length > 0 ? (
            mainGridData.map((item, idx) => {
              // If this is a toolsAndEquipment card, make it clickable
              if (isEquipment(item)) {
                return (
                  <div
                    key={item._id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/shop/equipment/${item._id}`)}
                  >
                    <ExpertCard
                      image={item.profileImage || item.imageUrl}
                      name={item.name}
                      expertise={item.expertise || item.type}
                      description={item.description}
                      rating={item.rating}
                    />
                  </div>
                );
              }
              // Otherwise, render as usual
              return (
                <ExpertCard
                  key={item.expertId || item._id || idx}
                  image={item.profileImage || item.imageUrl}
                  name={item.name}
                  expertise={item.expertise || item.type}
                  description={item.description}
                  rating={item.rating}
                />
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500">No data found for this category.</div>
          )}
        </div>
      </div>
    </div>
  );
}
