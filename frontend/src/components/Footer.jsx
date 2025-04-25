import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">About Agrios</h3>
          <p className="text-gray-400">We are dedicated to sustainable and eco-friendly farming solutions.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li><a href="#" className="hover:text-green-500">Home</a></li>
            <li><a href="#" className="hover:text-green-500">About Us</a></li>
            <li><a href="#" className="hover:text-green-500">Services</a></li>
            <li><a href="#" className="hover:text-green-500">Projects</a></li>
            <li><a href="#" className="hover:text-green-500">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Info</h3>
          <p className="text-gray-400">123 Farming Street, Green City</p>
          <p className="text-gray-400">Phone: +123-456-7890</p>
          <p className="text-gray-400">Email: info@agrios.com</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">Subscribe for updates.</p>
          <div className="flex">
            <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 text-black rounded-l-md focus:outline-none" />
            <button className="bg-green-500 px-4 py-2 rounded-r-md hover:bg-green-600">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-5 text-center text-gray-500">
        <p>&copy; 2025 Agrios. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
