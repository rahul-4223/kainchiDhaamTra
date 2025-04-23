const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');
const { protect } = require('../middleware/auth');

// Get slots by temple ID and date
router.get('/temple/:templeId/date/:date', slotController.getSlotsByDate);

// Create a new slot (protected)
router.post('/', protect, slotController.createSlot);

// Update a slot (protected)
router.put('/:slotId', protect, slotController.updateSlot);

// Delete a slot (protected)
router.delete('/:slotId', protect, slotController.deleteSlot);

// Generate slots for a date range (protected)
router.post('/generate', protect, slotController.generateSlots);

module.exports = router;