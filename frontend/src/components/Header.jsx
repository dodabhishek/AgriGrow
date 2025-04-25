import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Header = () => {
  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto flex justify-between items-center px-5 text-gray-700 text-sm">
          <Link to="/" className="flex items-center space-x-2"> {/* Changed to Link */}
            <img src="/src/Images/logo.png" alt="Logo" className="h-10" />
            <span className="text-lg font-bold text-green-600">AgriGrow</span>
          </Link>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-600"><FaFacebook /></a>
            <a href="#" className="hover:text-green-600"><FaTwitter /></a>
            <a href="#" className="hover:text-green-600"><FaInstagram /></a>
          </div>
          <div className="flex space-x-4">
            <a href="tel:+1234567890" className="flex items-center hover:text-green-600"><FaPhone className="mr-1" /> +123-456-7890</a>
            <a href="mailto:info@example.com" className="flex items-center hover:text-green-600"><FaEnvelope className="mr-1" /> info@example.com</a>
            <div className="flex items-center"><FaMapMarkerAlt className="mr-1" /> 123 Street, City</div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center py-3 px-5">
        <nav className="flex space-x-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-green-600">Home</Link> {/* Changed to Link */}
          <Link to="/about" className="hover:text-green-600">About</Link> {/* Changed to Link */}
          <Link to="/service" className="hover:text-green-600">Services</Link> {/* Changed to Link */}
          <Link to="/projects" className="hover:text-green-600">Projects</Link> {/* Changed to Link */}
          <Link to="/shop" className="hover:text-green-600">Shop</Link> {/* Changed to Link */}
          <Link to="/news" className="hover:text-green-600">News</Link> {/* Changed to Link */}
          <Link to="/contact" className="hover:text-green-600">Contact</Link> {/* Changed to Link */}
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input type="text" placeholder="Search..." className="border rounded-full px-4 py-1 w-40 md:w-60 focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-green-600"><FaSearch size={16} /></button>
          </div>
          <button className="text-gray-700 hover:text-green-600"><FaShoppingCart size={20} /></button>
          <button className="text-gray-700 hover:text-green-600"><FaUser size={20} /></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
