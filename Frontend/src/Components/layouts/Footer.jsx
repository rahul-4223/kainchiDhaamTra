// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">DevDarshan</h3>
            <p className="mt-1 text-sm text-gray-300">Manage temple visits efficiently</p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="text-gray-300 hover:text-white text-sm">About</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">Contact</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">Help</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">Privacy Policy</a>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-center text-gray-400">
          © {new Date().getFullYear()} DevDarshan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;