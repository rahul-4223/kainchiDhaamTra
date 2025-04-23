import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Bell, Calendar, Car, Map, AlertTriangle, Users, Settings, LogOut } from 'lucide-react';

// Mock data for demonstration
const initialParkingData = {
  mainParking: { total: 200, occupied: 145 },
  secondaryParking: { total: 150, occupied: 98 },
  overflowParking: { total: 100, occupied: 42 }
};

const initialTrafficData = [
  { time: '06:00', vehicles: 20 },
  { time: '08:00', vehicles: 45 },
  { time: '10:00', vehicles: 120 },
  { time: '12:00', vehicles: 180 },
  { time: '14:00', vehicles: 150 },
  { time: '16:00', vehicles: 190 },
  { time: '18:00', vehicles: 110 },
  { time: '20:00', vehicles: 60 }
];

const roadConditions = [
  { id: 1, road: 'Main Temple Road', status: 'Heavy Traffic', updatedAt: '10:30 AM' },
  { id: 2, road: 'Bhimtal Bypass', status: 'Moderate', updatedAt: '11:15 AM' },
  { id: 3, road: 'Nainital Road', status: 'Clear', updatedAt: '10:45 AM' },
  { id: 4, road: 'Almora Highway', status: 'Minor Congestion', updatedAt: '11:00 AM' }
];

