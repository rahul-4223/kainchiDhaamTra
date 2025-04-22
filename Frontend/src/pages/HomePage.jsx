import { useState } from 'react';
import { MapPin, Clock, Users, Ticket, Bell, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  
  const features = [
    {
      title: "Smart Route Selection",
      description: "View and select from multiple routes based on real-time traffic data. We'll suggest the best path for your temple visit.",
      icon: <MapPin size={24} className="text-indigo-600" />,
      image: "/api/placeholder/600/400"
    },
    {
      title: "Time Slot Booking",
      description: "Book your visit in specific time slots to avoid crowds and have a peaceful darshan experience.",
      icon: <Clock size={24} className="text-indigo-600" />,
      image: "/api/placeholder/600/400"
    },
    {
      title: "Live Traffic Updates",
      description: "Get real-time updates about crowd density and traffic conditions around temple premises.",
      icon: <Users size={24} className="text-indigo-600" />,
      image: "/api/placeholder/600/400"
    },
    {
      title: "Digital Entry Passes",
      description: "Generate digital tickets for your booked slots that can be shown at entry points.",
      icon: <Ticket size={24} className="text-indigo-600" />,
      image: "/api/placeholder/600/400"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Simplify Your Temple Visit
              </h1>
              <p className="mt-6 text-xl max-w-3xl">
                Plan your darshan with ease. Book time slots, check crowd levels, and find the best routes - all in one place.
              </p>
              <div className="mt-10 flex space-x-4">
                <Link to="/slot-booking" className="bg-white text-indigo-700 px-6 py-3 rounded-md font-medium shadow-md hover:border-3 hover:bg-gray-100">
                  Book Entry Slot
                </Link>
                <Link to="/routes" className="bg-indigo-400 border border-indigo-500 px-6 py-3 rounded-md font-medium shadow-md hover:border-4 hover:bg-indigo-500">
                  Check Best Route
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="aspect-w-5 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
                <img src="https://www.sacredyatra.com/images/temples/kainchi-dham-temple.webp" alt="Temple dashboard preview" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How KainchiDarshan Works
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform makes temple visits more organized and convenient.
            </p>
          </div>

          <div className="mt-16 lg:grid lg:grid-cols-3 lg:gap-8  ">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="mt-10 lg:mt-0 p-6 border rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveFeatureIndex(index)}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md border-blue-200 bg-indigo-100 hover:border-4">
                    {feature.icon}
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900">{feature.title}</h3>
                </div>
                <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                <div className="mt-4 flex items-center text-indigo-600">
                  <span className="text-sm font-medium">Learn more</span>
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Status Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Live Traffic Updates
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our system monitors crowd density and traffic in real-time. Red dots indicate heavy traffic while green dots show clear areas.
              </p>
              <div className="mt-6 bg-white shadow rounded-lg p-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-medium">Current Status</h3>
                  <span className="text-sm text-gray-500">Updated 5 min ago</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <span>Main Entrance</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Heavy
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>East Route</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Moderate
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>West Route</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Clear
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/traffic" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  View detailed traffic map
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:ml-8">
            <div className="bg-white p-4 rounded-lg shadow">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2093.1943632834514!2d79.51199529414005!3d29.423193752043815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a3ab1b8ec5d9%3A0xea7786fa26ed7dd0!2sKainchi%20Dham%20-%20Shri%20Neeb%20Karori%20Baba%20Ashram!5e0!3m2!1sen!2sin!4v1745321376413!5m2!1sen!2sin"
    width="100%"
    height="400"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded w-full"
  ></iframe>
</div>

            </div>
          </div>
        </div>
      </div>

      {/* Notification Banner */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex-1 flex items-center">
              <Bell size={20} className="text-indigo-300" />
              <p className="ml-3 font-medium text-white truncate">
                <span className="md:hidden">Route A is experiencing heavy traffic!</span>
                <span className="hidden md:inline">Important announcement: Route A is experiencing heavy traffic. Consider Route B for faster access.</span>
              </p>
            </div>
            <div className="mt-2 flex-shrink-0 w-full sm:mt-0 sm:w-auto">
              <Link to="/routes" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">
                View alternatives
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}