import { useState } from 'react';

export default function TimeSlotManager() {
  const [slots, setSlots] = useState([
    { id: 1, time: '9:00 - 10:00', capacity: 200, booked: 150 },
  
  ]);

  const [newSlot, setNewSlot] = useState({ time: '', capacity: '' });

  const addSlot = (e) => {
    e.preventDefault();
    setSlots([...slots, { ...newSlot, id: Date.now(), booked: 0 }]);
    setNewSlot({ time: '', capacity: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Time Slots</h1>
      
      <form onSubmit={addSlot} className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Time Slot</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., 9:00 - 10:00"
              value={newSlot.time}
              onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={newSlot.capacity}
              onChange={(e) => setNewSlot({...newSlot, capacity: e.target.value})}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Slot
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((slot) => (
          <div key={slot.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{slot.time}</h3>
            <div className="space-y-2">
              <p>Total Capacity: {slot.capacity}</p>
              <p>Booked: {slot.booked}</p>
              <p>Available: {slot.capacity - slot.booked}</p>
              <div className="mt-2 flex space-x-2">
                <button className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                  Edit
                </button>
                <button className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}