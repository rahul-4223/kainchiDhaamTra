// import React, { useState, useEffect } from 'react';
// import { BarChart, MapPin, AlertTriangle, RefreshCw } from 'lucide-react';

// function TrafficStatus() {
//   const [trafficData, setTrafficData] = useState([
//     { id: 1, name: "Main Highway Route", traffic: 0, distance: "12 km", time: "25 min" },
//     { id: 2, name: "Forest Scenic Route", traffic: 0, distance: "15 km", time: "30 min" },
//     { id: 3, name: "Village Backroad", traffic: 0, distance: "18 km", time: "35 min" }
//   ]);
  
//   const [selectedRoute, setSelectedRoute] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [error, setError] = useState(null);
  
//   // Function to fetch real-time traffic data
//   const fetchTrafficData = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       // Replace this with your actual API endpoint
//       // const response = await fetch('https://api.example.com/traffic/kainchidham');
//       // const data = await response.json();
      
//       // For demo purposes, we're simulating an API response
//       // In production, replace this with actual API call above
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Simulate API response data
//       const data = [
//         { 
//           id: 1, 
//           name: "Main Highway Route", 
//           traffic: Math.floor(Math.random() * 50) + 50, // Busier route
//           distance: "12 km", 
//           time: `${20 + Math.floor(Math.random() * 10)} min` 
//         },
//         { 
//           id: 2, 
//           name: "Forest Scenic Route", 
//           traffic: Math.floor(Math.random() * 40) + 30, 
//           distance: "15 km", 
//           time: `${25 + Math.floor(Math.random() * 10)} min` 
//         },
//         { 
//           id: 3, 
//           name: "Village Backroad", 
//           traffic: Math.floor(Math.random() * 30) + 10, // Less busy
//           distance: "18 km", 
//           time: `${30 + Math.floor(Math.random() * 10)} min` 
//         }
//       ];
      
//       setTrafficData(data);
//       setLastUpdated(new Date());
//     } catch (err) {
//       console.error("Error fetching traffic data:", err);
//       setError("Failed to update traffic data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Initial data fetch
//   useEffect(() => {
//     fetchTrafficData();
    
//     // Set up polling interval for real-time updates (every 30 seconds)
//     const intervalId = setInterval(fetchTrafficData, 30000);
    
//     // Clean up on component unmount
//     return () => clearInterval(intervalId);
//   }, []);
  
//   // Get recommended route (lowest traffic)
//   const getRecommendedRoute = () => {
//     return trafficData.reduce((prev, current) => 
//       (prev.traffic < current.traffic) ? prev : current
//     );
//   };
  
//   // Calculate traffic status
//   const getTrafficStatus = (traffic) => {
//     if (traffic < 40) return { status: "Low", color: "text-green-500" };
//     if (traffic < 70) return { status: "Moderate", color: "text-yellow-500" };
//     return { status: "High", color: "text-red-500" };
//   };
  
//   // Current selected route
//   const currentRoute = trafficData.find(route => route.id === selectedRoute) || trafficData[0];
//   const recommendedRoute = getRecommendedRoute();
//   const showAlert = currentRoute.traffic > 70;
  
//   // Format the last updated time
//   const formattedLastUpdated = lastUpdated ? 
//     `${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 
//     'Never';
  
//   return (
//     <div className="max-w-lg mx-auto p-6 bg-slate-50 rounded-lg shadow-lg">
//       <div className="mb-6 text-center">
//         <h1 className="text-2xl font-bold text-slate-800 mb-1">Kainchidham Ashram</h1>
//         <p className="text-slate-600 flex items-center justify-center">
//           <MapPin size={16} className="mr-1" /> 
//           Traffic Status Monitor
//         </p>
//       </div>
      
//       <div className="flex justify-between items-center mb-6">
//         <div className="text-sm text-slate-600">
//           Last updated: {formattedLastUpdated}
//         </div>
//         <button 
//           onClick={fetchTrafficData} 
//           disabled={loading}
//           className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
//         >
//           <RefreshCw size={14} className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
//           {loading ? 'Updating...' : 'Refresh'}
//         </button>
//       </div>
      
//       {error && (
//         <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//           {error}
//         </div>
//       )}
      
//       {showAlert && currentRoute.id !== recommendedRoute.id && (
//         <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
//           <AlertTriangle size={20} className="text-amber-500 mr-2 mt-1 flex-shrink-0" />
//           <div>
//             <p className="font-medium text-amber-800">High Traffic Alert!</p>
//             <p className="text-amber-700 text-sm">
//               Your selected route is congested. We recommend taking the {recommendedRoute.name} instead.
//             </p>
//           </div>
//         </div>
//       )}
      
