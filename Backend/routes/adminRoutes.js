const express = require('express');
const router = express.Router();
const { createTemple, createSlot, getAllBookings } = require('../controllers/adminController');
const auth = require('../middleware/auth'); // Protect routes (can be extended)

router.post('/temples', auth, createTemple);
router.post('/slots', auth, createSlot);
router.get('/bookings', auth, getAllBookings);

module.exports = router;
