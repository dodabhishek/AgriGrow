import React, { useState } from "react";

const Service = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-64">
        <img src="/src/Images/Service.jpg" alt="Services" className="w-full h-full object-cover" />
      </div>

      {/* Services Section */}
      <div className="container mx-auto p-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {['Agriculture Products', 'Organic Products', 'Fresh Vegetables', 'Dairy Products'].map((service, index) => (
            <div key={index} className="bg-white p-6 shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
              <img src={`/src/Images/service${index+1}.jpg`} alt={service} className="w-full h-40 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-4">{service}</h3>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-auto">Details</button>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="relative bg-cover bg-center h-96 flex items-center justify-center" style={{ backgroundImage: "url('/path-to-video-background.jpg')" }}>
        {!isVideoPlaying ? (
          <button
            onClick={() => setIsVideoPlaying(true)}
            className="bg-white text-black p-4 rounded-full shadow-lg hover:bg-gray-300 transition"
          >
            ▶
          </button>
        ) : (
          <video className="absolute inset-0 w-full h-full object-cover" controls autoPlay>
            <source src="/path-to-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Quality Standards Section */}
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {['Quality Standards', 'Organic Farming', 'Agriculture Products'].map((category, index) => (
            <div key={index} className="bg-white p-6 shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
              <img src={`/src/Images/category${index+1}.jpg`} alt={category} className="w-full h-40 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Healthy Food Section */}
      <div className="container mx-auto p-8 flex flex-col md:flex-row items-center">
        <img src="/src/Images/healthy-food.jpg" alt="Healthy Food" className="w-full md:w-1/2 h-80 object-cover rounded mb-6 md:mb-0 transform transition duration-300 hover:scale-105" />
        <div className="md:ml-8 text-center md:text-left flex flex-col justify-between h-full">
          <h2 className="text-3xl font-bold mb-4">Healthy Food for Good Growth</h2>
          <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus sodales eros.</p>
          <div className="grid grid-cols-3 gap-4">
            {['Harvesting', 'Maintenance', 'Housing'].map((feature, index) => (
              <button key={index} className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700">{feature}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
