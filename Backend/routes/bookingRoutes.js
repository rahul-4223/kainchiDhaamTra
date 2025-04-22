// routes/bookingRoutes.js
const express = require('express');
const { 
  createBooking, 
  getBookingById, 
  getBookingByCode,
  cancelBooking,
  getBookingsByPhone
} = require('../controllers/bookingController');
const router = express.Router();

router.route('/').post(createBooking);
router.route('/:id').get(getBookingById);
router.route('/code/:bookingId').get(getBookingByCode);
router.route('/:id/cancel').put(cancelBooking);
router.route('/phone/:phoneNumber').get(getBookingsByPhone);

module.exports = router;