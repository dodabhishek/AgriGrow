import React from "react";
import { FaLeaf, FaTractor, FaSeedling, FaArrowRight, FaStar, FaCheckCircle, FaRobot, FaUsers, FaTools, FaMobileAlt, FaCloudSunRain, FaGraduationCap, FaMicroscope, FaFlask, FaSeedling as FaSeed, FaHandshake, FaVideo, FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section with enhanced glassmorphism */}
      <section
        className="relative bg-cover bg-center min-h-screen flex items-center text-white"
        style={{ 
          backgroundImage: "url('/src/images/HomeBg.png')",
          backgroundAttachment: "fixed" 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-transparent"></div>
        <div className="container mx-auto px-5 relative z-10">
          <div className="max-w-4xl">
            {/* Smart Farming Badge */}
            <div className="inline-block relative mb-8">
              <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
              <p className="relative text-base uppercase tracking-wider bg-green-600 px-6 py-2 rounded-full font-medium">
                Smart Farming Community
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
              Modern Farming
              <br />
              <span className="text-[#E2FFE4]">Solutions & Education</span>
              <br />
              Hub
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-12 leading-relaxed">
              Join our community of forward-thinking farmers. Learn about AI-powered tools, modern equipment, and sustainable practices to transform your farming.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-6">
              <button className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-green-600 rounded-full -z-10"></div>
                <div className="px-8 py-4 text-white relative z-10 rounded-full flex items-center gap-3 text-lg font-medium group-hover:bg-green-700 transition-all">
                  Explore Tools
                  <FaTools className="group-hover:rotate-12 transition-transform" />
                </div>
              </button>
              <button className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full -z-10"></div>
                <div className="px-8 py-4 text-white relative z-10 rounded-full flex items-center gap-3 text-lg font-medium border border-white/20 group-hover:bg-white/20 transition-all">
                  Join Community
                  <FaUsers className="group-hover:scale-110 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with enhanced glassmorphism */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="container mx-auto px-5 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 via-emerald-300/20 to-teal-300/20 backdrop-blur-xl rounded-2xl -m-4"></div>
              <h2 className="relative text-3xl md:text-4xl font-bold text-gray-800 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-2xl">
                Empowering Farmers with Technology
              </h2>
            </div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto bg-white/30 backdrop-blur-sm p-4 rounded-xl">
              Access cutting-edge farming solutions and join a community of innovative farmers embracing modern agricultural practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaRobot,
                title: "AI-Powered Farming",
                description: "Smart solutions for crop monitoring, disease detection, and yield optimization."
              },
              {
                icon: FaGraduationCap,
                title: "Educational Resources",
                description: "Access tutorials, workshops, and expert guidance on modern farming techniques."
              },
              {
                icon: FaUsers,
                title: "Farmer Community",
                description: "Connect with fellow farmers, share experiences, and learn from success stories."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-2xl"></div>
                <div className="relative bg-white/20 p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <feature.icon className="text-green-600 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technology Section with enhanced glassmorphism */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-white"></div>
        <div className="container mx-auto px-5 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-100/50 to-teal-100/50 backdrop-blur-xl rounded-3xl -m-6"></div>
              <div className="relative bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-lg">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                  Modern Farming Tools & Technology
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Discover how modern technology can revolutionize your farming practices and improve productivity.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: FaMobileAlt, text: "Mobile apps for farm management" },
                    { icon: FaCloudSunRain, text: "Smart weather monitoring systems" },
                    { icon: FaRobot, text: "AI-powered crop analysis" },
                    { icon: FaTractor, text: "Modern farming equipment" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white/40 backdrop-blur-sm p-3 rounded-xl hover:bg-white/60 transition-colors">
                      <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-10 h-10 rounded-full flex items-center justify-center">
                        <item.icon className="text-green-600 text-xl" />
                      </div>
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
                
                <Link to="/shop" 
                  className="mt-8 inline-flex items-center gap-2 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-sm rounded-full -z-10"></div>
                  <div className="px-8 py-4 text-white flex items-center gap-2 relative z-10 group-hover:bg-white/10 rounded-full transition-all">
                    Explore All Tools
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-emerald-100/30 to-teal-100/30 backdrop-blur-xl rounded-full"></div>
              <div className="relative flex justify-center">
                <img src="/src/Images/HomePage2Lg.jpg" alt="Modern Farming" className="w-96 h-96 rounded-full border-8 border-white/50 shadow-lg object-cover" />
                <img src="/src/Images/HomePage2Sm.jpg" alt="Smart Agriculture" className="w-56 h-56 rounded-full border-8 border-white/50 shadow-lg absolute -bottom-8 -left-8 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Benefits Section with enhanced glassmorphism */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="container mx-auto px-5 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 via-emerald-300/20 to-teal-300/20 backdrop-blur-xl rounded-2xl -m-4"></div>
              <h2 className="relative text-3xl md:text-4xl font-bold text-gray-800 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-2xl">
                Join Our Farming Community
              </h2>
            </div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto bg-white/30 backdrop-blur-sm p-4 rounded-xl">
              Connect with fellow farmers, share knowledge, and grow together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Knowledge Sharing",
                description: "Learn from experienced farmers and agricultural experts",
                icon: FaGraduationCap
              },
              {
                title: "Tech Support",
                description: "Get help with implementing new farming technologies",
                icon: FaTools
              },
              {
                title: "Community Forums",
                description: "Discuss challenges and solutions with fellow farmers",
                icon: FaUsers
              },
              {
                title: "Smart Solutions",
                description: "Access to latest AI and IoT farming solutions",
                icon: FaRobot
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-2xl"></div>
                <div className="relative bg-white/20 p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <item.icon className="text-green-600 text-3xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{item.title}</h3>
                  <p className="text-gray-600 text-center">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section with enhanced glassmorphism */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="container mx-auto px-5 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Growing Impact</h2>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Join thousands of farmers who are already benefiting from our modern farming solutions and community
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-12">
            {[
              { 
                number: "50+", 
                label: "AI Tools",
                description: "Smart farming solutions",
                icon: FaRobot
              },
              { 
                number: "1000+", 
                label: "Active Farmers",
                description: "Growing community",
                icon: FaUsers
              },
              { 
                number: "200+", 
                label: "Training Resources",
                description: "Educational content",
                icon: FaGraduationCap
              },
              { 
                number: "24/7", 
                label: "Community Support",
                description: "Always available",
                icon: FaHandshake
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl"></div>
                <div className="relative p-6 rounded-2xl border border-white/20 hover:bg-white/5 transition-colors">
                  <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <stat.icon className="text-white text-3xl" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-2 text-white group-hover:scale-105 transition-transform">
                    {stat.number}
                  </h3>
                  <p className="text-xl font-semibold text-green-100 mb-2">{stat.label}</p>
                  <p className="text-green-200 text-sm">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Crop Yield Improvement",
                stats: [
                  { label: "Average Increase", value: "35%" },
                  { label: "Soil Health Score", value: "8.5/10" },
                  { label: "Water Efficiency", value: "+40%" }
                ]
              },
              {
                title: "Community Engagement",
                stats: [
                  { label: "Daily Active Users", value: "500+" },
                  { label: "Monthly Workshops", value: "12" },
                  { label: "Expert Consultations", value: "150+" }
                ]
              },
              {
                title: "Technology Adoption",
                stats: [
                  { label: "AI Tool Usage", value: "75%" },
                  { label: "Mobile App Users", value: "850+" },
                  { label: "Smart Sensors", value: "2000+" }
                ]
              }
            ].map((category, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-2xl"></div>
                <div className="relative p-6 rounded-2xl border border-white/20">
                  <h4 className="text-xl font-semibold text-white mb-4">{category.title}</h4>
                  <div className="space-y-3">
                    {category.stats.map((stat, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                        <span className="text-green-100">{stat.label}</span>
                        <span className="text-white font-semibold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Success Metrics */}
          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-2xl"></div>
            <div className="relative p-8 rounded-2xl border border-white/20">
              <h4 className="text-2xl font-semibold text-white mb-6 text-center">Success Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { metric: "Sustainable Practices", value: "92%", trend: "+12%" },
                  { metric: "Cost Reduction", value: "45%", trend: "+8%" },
                  { metric: "Resource Efficiency", value: "78%", trend: "+15%" },
                  { metric: "Farmer Satisfaction", value: "4.8/5", trend: "+0.3" }
                ].map((metric, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4">
                    <p className="text-green-100 text-sm mb-2">{metric.metric}</p>
                    <div className="flex items-end gap-2">
                      <span className="text-white text-2xl font-bold">{metric.value}</span>
                      <span className="text-green-300 text-sm">{metric.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Connect Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="container mx-auto px-5 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 via-emerald-300/20 to-teal-300/20 backdrop-blur-xl rounded-2xl -m-4"></div>
              <h2 className="relative text-3xl md:text-4xl font-bold text-gray-800 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-2xl">
                Connect with Agricultural Experts
              </h2>
            </div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto bg-white/30 backdrop-blur-sm p-4 rounded-xl">
              Get personalized guidance from experienced agricultural experts through various consultation channels.
            </p>
          </div>

          {/* Expert Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: FaMicroscope,
                title: "Soil Scientists",
                description: "Expert analysis of soil composition and recommendations for optimal crop growth."
              },
              {
                icon: FaFlask,
                title: "Agricultural Scientists",
                description: "Research-based guidance on crop varieties, diseases, and farming techniques."
              },
              {
                icon: FaSeed,
                title: "Crop Specialists",
                description: "Specialized knowledge in specific crop types and their cultivation methods."
              }
            ].map((expert, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-2xl"></div>
                <div className="relative bg-white/20 p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <expert.icon className="text-green-600 text-3xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">{expert.title}</h3>
                  <p className="text-gray-600 text-center">{expert.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaVideo,
                title: "Video Consultations",
                features: [
                  "One-on-one video calls with experts",
                  "Screen sharing for detailed analysis",
                  "Record sessions for future reference",
                  "Flexible scheduling options"
                ],
                price: "From ₹999/session",
                availability: "Available 24/7"
              },
              {
                icon: FaComments,
                title: "Chat Support",
                features: [
                  "24/7 chat support",
                  "Share images and documents",
                  "Quick expert responses",
                  "Group discussion forums"
                ],
                price: "From ₹499/month",
                availability: "Instant Access"
              },
              {
                icon: FaHandshake,
                title: "Field Visits",
                features: [
                  "On-site expert consultation",
                  "Hands-on demonstration",
                  "Detailed farm assessment",
                  "Customized solutions"
                ],
                price: "From ₹3,999/visit",
                availability: "Book 3 days in advance"
              }
            ].map((option, index) => (
              <div key={index} className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/90 to-white/80 backdrop-blur-xl rounded-3xl"></div>
                <div className="relative p-8 rounded-3xl transition-all duration-300 h-full border border-green-100/50 hover:shadow-lg hover:shadow-green-100/20">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-green-100/50 w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <option.icon className="text-green-600 text-2xl" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">{option.title}</h3>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-600">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-1">
                          <FaCheckCircle className="text-green-600 text-sm" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price and Availability */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center justify-between text-gray-600 bg-green-50/50 rounded-lg p-3">
                      <span>Starting Price</span>
                      <span className="font-semibold text-green-700">{option.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600 bg-green-50/50 rounded-lg p-3">
                      <span>Availability</span>
                      <span className="font-semibold text-green-700">{option.availability}</span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl px-6 py-4 transition-all duration-300 flex items-center justify-center gap-2 group">
                    Book Consultation
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-200/20 to-green-100/10 rounded-full blur-2xl"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-green-200/20 to-green-100/10 rounded-full blur-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced glassmorphism */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50/80 to-green-50/90"></div>
        <div className="absolute inset-0 bg-[url('/src/Images/HomeBg.png')] opacity-5"></div>
        
        <div className="container mx-auto px-5 relative z-10">
          <div className="max-w-5xl mx-auto bg-white/60 backdrop-blur-lg rounded-3xl border border-green-100 shadow-xl p-12">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-100 rounded-full opacity-50"></div>
              
              <div className="relative text-center space-y-6">
                {/* Badge */}
                <div className="inline-block bg-green-100 text-green-700 text-sm font-medium px-4 py-2 rounded-full mb-4">
                  Get Started Today
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                  Ready to Transform Your Farming?
                </h2>
                
                {/* Description */}
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                  Join our community of innovative farmers and start using modern farming solutions today.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center gap-4 pt-6">
                  <Link to="/shop" 
                    className="group inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3.5 rounded-xl transition-all duration-300"
                  >
                    <span>Explore Tools</span>
                    <FaTools className="group-hover:rotate-12 transition-transform" />
                  </Link>
                  
                  <Link to="/chat" 
                    className="group inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium px-8 py-3.5 rounded-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
                  >
                    <span>Join Community</span>
                    <FaUsers className="text-green-600 group-hover:scale-110 transition-transform" />
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex justify-center items-center gap-8 pt-8 mt-8 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">1000+</div>
                    <div className="text-sm text-gray-500">Active Farmers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">24/7</div>
                    <div className="text-sm text-gray-500">Expert Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">50+</div>
                    <div className="text-sm text-gray-500">AI Tools</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
