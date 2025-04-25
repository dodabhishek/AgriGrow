import React from "react";
import { FaLeaf, FaTractor, FaSeedling } from "react-icons/fa"; // Import icons

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[700px] flex items-center text-white"
        style={{ backgroundImage: "url('/src/images/HomeBg.png')" }}
      >
        <div className="container mx-auto px-5">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-wide">Welcome to Modern Farming</p>
            <h1 className="text-5xl font-bold leading-tight mt-2">
              Agriculture & Eco Farming
            </h1>
            <p className="mt-4 text-lg">
              Let’s build a sustainable and eco-friendly future through organic and smart agricultural solutions.
            </p>
            <button className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition">
              Discover More
            </button>
          </div>
        </div>
      </section>

      {/* Hero Section-page2 */}
      <section className="bg-gray-100 py-24">
        <div className="container mx-auto px-5">
          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-24">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300 ease-in-out cursor-pointer">
              <FaLeaf className="text-green-600 text-5xl mx-auto mb-4 transition-transform duration-300 group-hover:rotate-12" />
              <h3 className="text-2xl font-semibold text-gray-800">Natural Products</h3>
              <p className="text-gray-600 mt-2">Ensuring fresh, organic, and naturally grown produce for a healthier life.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300 ease-in-out cursor-pointer">
              <FaTractor className="text-green-600 text-5xl mx-auto mb-4 transition-transform duration-300 group-hover:rotate-12" />
              <h3 className="text-2xl font-semibold text-gray-800">Modern Farming</h3>
              <p className="text-gray-600 mt-2">Utilizing the latest technology for more efficient and sustainable farming.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300 ease-in-out cursor-pointer">
              <FaSeedling className="text-green-600 text-5xl mx-auto mb-4 transition-transform duration-300 group-hover:rotate-12" />
              <h3 className="text-2xl font-semibold text-gray-800">Organic Solutions</h3>
              <p className="text-gray-600 mt-2">Providing eco-friendly and chemical-free farming methods for better yield.</p>
            </div>
          </div>

          {/* Two-Column Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: Two Rounded Images */}
            <div className="relative flex justify-center">
              <img src="/src/Images/HomePage2Lg.jpg" alt="Farming 1" className="w-96 h-96 rounded-full border-4 border-white shadow-lg" />
              <img src="/src/Images/HomePage2Sm.jpg" alt="Farming 2" className="w-56 h-56 rounded-full border-4 border-white shadow-lg absolute bottom-0 left-10" />
            </div>

            {/* Right: Text Content */}
            <div>
              <h2 className="text-5xl font-bold text-gray-800 leading-tight">We Provide High-Quality Agriculture Services</h2>
              <p className="text-gray-600 mt-6 text-lg">
                Our mission is to help farmers grow better crops, improve sustainability, and ensure healthy food for the future.
              </p>
              <button className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full transition text-lg">
                Discover More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section -Page3 */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-10">Our Services & What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Agriculture Products", "Organic Products", "Fresh Vegetables", "Dairy Products"].map((title, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <img src={`/src/Images/service${index + 1}.jpg`} alt={title} className="h-full w-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="text-gray-600 mt-2 flex-grow">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <button className="mt-auto bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">Read More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section (Buttons with Green Background and White Text) */}
      <section className="relative w-full py-10 flex justify-center">
        <div className="shadow-lg rounded-lg px-8 py-6 w-full max-w-5xl flex justify-between">
          {["Agriculture Products", "Project Completed", "Farm Solutions", "Happy Clients"].map((btn, index) => (
            <button key={index} className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700">{btn}</button>
          ))}
        </div>
      </section>

      {/* Background Video Section */}
      <section className="relative w-full">
        <video className="w-full h-[500px] object-cover" autoPlay loop muted>
          <source src="/path-to-your-video.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Explore Projects */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Explore Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((project) => (
              <div
                key={project}
                className="relative group overflow-hidden rounded-lg shadow-lg bg-white cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={`/src/Images/project${project}.jpg`}
                  alt={`Project ${project}`}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800">What Our Clients Say</h2>
          <p className="text-gray-600 mt-2">Real feedback from our satisfied clients</p>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                className="bg-white p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl"
              >
                <p className="text-gray-700 italic">
                  "Agrios has transformed the way we farm. The quality and service are outstanding!"
                </p>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <span className="text-yellow-500 text-lg">★ ★ ★ ★ ★</span>
                </div>
                <p className="mt-2 text-gray-800 font-semibold">Client Name {id}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-5">
          {/* Left Section - Image (50% Width) */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/src/Images/MarketSection.jpg"
              alt="Market Growth"
              className="w-1/2 h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Section - Text (50% Width) */}
          <div className="md:w-1/2 md:pl-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Agrios</h2>
            <p className="text-lg text-gray-600 mb-4">
              We are committed to providing sustainable and high-quality agricultural solutions to farmers worldwide. Our modern technology and eco-friendly methods ensure better productivity and growth.
            </p>
            <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition">
              Discover More
            </button>
          </div>
        </div>
      </section>

      {/* From The Blog */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">From The Blog</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={`/src/Images/blog${item}.jpg`}
                  alt={`Blog ${item}`}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Blog {item}</h3>
                  <p className="text-gray-600 mb-4">
                  Bringing Food Production Back to Cities.
                  </p>
                  <a
                    href="#"
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
