import { useState } from 'react';
import { Map, Navigation, ArrowUpRight, Clock, Users, AlertCircle } from 'lucide-react';

export default function RouteSelection() {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routes = [
    {
      id: 1,
      name: "Main Route (Route A)",
      description: "Standard route via main entrance",
      duration: "15 min",
      congestion: "high",
      mapLink: "https://maps.app.goo.gl/hNHvt1v6MpZywcF4A",
      status: "congested",
      distance: "1.2 km",
    },
    {
      id: 2,
      name: "Eastern Bypass (Route B)",
      description: "Alternative route via eastern entrance",
      duration: "22 min",
      congestion: "low",
      mapLink: "https://www.google.com/maps/dir//Kachi+Dham/@29.9988,78.1882,15z/data=!4m9!4m8!1m0!1m5!1m1!1s0x0:0x123456789abcdef!2m2!1d78.1882!2d29.9988!3e0",
      status: "clear",
      distance: "1.8 km",
    },
    
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "clear": return "bg-green-100 text-green-800";
      case "moderate": return "bg-yellow-100 text-yellow-800";
      case "congested": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "clear":
        return <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>;
      case "moderate":
        return <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>;
      case "congested":
        return <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>;
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Select Best Route</h1>
          <p className="mt-2 text-lg text-gray-600">
            Choose the optimal route for your temple visit based on current traffic conditions
          </p>
        </div>

        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Traffic Alert:</strong> Main Route (Route A) is experiencing heavy congestion. Consider alternative routes.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-6 w-screen">
          {/* map visulization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">Route Map</h2>
                <p className="text-sm text-gray-500">Live traffic visualization with route options</p>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative">
                <img
                  src="/api/placeholder/800/450"
                  alt="Map visualization"
                  className="object-cover"
                />

                {/* Traffic Indicators */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-red-500 animate-ping"></div>
                <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-red-600"></div>

                <div className="absolute top-1/3 left-1/2 w-4 h-4 rounded-full bg-red-500 animate-ping"></div>
                <div className="absolute top-1/3 left-1/2 w-3 h-3 rounded-full bg-red-600"></div>

                <div className="absolute top-2/3 left-1/3 w-4 h-4 rounded-full bg-yellow-500"></div>
                <div className="absolute bottom-1/4 right-1/3 w-4 h-4 rounded-full bg-green-500"></div>

                {/* Route Lines */}
                {routes.map((route) => (
                  <div key={route.id} className={`absolute top-0 left-0 w-full h-full pointer-events-none ${selectedRoute === route.id ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                    <svg className="w-full h-full" viewBox="0 0 800 450">
                      {route.id === 1 && (
                        <path d="M100,100 C150,150 200,150 250,200 S350,250 400,300 S500,350 600,350"
                          stroke="red" strokeWidth="5" fill="none" strokeDasharray="10,5" />
                      )}
                      {route.id === 2 && (
                        <path d="M100,100 C150,50 200,50 300,100 S400,150 500,200 S600,250 700,300"
                          stroke="green" strokeWidth="5" fill="none" />
                      )}
                      {route.id === 3 && (
                        <path d="M100,100 C100,200 150,250 200,300 S300,350 400,350 S500,350 600,350"
                          stroke="orange" strokeWidth="5" fill="none" />
                      )}
                    </svg>
                  </div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-2 rounded-md shadow">
                  <div className="flex items-center text-xs mb-1">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>Heavy Traffic</span>
                  </div>
                  <div className="flex items-center text-xs mb-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Moderate Traffic</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Clear Traffic</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Traffic Statistics */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium text-gray-900">Current Traffic</h3>
                <div className="mt-2 flex items-center">
                  <Users className="text-indigo-600 mr-2" />
                  <span className="text-2xl font-bold">458</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">People in temple area</p>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium text-gray-900">Average Wait</h3>
                <div className="mt-2 flex items-center">
                  <Clock className="text-indigo-600 mr-2" />
                  <span className="text-2xl font-bold">25 min</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">At main entrance</p>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium text-gray-900">Best Time</h3>
                <div className="mt-2 flex items-center">
                  <Clock className="text-indigo-600 mr-2" />
                  <span className="text-2xl font-bold">15:00</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Least crowded time today</p>
              </div>
            </div>
          </div>
          </div>

          {/* Available Routes */}
          <div className="mt-6 lg:mt-8 h-screen">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-2xl font-bold text-blue-800">Available Routes</h2>
                <p className="text-sm text-gray-500">Select a route to see details</p>
              </div>

              <div className="divide-y">
                {routes.map(route => (
                  <div key={route.id}>
                    <div
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedRoute === route.id ? 'bg-indigo-50' : ''}`}
                      onClick={() => setSelectedRoute(route.id)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-900">{route.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                          {route.congestion.charAt(0).toUpperCase() + route.congestion.slice(1)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{route.description}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <div className="flex items-center mr-4">
                          <Clock size={14} className="mr-1 text-gray-400" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Map size={14} className="mr-1 text-gray-400" />
                          <span>{route.distance}</span>
                        </div>
                      </div>
                    </div>

                    {selectedRoute === route.id && (
                      <div className="bg-white p-4 border-t">
                        <h3 className="font-medium text-gray-900">Route Details</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center">
                            {getStatusIcon(route.status)}
                            <span className="text-sm">
                              Current Status: {route.congestion.charAt(0).toUpperCase() + route.congestion.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-start">
                            <div className="mt-1">
                              <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                              <div className="h-6 w-px bg-indigo-600 mx-auto"></div>
                              <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                              <div className="h-6 w-px bg-indigo-600 mx-auto"></div>
                              <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                            </div>
                            <div className="ml-2 space-y-4 text-sm">
                              <div>
                                <p className="font-medium">Starting Point</p>
                                <p className="text-gray-500">Bhowali</p>
                              </div>
                              <div>
                                <p className="font-medium">Via</p>
                                <p className="text-gray-500">{route.name} Entrance</p>
                              </div>
                              <div>
                                <p className="font-medium">Temple Gate</p>
                                <p className="text-gray-500">Darshan Queue</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <a 
                            href={route.mapLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            <Navigation size={16} className="mr-2" />
                            Navigate to This Route
                            <ArrowUpRight size={16} className="ml-2" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}