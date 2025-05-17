import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Agrios
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              We are dedicated to sustainable and eco-friendly farming solutions, helping farmers grow better crops with innovative technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-green-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-green-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-green-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 mt-1" />
                <span className="text-gray-400">123 Farming Street, Green City, Country</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500" />
                <span className="text-gray-400">+123-456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500" />
                <span className="text-gray-400">info@agrios.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Newsletter</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest updates and farming tips.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 p-2 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Agrios. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
