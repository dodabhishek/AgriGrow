import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 py-16 px-5 md:px-20">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-16 shadow-lg">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/src/Images/Contact.jpg')" }}
        ></div>
      </div>

      {/* Information Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
            <FaMapMarkerAlt className="text-green-600 text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">Our Location</h3>
          <p className="text-gray-600 text-center">66 Broklyn Road, Golden Street, New York, USA</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn animation-delay-200">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
            <FaPhone className="text-green-600 text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">Phone Number</h3>
          <p className="text-gray-600 text-center">+1 (240)-335-0079</p>
          <p className="text-gray-600 text-center">support@agrios.com</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn animation-delay-400">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
            <FaClock className="text-green-600 text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">Working Hours</h3>
          <p className="text-gray-600 text-center">Mon - Fri: 7:00 am - 6:00 pm</p>
          <p className="text-gray-600 text-center">Sat: 9:00 am - 4:00 pm</p>
        </div>
      </div>

      {/* Map & Contact Form */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-xl shadow-md overflow-hidden animate-slideInLeft">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Find Us on Map</h3>
          <div className="h-[400px] rounded-lg overflow-hidden shadow-inner">
            <iframe
              title="Google Map"
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3473.890252632641!2d76.8160575751423!3d29.94880697497912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e4896f7d4a8a1%3A0x2e9f58c96e2b9c1f!2sMCA%20Department%2C%20NIT%20Kurukshetra!5e0!3m2!1sen!2sin!4v1710588309000!5m2!1sen!2sin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md animate-slideInRight">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:bg-green-700 hover:shadow-lg active:scale-95"
            >
              <span>Send Message</span>
              <FaPaperPlane className="text-sm" />
            </button>
          </form>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-20 bg-white p-8 rounded-xl shadow-md animate-fadeIn">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Frequently Asked Questions</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
            <h4 className="font-semibold text-lg mb-2">How can I place an order?</h4>
            <p className="text-gray-600">You can place an order through our website by adding products to your cart and proceeding to checkout.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
            <h4 className="font-semibold text-lg mb-2">What payment methods do you accept?</h4>
            <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for business accounts.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
            <h4 className="font-semibold text-lg mb-2">How long does shipping take?</h4>
            <p className="text-gray-600">Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business days.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
            <h4 className="font-semibold text-lg mb-2">Do you offer international shipping?</h4>
            <p className="text-gray-600">Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
