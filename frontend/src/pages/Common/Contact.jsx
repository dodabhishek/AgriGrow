import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaPaperPlane, FaUser, FaComments, FaGlobe, FaHeadset, FaShieldAlt, FaTruck, FaCreditCard } from "react-icons/fa";
import ContactImg from "../../assets/Images/Contact.jpg";

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
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-emerald-100/30 to-teal-100/30"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
              <p className="relative text-base uppercase tracking-wider bg-green-600 px-6 py-2 rounded-full font-medium text-white">
                Get In Touch
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Let's <span className="text-green-600">Connect</span> and Grow Together
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions about our agricultural services? We're here to help you succeed in your farming journey.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src={ContactImg} alt="Contact Us" className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
              <p className="relative text-base uppercase tracking-wider bg-green-600 px-4 py-2 rounded-full font-medium text-white">
                Contact Information
              </p>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              How to Reach Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with our agricultural experts for support, questions, or collaboration opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: FaMapMarkerAlt,
                title: "Our Location",
                description: "66 Broklyn Road, Golden Street, New York, USA",
                color: "from-green-100 to-emerald-100"
              },
              {
                icon: FaPhone,
                title: "Phone & Email",
                description: "+1 (240)-335-0079",
                subDescription: "support@agrios.com",
                color: "from-emerald-100 to-teal-100"
              },
              {
                icon: FaClock,
                title: "Working Hours",
                description: "Mon - Fri: 7:00 am - 6:00 pm",
                subDescription: "Sat: 9:00 am - 4:00 pm",
                color: "from-teal-100 to-green-100"
              }
            ].map((info, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-2xl"></div>
                <div className="relative bg-white/20 p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`bg-gradient-to-br ${info.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                    <info.icon className="text-green-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">{info.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{info.description}</p>
                  {info.subDescription && (
                    <p className="text-gray-600 text-center leading-relaxed mt-2">{info.subDescription}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Contact Form Section */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-emerald-100/20 to-teal-100/20"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
              <p className="relative text-base uppercase tracking-wider bg-green-600 px-4 py-2 rounded-full font-medium text-white">
                Get In Touch
              </p>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our services? Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-100/50 to-teal-100/50 backdrop-blur-xl rounded-3xl -m-6"></div>
              <div className="relative bg-white/20 p-6 rounded-3xl border border-white/50 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                  <FaMapMarkerAlt className="text-green-600" />
                  Find Us on Map
                </h3>
                <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    title="Google Map"
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3473.890252632641!2d76.8160575751423!3d29.94880697497912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e4896f7d4a8a1%3A0x2e9f58c96e2b9c1f!2sMCA%20Department%2C%20NIT%20Kurukshetra!5e0!3m2!1sen!2sin!4v1710588309000!5m2!1sen!2sin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-3xl"></div>
              <div className="relative bg-white/20 p-8 rounded-3xl border border-white/50 shadow-lg">
                <h3 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                  <FaComments className="text-green-600" />
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                      <FaUser className="text-green-600" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full p-4 border-2 border-white/50 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FaEnvelope className="text-green-600" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full p-4 border-2 border-white/50 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FaComments className="text-green-600" />
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows="5"
                      className="w-full p-4 border-2 border-white/50 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-500 resize-none"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl -z-10"></div>
                    <div className="p-4 text-white rounded-xl flex items-center justify-center gap-3 font-medium group-hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                      <span>Send Message</span>
                      <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
              <p className="relative text-base uppercase tracking-wider bg-green-600 px-4 py-2 rounded-full font-medium text-white">
                FAQ
              </p>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our agricultural services and platform.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-3xl"></div>
            <div className="relative bg-white/20 p-8 rounded-3xl border border-white/50 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: FaGlobe,
                    question: "How can I place an order?",
                    answer: "You can place an order through our website by adding products to your cart and proceeding to checkout with our secure payment system."
                  },
                  {
                    icon: FaCreditCard,
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards, PayPal, and bank transfers for business accounts to ensure convenient payment options."
                  },
                  {
                    icon: FaTruck,
                    question: "How long does shipping take?",
                    answer: "Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business days for urgent orders."
                  },
                  {
                    icon: FaShieldAlt,
                    question: "Do you offer international shipping?",
                    answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location and customs."
                  }
                ].map((faq, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 backdrop-blur-sm rounded-2xl -m-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-6 border-2 border-white/50 rounded-2xl hover:border-green-500 transition-all duration-300 bg-white/30 backdrop-blur-sm">
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                          <faq.icon className="text-green-600 text-lg" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-3 text-gray-800">{faq.question}</h4>
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-block relative mb-6">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full -m-2"></div>
            <div className="relative bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full">
              <FaHeadset className="text-2xl" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Need Immediate Assistance?
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Our agricultural experts are available to help you with any questions about farming, products, or our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-medium hover:bg-green-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              <FaPhone />
              Call Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-medium hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center justify-center gap-2">
              <FaEnvelope />
              Email Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
