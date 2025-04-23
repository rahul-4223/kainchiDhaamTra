// src/components/BookingList.js
import React, { useEffect, useState } from 'react';

const BookingList = ({ slotId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`/api/slots/bookings/${slotId}`)
      .then(response => response.json())
      .then(data => setBookings(data));
  }, [slotId]);

  return (
    <div>
      <h2>Bookings</h2>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            <p>Booking ID: {booking._id}</p>
            <p>Name: {booking.contactName}</p>
            <p>Phone: {booking.phoneNumber}</p>
            <p>Email: {booking.email}</p>
            <p>Visitors: {booking.visitorCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
