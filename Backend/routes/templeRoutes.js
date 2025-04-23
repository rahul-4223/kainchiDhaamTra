const express = require('express');
const router = express.Router();
const templeController = require('../controllers/templeController');
const { protect } = require('../middleware/auth');

// Get all temples
router.get('/', templeController.getAllTemples);

// Get temple by ID
router.get('/:templeId', templeController.getTempleById);

// Create a new temple (protected)
router.post('/', protect, templeController.createTemple);

// Update temple details (protected)
router.put('/:templeId', protect, templeController.updateTemple);

// Delete a temple (protected)
router.delete('/:templeId', protect, templeController.deleteTemple);

// Get temple availability for a date range
router.get('/:templeId/availability', templeController.getTempleAvailability);

module.exports = router;