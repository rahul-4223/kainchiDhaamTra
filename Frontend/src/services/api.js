// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Temple API calls
export const getTemples = async () => {
  const response = await axios.get(`${API_URL}/temples`);
  return response.data;
};

export const getTempleById = async (id) => {
  const response = await axios.get(`${API_URL}/temples/${id}`);
  return response.data;
};

// Slot API calls
export const getSlotsByDate = async (templeId, date) => {
  const formattedDate = date.toISOString().split('T')[0];
  const response = await axios.get(`${API_URL}/slots?templeId=${templeId}&date=${formattedDate}`);
  return response.data;
};

export const getSlotById = async (id) => {
  const response = await axios.get(`${API_URL}/slots/${id}`);
  return response.data;
};

// Booking API calls
export const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData);
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await axios.get(`${API_URL}/bookings/${id}`);
  return response.data;
};

export const getBookingByCode = async (bookingId) => {
  const response = await axios.get(`${API_URL}/bookings/code/${bookingId}`);
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await axios.put(`${API_URL}/bookings/${id}/cancel`);
  return response.data;
};