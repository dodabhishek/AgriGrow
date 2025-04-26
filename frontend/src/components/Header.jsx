import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const { authUser } = useAuthStore(); // Get authUser from the store
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleUserClick = () => {
    if (authUser) {
      navigate("/profile"); // Redirect to profile page if logged in
    } else {
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  const handleCartClick = () => {
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto flex justify-between items-center px-5 text-gray-700 text-sm">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/src/Images/logo.png" alt="Logo" className="h-10" />
            <span className="text-lg font-bold text-green-600">AgriGrow</span>
          </Link>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-600">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-green-600">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-green-600">
              <FaInstagram />
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex space-x-4">
            <a
              href="tel:+1234567890"
              className="flex items-center hover:text-green-600"
            >
              <FaPhone className="mr-1" /> +123-456-7890
            </a>
            <a
              href="mailto:info@example.com"
              className="flex items-center hover:text-green-600"
            >
              <FaEnvelope className="mr-1" /> info@example.com
            </a>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-1" /> 123 Street, City
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="container mx-auto flex justify-between items-center py-3 px-5">
        {/* Navigation Links */}
        <nav className="flex space-x-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-green-600">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-600">
            About
          </Link>
          <Link to="/service" className="hover:text-green-600">
            Services
          </Link>
          <Link to="/projects" className="hover:text-green-600">
            Projects
          </Link>
          {authUser?.role === "admin" ? (
            <Link to="/products" className="hover:text-green-600">
              Products
            </Link>
          ) : (
            <Link to="/shop" className="hover:text-green-600">
              Shop
            </Link>
          )}
          <Link to="/contact" className="hover:text-green-600">
            Contact
          </Link>
        </nav>

        {/* Search, Cart, and User Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-full px-4 py-1 w-40 md:w-60 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-green-600">
              <FaSearch size={16} />
            </button>
          </div>

          {/* Cart Button */}
          {authUser?.role !== "admin" && (
            <button
              className="text-gray-700 hover:text-green-600"
              onClick={handleCartClick}
            >
              <FaShoppingCart size={20} />
            </button>
          )}

          {/* User Profile Button */}
          <button
            className="text-gray-700 hover:text-green-600"
            onClick={handleUserClick}
          >
            <FaUser size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;