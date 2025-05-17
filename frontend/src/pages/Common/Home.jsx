import React from "react";
import { FaLeaf, FaTractor, FaSeedling, FaArrowRight, FaStar, FaCheckCircle } from "react-icons/fa"; // Import icons

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[80vh] flex items-center text-white"
        style={{ backgroundImage: "url('/src/images/HomeBg.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="container mx-auto px-5 relative z-10">
          <div 
            className="max-w-2xl animate-fadeIn"
          >
            <p className="text-sm uppercase tracking-wide bg-green-600 inline-block px-3 py-1 rounded-full mb-4">Welcome to Modern Farming</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-2">
              Agriculture & Eco Farming
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              Let's build a sustainable and eco-friendly future through organic and smart agricultural solutions.
            </p>
            <button 
              className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition flex items-center gap-2 group hover:scale-105 active:scale-95"
            >
              Discover More
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Us</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">We provide innovative agricultural solutions that help farmers grow better crops and ensure a sustainable future.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer border border-gray-100 hover:-translate-y-2 animate-fadeIn"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaLeaf className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 text-center">Natural Products</h3>
              <p className="text-gray-600 mt-4 text-center">Ensuring fresh, organic, and naturally grown produce for a healthier life.</p>
            </div>

            {/* Feature 2 */}
            <div 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer border border-gray-100 hover:-translate-y-2 animate-fadeIn animation-delay-200"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaTractor className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 text-center">Modern Farming</h3>
              <p className="text-gray-600 mt-4 text-center">Utilizing the latest technology for more efficient and sustainable farming.</p>
            </div>

            {/* Feature 3 */}
            <div 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer border border-gray-100 hover:-translate-y-2 animate-fadeIn animation-delay-400"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaSeedling className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 text-center">Organic Solutions</h3>
              <p className="text-gray-600 mt-4 text-center">Providing eco-friendly and chemical-free farming methods for better yield.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: Two Rounded Images */}
            <div 
              className="relative flex justify-center animate-slideInLeft"
            >
              <img src="/src/Images/HomePage2Lg.jpg" alt="Farming 1" className="w-96 h-96 rounded-full border-4 border-white shadow-lg object-cover" />
              <img src="/src/Images/HomePage2Sm.jpg" alt="Farming 2" className="w-56 h-56 rounded-full border-4 border-white shadow-lg absolute bottom-0 left-10 object-cover" />
            </div>

            {/* Right: Text Content */}
            <div
              className="animate-slideInRight"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">We Provide High-Quality Agriculture Services</h2>
              <p className="text-gray-600 mt-6 text-lg">
                Our mission is to help farmers grow better crops, improve sustainability, and ensure healthy food for the future.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                  <span className="text-gray-700">Sustainable farming practices</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                  <span className="text-gray-700">Organic certification</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                  <span className="text-gray-700">Expert agricultural guidance</span>
                </div>
              </div>
              
              <button 
                className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full transition text-lg flex items-center gap-2 group hover:scale-105 active:scale-95"
              >
                Discover More
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-5 text-center">
          <div
            className="animate-fadeIn"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services & What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">We provide a wide range of agricultural services to meet your farming needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Agriculture Products", "Organic Products", "Fresh Vegetables", "Dairy Products"].map((title, index) => (
              <div 
                key={index} 
                className={`bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fadeIn animation-delay-${index * 100}`}
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img src={`/src/Images/service${index + 1}.jpg`} alt={title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
                </div>
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                  <p className="text-gray-600 mt-2 flex-grow">High-quality products sourced directly from local farmers and producers.</p>
                  <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors flex items-center gap-2 group">
                    Read More
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Agriculture Products" },
              { number: "200+", label: "Projects Completed" },
              { number: "100+", label: "Farm Solutions" },
              { number: "1000+", label: "Happy Clients" }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`p-4 animate-fadeIn animation-delay-${index * 100}`}
              >
                <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</h3>
                <p className="text-green-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-5 text-center">
          <div
            className="animate-fadeIn"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">Real feedback from our satisfied clients</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                className={`bg-gray-50 p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl animate-fadeIn animation-delay-${id * 100}`}
              >
                <div className="flex justify-center mb-4">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-xl" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6">
                  "Agrios has transformed the way we farm. The quality and service are outstanding!"
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Client Name {id}</p>
                    <p className="text-sm text-gray-500">Farm Owner</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-5 text-center">
          <div
            className="animate-fadeIn"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of farmers who have already improved their yields and sustainability with our solutions.
            </p>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full transition text-lg flex items-center gap-2 group mx-auto hover:scale-105 active:scale-95"
            >
              Get Started Today
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
