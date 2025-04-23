import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get slots by temple ID and date
export const getSlotsByDate = async (templeId, date) => {
  try {
    const response = await api.get(`/slots/temple/${templeId}/date/${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching slots:', error);
    throw error;
  }
};

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Get booking by ID
export const getBookingById = async (bookingId) => {
  try {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

// Get all temples
export const getAllTemples = async () => {
  try {
    const response = await api.get('/temples');
    return response.data;
  } catch (error) {
    console.error('Error fetching temples:', error);
    throw error;
  }
};

// Get temple by ID
export const getTempleById = async (templeId) => {
  try {
    const response = await api.get(`/temples/${templeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching temple:', error);
    throw error;
  }
};

// Get temple availability for date range
export const getTempleAvailability = async (templeId, startDate, endDate) => {
  try {
    const response = await api.get(`
      /temples/${templeId}/availability?startDate=${startDate}&endDate=${endDate}
    `);
    return response.data;
  } catch (error) {
    console.error('Error fetching temple availability:', error);
    throw error;
  }
};

// Get bookings by phone number
export const getBookingsByPhone = async (phoneNumber) => {
  try {
    const response = await api.get(`/bookings/phone/${phoneNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings by phone:', error);
    throw error;
  }
};

// Auth functions can be added here if needed for admin functionality