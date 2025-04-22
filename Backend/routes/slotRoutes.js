const express = require('express');
const { 
  getSlots, 
  getSlotById, 
  createSlot, 
  generateSlots, 
  updateSlot 
} = require('../controllers/slotController');

const router = express.Router();

// Removed or fixed this line:
router.get('/all', getSlots); 

router.route('/').get(getSlots).post(createSlot);
router.route('/generate').post(generateSlots);
router.route('/:id').get(getSlotById).put(updateSlot);

module.exports = router;
