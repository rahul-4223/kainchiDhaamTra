const Slot = require('../models/Slot');
const Temple = require('../models/Temple');
const moment = require('moment');

// Helper function to get slot status based on available spots vs capacity
const getSlotStatus = (bookedCount, totalCapacity) => {
  const percentBooked = (bookedCount / totalCapacity) * 100;
  
  if (bookedCount >= totalCapacity) {
    return 'full';
  } else if (percentBooked >= 75) {
    return 'almost-full';
  } else if (percentBooked >= 25) {
    return 'filling';
  } else {
    return 'available';
  }
};

// Get all slots for a temple on a specific date
exports.getSlotsByDate = async (req, res) => {
  try {
    const { templeId, date } = req.params;
    
    // Validate templeId
    if (!templeId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid temple ID format' });
    }
    
    // Convert date string to Date object
    const targetDate = new Date(date);
    
    // Check if date is valid
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
    }
    
    // Set start and end of day for query
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
    
    // Find slots for the temple on the specified date
    const slots = await Slot.find({
      temple: templeId,
      date: { $gte: startOfDay, $lte: endOfDay },
      isActive: true
    }).sort({ startTime: 1 });
    
    // Format slots for frontend
    const formattedSlots = slots.map(slot => ({
      _id: slot._id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: slot.status,
      availableSpots: slot.totalCapacity - slot.bookedCount,
      totalCapacity: slot.totalCapacity
    }));
    
    return res.json(formattedSlots);
  } catch (error) {
    console.error('Error fetching slots:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new slot
exports.createSlot = async (req, res) => {
  try {
    const { templeId, date, startTime, endTime, totalCapacity } = req.body;
    
    // Validate required fields
    if (!templeId || !date || !startTime || !endTime) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Check if temple exists
    const temple = await Temple.findById(templeId);
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    
    // Create new slot
    const slot = new Slot({
      temple: templeId,
      date: new Date(date),
      startTime,
      endTime,
      totalCapacity: totalCapacity || temple.defaultSlotCapacity,
      bookedCount: 0,
      status: 'available'
    });
    
    await slot.save();
    
    return res.status(201).json(slot);
  } catch (error) {
    console.error('Error creating slot:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update slot details
exports.updateSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const { startTime, endTime, totalCapacity, isActive } = req.body;
    
    // Find slot by ID
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    
    // Update fields if provided
    if (startTime) slot.startTime = startTime;
    if (endTime) slot.endTime = endTime;
    if (totalCapacity !== undefined) slot.totalCapacity = totalCapacity;
    if (isActive !== undefined) slot.isActive = isActive;
    
    // Recalculate status based on current booking count
    const status = getSlotStatus(slot.bookedCount, slot.totalCapacity);
    slot.status = status;
    
    await slot.save();
    
    return res.json(slot);
  } catch (error) {
    console.error('Error updating slot:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a slot
exports.deleteSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    
    // Check if there are any bookings for this slot
    if (slot.bookedCount > 0) {
      // Instead of deleting, mark as inactive
      slot.isActive = false;
      await slot.save();
      return res.json({ message: 'Slot has existing bookings and has been deactivated' });
    }
    
    // If no bookings, delete the slot
    await Slot.findByIdAndDelete(slotId);
    return res.json({ message: 'Slot deleted successfully' });
  } catch (error) {
    console.error('Error deleting slot:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Generate slots for a temple based on date range and temple settings
exports.generateSlots = async (req, res) => {
  try {
    const { templeId, startDate, endDate, slotDuration, slotCapacity } = req.body;
    
    // Validate required fields
    if (!templeId || !startDate || !endDate) {
      return res.status(400).json({ message: 'Please provide templeId, startDate, and endDate' });
    }
    
    // Check if temple exists
    const temple = await Temple.findById(templeId);
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    
    // Duration in minutes
    const duration = slotDuration || temple.defaultSlotDuration;
    const capacity = slotCapacity || temple.defaultSlotCapacity;
    
    // Parse temple opening and closing times
    const openTime = moment(temple.defaultOpenTime, 'hh:mm A');
    const closeTime = moment(temple.defaultCloseTime, 'hh:mm A');
    
    // Initialize currentDate as the startDate
    let currentDate = moment(startDate);
    const end = moment(endDate);
    
    const createdSlots = [];
    
    // Loop through each date
    while (currentDate.isSameOrBefore(end, 'day')) {
      // Start time is the opening time
      let currentTime = openTime.clone();
      
      // Create slots until closing time
      while (currentTime.add(duration, 'minutes').isSameOrBefore(closeTime)) {
        const slotStartTime = currentTime.clone().subtract(duration, 'minutes').format('hh:mm A');
        const slotEndTime = currentTime.format('hh:mm A');
        
        // Create the slot
        const slot = new Slot({
          temple: templeId,
          date: currentDate.toDate(),
          startTime: slotStartTime,
          endTime: slotEndTime,
          totalCapacity: capacity,
          bookedCount: 0,
          status: 'available'
        });
        
        await slot.save();
        createdSlots.push(slot);
      }
      
      // Move to next day
      currentDate.add(1, 'day');
    }
    
    return res.status(201).json({
      message: Created ${createdSlots.length} slots successfully,
      slots: createdSlots
    });
  } catch (error) {
    console.error('Error generating slots:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};