export default function AdminDashboard() {
  const [parkingData, setParkingData] = useState(initialParkingData);
  const [trafficData, setTrafficData] = useState(initialTrafficData);
  const [roadStatus, setRoadStatus] = useState(roadConditions);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notification, setNotification] = useState('');
  const [parkingEditing, setParkingEditing] = useState(null);
  const [editValues, setEditValues] = useState({});
  
  // Function to update parking data
  const updateParkingSpace = (lot, value) => {
    if (value > parkingData[lot].total) return;
    
    setParkingData(prev => ({
      ...prev,
      [lot]: {
        ...prev[lot],
        occupied: parseInt(value)
      }
    }));
    setParkingEditing(null);
  };
  
  // Function to update road status
  const updateRoadStatus = (id, newStatus) => {
    setRoadStatus(prev => 
      prev.map(road => 
        road.id === id 
        ? { ...road, status: newStatus, updatedAt: new Date().toLocaleTimeString() } 
        : road
      )
    );
  };
  
  // Function to send notification
  const sendNotification = () => {
    if (!notification.trim()) return;
    alert(`Notification sent: ${notification}`);
    setNotification('');
  };

  // Function to handle parking edit mode
  const startEditing = (lot) => {
    setParkingEditing(lot);
    setEditValues({...editValues, [lot]: parkingData[lot].occupied});
  };

  // Render dashboard content
  const renderDashboard = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Kainchi Dhaam Traffic Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Main Parking</h2>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">
              {parkingData.mainParking.occupied}/{parkingData.mainParking.total}
            </div>
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-sm">
                  {Math.round((parkingData.mainParking.occupied / parkingData.mainParking.total) * 100)}%
                </div>
              </div>
            </div>
          </div>
          {parkingEditing === 'mainParking' ? (
            <div className="mt-4 flex items-center">
              <input 
                type="number"
                className="border rounded p-1 w-20 mr-2"
                value={editValues.mainParking || 0}
                onChange={(e) => setEditValues({...editValues, mainParking: e.target.value})}
              />
              <button 
                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                onClick={() => updateParkingSpace('mainParking', editValues.mainParking)}
              >
                Save
              </button>
            </div>
          ) : (
            <button 
              className="mt-4 text-blue-500 text-sm"
              onClick={() => startEditing('mainParking')}
            >
              Update
            </button>
          )}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Secondary Parking</h2>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">
              {parkingData.secondaryParking.occupied}/{parkingData.secondaryParking.total}
            </div>
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-sm">
                  {Math.round((parkingData.secondaryParking.occupied / parkingData.secondaryParking.total) * 100)}%
                </div>
              </div>
            </div>
          </div>
          {parkingEditing === 'secondaryParking' ? (
            <div className="mt-4 flex items-center">
              <input 
                type="number"
                className="border rounded p-1 w-20 mr-2"
                value={editValues.secondaryParking || 0}
                onChange={(e) => setEditValues({...editValues, secondaryParking: e.target.value})}
              />
              <button 
                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                onClick={() => updateParkingSpace('secondaryParking', editValues.secondaryParking)}
              >
                Save
              </button>
            </div>
          ) : (
            <button 
              className="mt-4 text-blue-500 text-sm"
              onClick={() => startEditing('secondaryParking')}
            >
              Update
            </button>
          )}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Overflow Parking</h2>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">
              {parkingData.overflowParking.occupied}/{parkingData.overflowParking.total}
            </div>
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-sm">
                  {Math.round((parkingData.overflowParking.occupied / parkingData.overflowParking.total) * 100)}%
                </div>
              </div>
            </div>
          </div>
          {parkingEditing === 'overflowParking' ? (
            <div className="mt-4 flex items-center">
              <input 
                type="number"
                className="border rounded p-1 w-20 mr-2"
                value={editValues.overflowParking || 0}
                onChange={(e) => setEditValues({...editValues, overflowParking: e.target.value})}
              />
              <button 
                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                onClick={() => updateParkingSpace('overflowParking', editValues.overflowParking)}
              >
                Save
              </button>
            </div>
          ) : (
            <button 
              className="mt-4 text-blue-500 text-sm"
              onClick={() => startEditing('overflowParking')}
            >
              Update
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Today's Traffic Flow</h2>
          <LineChart width={500} height={300} data={trafficData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="vehicles" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Road Status Updates</h2>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Road Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Last Updated</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {roadStatus.map((road) => (
                  <tr key={road.id}>
                    <td className="px-4 py-3">{road.road}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        road.status === 'Clear' ? 'bg-green-100 text-green-800' :
                        road.status === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {road.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{road.updatedAt}</td>
                    <td className="px-4 py-3">
                      <select 
                        className="text-xs border rounded p-1"
                        value={road.status}
                        onChange={(e) => updateRoadStatus(road.id, e.target.value)}
                      >
                        <option>Clear</option>
                        <option>Moderate</option>
                        <option>Minor Congestion</option>
                        <option>Heavy Traffic</option>
                        <option>Road Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Render notifications content
  const renderNotifications = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Send Notifications</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Notification Message</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Enter notification message to send to visitors..."
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
          ></textarea>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={sendNotification}
          >
            Send to All Visitors
          </button>
          
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded">
            Schedule for Later
          </button>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
          <div className="border rounded divide-y">
            <div className="p-3">
              <div className="flex justify-between">
                <div className="font-medium">Temple gate 2 closed for maintenance</div>
                <div className="text-sm text-gray-500">Today, 9:15 AM</div>
              </div>
              <div className="mt-1 text-sm text-gray-600">Sent to all visitors</div>
            </div>
            <div className="p-3">
              <div className="flex justify-between">
                <div className="font-medium">Main parking lot full, please use overflow parking</div>
                <div className="text-sm text-gray-500">Today, 8:30 AM</div>
              </div>
              <div className="mt-1 text-sm text-gray-600">Sent to all visitors</div>
            </div>
            <div className="p-3">
              <div className="flex justify-between">
                <div className="font-medium">Special darshan timings for today</div>
                <div className="text-sm text-gray-500">Yesterday, 6:00 PM</div>
              </div>
              <div className="mt-1 text-sm text-gray-600">Sent to all visitors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render time slots content
  const renderTimeSlots = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Time Slots</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Today's Darshan Schedule</h2>
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
            Edit Schedule
          </button>
        </div>
        
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Time Slot</th>
              <th className="text-left py-2">Capacity</th>
              <th className="text-left py-2">Bookings</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3">6:00 AM - 7:00 AM</td>
              <td>150</td>
              <td>98</td>
              <td><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Open</span></td>
              <td>
                <button className="text-red-500 text-sm">Close</button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3">7:00 AM - 8:00 AM</td>
              <td>150</td>
              <td>150</td>
              <td><span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Full</span></td>
              <td>
                <button className="text-gray-500 text-sm">Manage</button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3">8:00 AM - 9:00 AM</td>
              <td>150</td>
              <td>142</td>
              <td><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Almost Full</span></td>
              <td>
                <button className="text-red-500 text-sm">Close</button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3">9:00 AM - 10:00 AM</td>
              <td>150</td>
              <td>87</td>
              <td><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Open</span></td>
              <td>
                <button className="text-red-500 text-sm">Close</button>
              </td>
            </tr>
            <tr>
              <td className="py-3">10:00 AM - 11:00 AM</td>
              <td>150</td>
              <td>45</td>
              <td><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Open</span></td>
              <td>
                <button className="text-red-500 text-sm">Close</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Add Special Time Slot</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input type="date" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <div className="flex space-x-2">
              <input type="time" className="flex-1 p-2 border rounded" placeholder="Start Time" />
              <input type="time" className="flex-1 p-2 border rounded" placeholder="End Time" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Capacity</label>
            <input type="number" className="w-full p-2 border rounded" placeholder="Enter max visitors" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select className="w-full p-2 border rounded">
              <option>Regular Darshan</option>
              <option>Special Darshan</option>
              <option>Festival</option>
              <option>VIP Only</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Time Slot
          </button>
        </div>
      </div>
    </div>
  );

  // Main admin panel structure
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex-shrink-0 hidden md:block">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Kainchi Dhaam</h2>
          <p className="text-sm text-gray-600">Admin Dashboard</p>
        </div>
        <div className="p-4">
          <nav>
            <ul className="space-y-1">
              <li>
                <button
                  className={`flex items-center w-full p-2 rounded ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <span className="mr-3"><Map size={18} /></span>
                  <span>Traffic Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full p-2 rounded ${activeTab === 'time-slots' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('time-slots')}
                >
                  <span className="mr-3"><Calendar size={18} /></span>
                  <span>Time Slots</span>
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full p-2 rounded ${activeTab === 'notifications' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <span className="mr-3"><Bell size={18} /></span>
                  <span>Notifications</span>
                </button>
              </li>
              <li>
                <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded">
                  <span className="mr-3"><Car size={18} /></span>
                  <span>Parking Management</span>
                </button>
              </li>
              <li>
                <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded">
                  <span className="mr-3"><AlertTriangle size={18} /></span>
                  <span>Emergency Alerts</span>
                </button>
              </li>
              <li>
                <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded">
                  <span className="mr-3"><Users size={18} /></span>
                  <span>User Management</span>
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="mt-8 pt-4 border-t">
            <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded">
              <span className="mr-3"><Settings size={18} /></span>
              <span>Settings</span>
            </button>
            <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded">
              <span className="mr-3"><LogOut size={18} /></span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-white p-4 shadow flex justify-between items-center">
          <h2 className="font-bold text-lg">Kainchi Dhaam Admin</h2>
          <button className="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Content Area */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'time-slots' && renderTimeSlots()}
        {activeTab === 'notifications' && renderNotifications()}
      </div>
    </div>
  );
}