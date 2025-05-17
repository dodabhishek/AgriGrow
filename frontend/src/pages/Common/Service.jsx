import React, { useState } from "react";

const Service = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img src="/src/Images/Service.jpg" alt="Services" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white px-4 animate-fadeIn">
        
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Specialized Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of agricultural services to help farmers achieve better yields
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Agriculture Products', image: '/src/Images/service1.jpg' },
              { title: 'Organic Products', image: '/src/Images/service2.jpg' },
              { title: 'Fresh Vegetables', image: '/src/Images/service3.jpg' },
              { title: 'Dairy Products', image: '/src/Images/service4.jpg' }
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="relative overflow-hidden group h-48">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm">Learn more about our {service.title.toLowerCase()}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors transform hover:scale-105 active:scale-95 w-full">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">See Our Work in Action</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch how our agricultural services are transforming farming practices
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
            {!isVideoPlaying ? (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="bg-white text-green-600 p-6 rounded-full shadow-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-110 active:scale-95 group"
                >
                  <svg className="w-8 h-8 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            ) : (
              <video className="w-full h-full object-cover" controls autoPlay>
                <source src="/path-to-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </section>

      {/* Quality Standards Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Quality Standards</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We maintain the highest standards in all our agricultural services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Quality Standards', image: '/src/Images/category1.jpg' },
              { title: 'Organic Farming', image: '/src/Images/category2.jpg' },
              { title: 'Agriculture Products', image: '/src/Images/category3.jpg' }
            ].map((category, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="relative overflow-hidden group h-64">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm">Discover our {category.title.toLowerCase()}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{category.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthy Food Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                <img 
                  src="/src/Images/healthy-food.jpg" 
                  alt="Healthy Food" 
                  className="w-full h-80 object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Healthy Food for Good Growth</h2>
              <p className="text-lg mb-8 text-gray-600">
                We believe in providing nutritious and healthy food options that promote good health and sustainable farming practices.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Harvesting', 'Maintenance', 'Housing'].map((feature, index) => (
                  <button 
                    key={index} 
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                    }}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Service;
