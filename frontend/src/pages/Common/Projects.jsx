import React from "react";

const Projects = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating circles with different sizes and positions */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-400 rounded-full opacity-20 animate-float" />
          <div className="absolute top-1/2 -left-12 w-64 h-64 bg-emerald-400 rounded-full opacity-20 animate-float-delayed" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-green-300 rounded-full opacity-20 animate-float-more-delayed" />
          
          {/* Decorative lines */}
          <div className="absolute top-1/4 left-1/4 w-32 h-1 bg-white opacity-20 rotate-45 animate-slide-in" />
          <div className="absolute bottom-1/3 right-1/3 w-24 h-1 bg-white opacity-20 -rotate-12 animate-slide-in-delayed" />
          
          {/* Small dots pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20 transform hover:scale-[1.02] transition-all duration-500">
              <div className="mb-8">
                <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 animate-fadeIn">
                  Agricultural Excellence
                </span>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slideUp bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100">
                  Our Projects
                </h1>
                <p className="text-xl md:text-2xl mb-8 animate-fadeIn text-green-50 max-w-2xl mx-auto">
                  Discover our innovative agricultural initiatives that are shaping the future of farming
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
                <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center group">
                  <span>Explore Projects</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 active:scale-95">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-more-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        .animate-slide-in {
          animation: slideIn 1s ease-out forwards;
        }
        
        .animate-slide-in-delayed {
          animation: slideIn 1s ease-out forwards;
          animation-delay: 0.5s;
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px) rotate(45deg);
          }
          to {
            opacity: 0.2;
            transform: translateX(0) rotate(45deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;
