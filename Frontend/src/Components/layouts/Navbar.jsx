// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Menu, Bell, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Navigation hook

  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">KainchiDarshan</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-indigo-600">
              Home
            </Link>
            <Link
              to="/slot-booking"
              className="px-3 py-2 rounded-md hover:bg-indigo-600"
            >
              Book Slot
            </Link>
            <Link
              to="/routes"
              className="px-3 py-2 rounded-md hover:bg-indigo-600"
            >
              Routes
            </Link>
            <Link
              to="/traffic"
              className="px-3 py-2 rounded-md hover:bg-indigo-600"
            >
              Traffic
            </Link>
            <Link
              to="/feedback"
              className="px-3 py-2 rounded-md hover:bg-indigo-600"
            >
              Feedback
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-indigo-600">
              <Bell size={20} />
            </button>
            <button
              onClick={() => navigate("/adminLogin")}
              className="p-2 rounded-full hover:bg-indigo-600"
            >
              <User size={20} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-indigo-600"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-indigo-600"
            >
              Home
            </Link>
            <Link
              to="/slot-booking"
              className="block px-3 py-2 rounded-md hover:bg-indigo-600"
            >
              Book Slot
            </Link>
            <Link
              to="/routes"
              className="block px-3 py-2 rounded-md hover:bg-indigo-600"
            >
              Routes
            </Link>
            <Link
              to="/traffic"
              className="block px-3 py-2 rounded-md hover:bg-indigo-600"
            >
              Traffic
            </Link>
            <Link
              to="/tickets"
              className="block px-3 py-2 rounded-md hover:bg-indigo-600"
            >
              Tickets
            </Link>
            <Link
              to="/adminLogin"
              className="block px-3 py-2 rounded-md hover:bg-indigo-600"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
