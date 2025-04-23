// src/components/BookingForm.js
import React, { useState } from 'react';

const BookingForm = ({ slotId }) => {
  const [visitorCount, setVisitorCount] = useState(1);
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slotId, contactName, phoneNumber, email, visitorCount }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Booking confirmed:', data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Contact Name" 
        value={contactName} 
        onChange={e => setContactName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Phone Number" 
        value={phoneNumber} 
        onChange={e => setPhoneNumber(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <input 
        type="number" 
        value={visitorCount} 
        onChange={e => setVisitorCount(e.target.value)} 
        min="1" 
      />
      <button type="submit">Book Slot</button>
    </form>
  );
};

export default BookingForm;
