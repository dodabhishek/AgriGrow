import React from "react";
import { FaPlayCircle, FaLeaf, FaUsers, FaGraduationCap, FaRobot, FaHandshake, FaTractor, FaSeedling, FaMobileAlt, FaCloudSunRain, FaTools, FaCheckCircle } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-emerald-100/30 to-teal-100/30"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
              <p className="relative text-base uppercase tracking-wider bg-green-600 px-6 py-2 rounded-full font-medium text-white">
                About AgriGrow
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Revolutionizing <span className="text-green-600">Agriculture</span> Through Technology & Community
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AgriGrow is more than just a platform—it's a movement towards sustainable, smart farming that connects farmers, consumers, and technology to create a better future for agriculture.
            </p>
          </div>
          <img src="/src/Images/About.jpg" alt="Modern Agriculture" className="w-full rounded-2xl shadow-2xl" />
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-100/50 to-teal-100/50 backdrop-blur-xl rounded-3xl -m-6"></div>
            <img src="/src/Images/AboutF1.jpg" alt="Sustainable Farming" className="relative w-full h-96 object-cover rounded-2xl shadow-xl" />
          </div>
          <div className="space-y-6">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
              <p className="relative text-base uppercase tracking-wider bg-green-600 px-4 py-2 rounded-full font-medium text-white">
                Our Mission
              </p>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 leading-tight">
              Empowering Farmers with Modern Solutions
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At AgriGrow, we believe that the future of agriculture lies in the perfect blend of traditional wisdom and cutting-edge technology. Our platform serves as a bridge between farmers and consumers, fostering a community where knowledge, resources, and fresh produce flow seamlessly.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600 text-xl" />
                <span className="text-gray-700">Direct farmer-to-consumer marketplace</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600 text-xl" />
                <span className="text-gray-700">AI-powered farming insights and tools</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600 text-xl" />
                <span className="text-gray-700">Educational resources and community support</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600 text-xl" />
                <span className="text-gray-700">Sustainable and organic farming practices</span>
              </div>
            </div>
            <button className="bg-green-600 text-white px-8 py-4 rounded-xl shadow-lg transform transition-all duration-300 hover:bg-green-700 hover:scale-105 hover:shadow-xl font-medium">
              Join Our Community
            </button>
          </div>
        </div>
      </section>
      
      {/* Core Features Section */}
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
              Comprehensive Farming Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From smart technology to community support, we provide everything modern farmers need to succeed in today's agricultural landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaRobot,
                title: "AI-Powered Insights",
                description: "Advanced analytics and machine learning tools to optimize crop yields, detect diseases early, and provide personalized farming recommendations."
              },
              {
                icon: FaGraduationCap,
                title: "Educational Hub",
                description: "Access to expert tutorials, workshops, and resources on modern farming techniques, sustainable practices, and agricultural innovation."
              },
              {
                icon: FaUsers,
                title: "Farmer Community",
                description: "Connect with fellow farmers, share experiences, discuss challenges, and learn from success stories across the agricultural community."
              },
              {
                icon: FaLeaf,
                title: "Organic Marketplace",
                description: "Direct-to-consumer platform for fresh, organic produce, ensuring fair prices for farmers and quality products for consumers."
              },
              {
                icon: FaMobileAlt,
                title: "Mobile Solutions",
                description: "User-friendly mobile applications for farm management, inventory tracking, and real-time monitoring of agricultural operations."
              },
              {
                icon: FaHandshake,
                title: "Sustainable Partnerships",
                description: "Building lasting relationships between farmers, consumers, and agricultural experts to promote sustainable farming practices."
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-2xl"></div>
                <div className="relative bg-white/20 p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <feature.icon className="text-green-600 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Technology Section */}
      <section className="relative bg-cover bg-center py-48 text-center text-white" style={{ backgroundImage: "url('/src/Images/OrganicProducts.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-800/70 to-teal-800/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <FaPlayCircle className="mx-auto w-20 h-20 text-white cursor-pointer mb-6 hover:scale-110 transition-transform" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Technology Meets Tradition
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            We combine cutting-edge agricultural technology with time-tested farming wisdom to create solutions that are both innovative and practical for today's farmers.
          </p>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
              <p className="relative text-base uppercase tracking-wider bg-green-600 px-4 py-2 rounded-full font-medium text-white">
                Our Values
              </p>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide everything we do, from platform development to community building and sustainable practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Sustainability",
                description: "Promoting eco-friendly farming practices that protect our environment for future generations."
              },
              {
                title: "Innovation",
                description: "Embracing new technologies and methods to improve agricultural efficiency and productivity."
              },
              {
                title: "Community",
                description: "Building strong connections between farmers, consumers, and agricultural experts."
              },
              {
                title: "Quality",
                description: "Ensuring the highest standards in both our platform services and the products we facilitate."
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block relative mb-6">
            <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
            <p className="relative text-base uppercase tracking-wider bg-green-600 px-4 py-2 rounded-full font-medium text-white">
              Our Team
            </p>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Meet the AgriGrow Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Our diverse team combines agricultural expertise, technological innovation, and community passion to drive the future of farming.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Dr. Sarah Chen", 
                role: "Agricultural Technology Lead",
                image: "/src/Images/farmer1.jpg",
                description: "Expert in AI applications for agriculture with 15+ years in sustainable farming technology."
              },
              { 
                name: "Marcus Rodriguez", 
                role: "Community Development",
                image: "/src/Images/farmer2.jpg",
                description: "Passionate about building strong farmer communities and promoting knowledge sharing."
              },
              { 
                name: "Priya Patel", 
                role: "Sustainability Specialist",
                image: "/src/Images/farmer3.jpg",
                description: "Dedicated to promoting organic farming practices and environmental conservation."
              }
            ].map((member, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-2xl"></div>
                <div className="relative bg-white/20 p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="overflow-hidden rounded-xl mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-64 object-cover transition-all duration-300 group-hover:scale-105" 
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Farming Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Join thousands of farmers who are already using AgriGrow to improve their productivity, connect with the community, and build a sustainable future for agriculture.
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
}



