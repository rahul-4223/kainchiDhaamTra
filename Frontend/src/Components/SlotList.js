import React, { useEffect, useState } from 'react';
import socket from '../socket'; // Import the socket instance

const SlotList = ({ templeId, date }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch initial slots
    fetch(`/api/slots/${templeId}/${date}`)
      .then((response) => response.json())
      .then((data) => setSlots(data));

    // Listen for slot updates
    socket.on('slotUpdated', (data) => {
      console.log('Slot updated:', data); // Debugging log
      setSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot._id === data.slotId
            ? { ...slot, availableSpots: data.availableSpots, bookings: data.bookings }
            : slot
        )
      );
    });

    return () => {
      socket.off('slotUpdated');
    };
  }, [templeId, date]);

  const handleBooking = async (slotId) => {
    setLoading(true);
    try {
      console.log('Booking slot:', slotId); // Debugging log
      const response = await fetch(`/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId, visitorCount: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Booking failed');
        return;
      }

      // Fetch updated slots
      const updatedSlots = await fetch(`/api/slots/${templeId}/${date}`).then((res) =>
        res.json()
      );
      console.log('Updated slots:', updatedSlots); // Debugging log
      setSlots(updatedSlots);
    } catch (error) {
      console.error('Error during booking:', error);
      alert('An error occurred while booking the slot.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {slots.map((slot) => (
        <div key={slot._id}>
          <h3>
            {slot.startTime} - {slot.endTime}
          </h3>
          <p>Available spots: {slot.availableSpots}</p>
          <button
            onClick={() => handleBooking(slot._id)}
            disabled={slot.availableSpots === 0 || loading}
          >
            Book Slot
          </button>
        </div>
      ))}
    </div>
  );
};

export default SlotList;