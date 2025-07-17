import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Star, Users, Award, TrendingUp } from "lucide-react";
import { FaTractor, FaLeaf, FaSeedling, FaUsers, FaCheckCircle, FaStar, FaAward } from "react-icons/fa";
import ServiceImg from "../../assets/Images/Service.jpg";

import category1 from "../../assets/Images/category1.jpg";
import category2 from "../../assets/Images/category2.jpg";
import category3 from "../../assets/Images/category3.jpg";
import healthyFood from "../../assets/Images/healthy-food.jpg";
import { FaVideo, FaComments, FaHandshake, FaTools } from "react-icons/fa";
import farmer1 from '../../assets/Images/farmer1.jpg';
import farmer2 from '../../assets/Images/farmer2.jpg';
import fieldVisitsImg from '../../assets/Images/basket.jpg';
import shopImg from '../../assets/Images/Shop.jpg';

const Service = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-emerald-100/30 to-teal-100/30"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
              <p className="relative text-base uppercase tracking-wider bg-green-600 px-6 py-2 rounded-full font-medium text-white">
                Our Services
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Comprehensive <span className="text-green-600">Agricultural Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From smart farming solutions to educational resources, we provide everything modern farmers need to succeed in today's agricultural landscape.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src={ServiceImg} alt="Agricultural Services" className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
              <p className="relative text-base uppercase tracking-wider bg-green-600 px-4 py-2 rounded-full font-medium text-white">
                What We Offer
              </p>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our Specialized Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of agricultural services designed to help farmers achieve better yields and sustainable practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Video Consultations',
                image: farmer1,
                description: 'Book a 1-on-1 video call with agricultural experts for personalized advice and analysis.',
                icon: FaVideo
              },
              {
                title: 'Chat Support',
                image: farmer2,
                description: 'Get instant advice from experts via chat. Share images, documents, and get quick solutions.',
                icon: FaComments
              },
              {
                title: 'Field Visits',
                image: fieldVisitsImg,
                description: 'Schedule on-site visits from experts for hands-on assessment and customized solutions.',
                icon: FaHandshake
              },
              {
                title: 'Tools & Equipment',
                image: shopImg,
                description: 'Access modern tools and equipment for smart, efficient, and sustainable farming.',
                icon: FaTools
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-2xl"></div>
                <div className="relative bg-white/20 p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative overflow-hidden rounded-xl mb-6 h-48">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm font-medium">Learn more about our {service.title.toLowerCase()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-10 h-10 rounded-full flex items-center justify-center">
                      <service.icon className="text-green-600 text-lg" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center gap-2">
                    Learn More
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Innovation Section */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-emerald-100/20 to-teal-100/20"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
              <p className="relative text-base uppercase tracking-wider bg-green-600 px-4 py-2 rounded-full font-medium text-white">
                Innovation
              </p>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              See Our Work in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how our agricultural services and technology are transforming farming practices for the better.
            </p>
          </div>
          
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video">
            {!isVideoPlaying ? (
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-800/70 to-teal-800/60 flex items-center justify-center">
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full -m-2"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group-hover:bg-white">
                    <ArrowRight className="w-12 h-12 text-green-600 transform group-hover:scale-110 transition-transform" />
                  </div>
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
      <section className="py-24 px-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
              <p className="relative text-base uppercase tracking-wider bg-green-600 px-4 py-2 rounded-full font-medium text-white">
                Quality
              </p>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our Quality Standards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards in all our agricultural services, ensuring quality and sustainability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Quality Standards', 
                image: category1,
                description: 'Rigorous quality control processes ensure the best products and services.',
                features: ['Certified Products', 'Quality Testing', 'Standards Compliance']
              },
              { 
                title: 'Organic Farming', 
                image: category2,
                description: 'Sustainable organic farming practices that protect the environment.',
                features: ['Chemical-Free', 'Sustainable', 'Eco-Friendly']
              },
              { 
                title: 'Agriculture Products', 
                image: category3,
                description: 'Premium agricultural products for modern farming needs.',
                features: ['High Quality', 'Reliable', 'Innovative']
              }
            ].map((category, index) => (
              <div 
                key={index} 
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-2xl"></div>
                <div className="relative bg-white/20 p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative overflow-hidden rounded-xl mb-6 h-64">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm font-medium">Discover our {category.title.toLowerCase()}</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{category.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                  <div className="space-y-2">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="text-green-600 text-sm" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthy Food Section */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-emerald-100/20 to-teal-100/20"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-100/50 to-teal-100/50 backdrop-blur-xl rounded-3xl -m-6"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                <img 
                  src={healthyFood} 
                  alt="Healthy Food" 
                  className="w-full h-96 object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <div className="inline-block relative mb-6">
                  <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
                  <p className="relative text-base uppercase tracking-wider bg-green-600 px-4 py-2 rounded-full font-medium text-white">
                    Nutrition
                  </p>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                  Healthy Food for <span className="text-green-600">Good Growth</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We believe in providing nutritious and healthy food options that promote good health and sustainable farming practices. Our commitment to quality ensures that every product meets the highest standards.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Harvesting', icon: FaSeedling },
                  { name: 'Maintenance', icon: FaTractor },
                  { name: 'Housing', icon: FaUsers }
                ].map((feature, index) => (
                  <button 
                    key={index} 
                    className="group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl -z-10"></div>
                    <div className="p-4 text-white rounded-xl flex flex-col items-center gap-2 group-hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                      <feature.icon className="text-2xl group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{feature.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Join thousands of farmers who are already using our services to improve their productivity and build a sustainable future for agriculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-medium hover:bg-green-50 transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-medium hover:bg-white hover:text-green-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;