//       <div className="mb-6">
//         <h2 className="text-lg font-medium text-slate-700 mb-3">Select Your Route</h2>
//         <div className="space-y-3">
//           {trafficData.map(route => {
//             const trafficStatus = getTrafficStatus(route.traffic);
            
//             return (
//               <div 
//                 key={route.id}
//                 className={`p-4 rounded-lg cursor-pointer transition-all ${
//                   selectedRoute === route.id ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-slate-200 hover:border-blue-200'
//                 }`}
//                 onClick={() => setSelectedRoute(route.id)}
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="font-medium text-slate-800">{route.name}</h3>
//                     <div className="flex items-center mt-1 text-sm">
//                       <span className="text-slate-600 mr-4">{route.distance}</span>
//                       <span className="text-slate-600">{route.time}</span>
//                     </div>
//                   </div>
                  
//                   <div className="text-right">
//                     <div className={`font-medium ${trafficStatus.color}`}>
//                       {trafficStatus.status}
//                     </div>
//                     <div className="flex items-center mt-1">
//                       <BarChart size={14} className={trafficStatus.color} />
//                       <div className="ml-1 text-sm text-slate-600">{route.traffic}%</div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Traffic indicator bar */}
//                 <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
//                   <div 
//                     className={`h-full rounded-full ${
//                       route.traffic < 40 ? 'bg-green-500' : 
//                       route.traffic < 70 ? 'bg-yellow-500' : 'bg-red-500'
//                     }`}
//                     style={{ width: `${route.traffic}%` }}
//                   ></div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
      
//       <div className="bg-slate-100 p-4 rounded-lg">
//         <h2 className="text-lg font-medium text-slate-700 mb-2">Route Recommendation</h2>
//         <p className="text-slate-600">
//           You've selected the <span className="font-medium text-slate-800">{currentRoute.name}</span> to reach Kainchidham Ashram.
//         </p>
        
//         {currentRoute.id !== recommendedRoute.id && (
//           <p className="mt-2 text-sm text-slate-600">
//             <span className="font-medium text-blue-600">Travel tip:</span> The {recommendedRoute.name} currently has the lowest traffic ({recommendedRoute.traffic}%).
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TrafficStatus;


import React, { useState, useEffect } from 'react';
import { Map, Navigation } from 'lucide-react';

function Nearby() {
  const [slotsFull, setSlotsFull] = useState(true);
  const [showMap, setShowMap] = useState(false);
  
  // Simulated data for nearby temples
  const nearbyTemples = [
    { id: 1, name: "Hanuman Garhi Temple", distance: "3.5 km-from-Bhowali" },
    { id: 2, name: "Golu Devta Temple", distance: "5.2 km-from-Bhowali" },
    { id: 3, name: "Naina Devi Temple", distance: "12.4 km-from-Kaichidham"}
  ];

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Kainchidham Temple Status</h1>
        <div className={`px-4 py-2 rounded-full text-white ${slotsFull ? 'bg-red-500' : 'bg-green-500'}`}>
          {slotsFull ? 'All Slots Full' : 'Slots Available'}
        </div>
      </div>
      
      {slotsFull && (
        <div className="mt-6">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
            <div className="flex items-center">
              <span className="text-amber-700">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="text-amber-700 font-medium">
                All slots at Kainchidham Temple are currently full. Here are some recommended nearby temples to visit:
              </p>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Recommended Nearby Temples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {nearbyTemples.map(temple => (
              <div key={temple.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-lg">{temple.name}</h3>
                <div className="flex items-center text-gray-600 mt-2">
                  <Navigation size={16} className="mr-1" />
                  <span>{temple.distance}</span>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {temple.slotsAvailable} slots available
                  </span>
                </div>
                 <button 
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors mt-4"
              onClick={toggleMap}
            >
              <Map size={18} className="mr-2" />
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            {/* <button 
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              onClick={toggleMap}
            >
              <Map size={18} className="mr-2" />
              {showMap ? 'Hide Map' : 'Show Map'}
            </button> */}
            
            {showMap && (
              <div className="mt-4 border rounded-lg overflow-hidden">
                <div className="bg-gray-100 h-64 flex items-center justify-center">
                  {/* Map placeholder - in a real implementation, you would integrate with a mapping API */}
                  <div className="text-center">
                    <div className="w-full bg-gray-200 flex flex-col items-center justify-center">
                      <img src="/api/placeholder/800/400" alt="Map of nearby temples" className="w-full h-64 object-cover" />
                      <div className="absolute text-gray-800 bg-white bg-opacity-75 px-2 py-1 rounded">
                        Map of Kainchidham Temple and nearby alternatives in Nainital, Uttarakhand
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-8 text-sm text-gray-500">
        <p>Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}

export default Nearby;