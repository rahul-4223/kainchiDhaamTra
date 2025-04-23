const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

// Create a new booking
router.post('/', bookingController.createBooking);

// Get booking by ID or booking reference
router.get('/:bookingId', bookingController.getBookingById);

// Get bookings by phone number
router.get('/phone/:phoneNumber', bookingController.getBookingsByPhone);

// Get bookings by temple and date (protected)
router.get('/temple/:templeId/date/:date', protect, bookingController.getBookingsByTempleAndDate);

// Update booking status (protected)
router.put('/:bookingId/status', protect, bookingController.updateBookingStatus);

// Check in visitors (protected)
router.put('/:bookingId/checkin', protect, bookingController.checkInBooking);

module.exports = router;