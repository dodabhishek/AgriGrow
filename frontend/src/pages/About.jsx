
import React from "react";
import { FaPlayCircle } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-gray-100">
      {/* About Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <img src="/src/images/About.jpg" alt="Agriculture" className="w-full rounded-lg shadow-lg" />
        </div>
      </section>
      
      {/* Content Section with Image */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img src="/src/images/AboutF1.jpg" alt="Agriculture" className="w-full h-80 object-cover rounded-lg shadow-lg" />
          <div className="text-center md:text-left">
            <h2 className="text-green-700 font-semibold text-sm">Get to Know Us</h2>
            <h1 className="text-3xl font-bold">The Best Agriculture Market</h1>
            <p className="text-gray-600 max-w-2xl">
              There are many variations of passages of lorem available, but the majority have suffered alteration.
            </p>
            <ul className="list-disc pl-5 text-gray-700 text-left max-w-2xl">
              <li>Suspe ndisse suscipit sagittis leo</li>
              <li>Entum estibulum dignissim posuere</li>
              <li>Lorem ipsum on the tend to repeat</li>
            </ul>
            <button className="bg-green-600 text-white px-6 py-3 mt-4 rounded-md shadow-lg transform transition-all duration-300 hover:bg-green-700 hover:scale-105 hover:shadow-xl">
              Discover More
            </button>
          </div>
        </div>
      </section>
      
      {/* Video Section */}
      <section className="relative bg-cover bg-center py-48 text-center text-white" style={{ backgroundImage: "url('/video-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <FaPlayCircle className="mx-auto w-16 h-16 text-white cursor-pointer" />
          <h2 className="text-2xl font-bold mt-4">ECO-Friendly Products can be Made from Scratch</h2>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-yellow-600 font-semibold text-sm">Our Testimonials</h2>
          <h1 className="text-3xl font-bold mb-6">What They Say</h1>
          <div className="flex flex-col md:flex-row gap-6">
            {[
              { name: "Bonnie Tolbet", role: "Customer" },
              { name: "Sarah Albert", role: "Customer" }
            ].map((person, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-md">
                <p className="text-gray-600">There are many variations of passage available but the majority have suffered alteration.</p>
                <h3 className="mt-4 font-semibold">{person.name}</h3>
                <p className="text-sm text-gray-500">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Farmers Section */}
      <section className="py-40 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-yellow-600 font-semibold text-sm">Team Members</h2>
          <h1 className="text-3xl font-bold mb-6">Meet Our Farmers</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Kevin Smith", image: "/src/Images/farmer1.jpg" },
              { name: "Jessica Brown", image: "/src/Images/farmer2.jpg" },
              { name: "David Martin", image: "/src/Images/farmer3.jpg" }
            ].map((farmer, index) => (
              <div
                key={index}
                className="overflow-hidden h-96 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-100 rounded-lg"
              >
                <img src={farmer.image} alt={farmer.name} className="w-full h-3/4 object-cover transition-all duration-300 hover:opacity-80" />
                <div className="text-center p-4">
                  <h3 className="font-semibold text-lg text-gray-800 hover:text-green-700">{farmer.name}</h3>
                  <p className="text-sm text-gray-500">Farmer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}



