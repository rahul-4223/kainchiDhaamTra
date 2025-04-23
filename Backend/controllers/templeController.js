const Temple = require('../models/Temple');
const Slot = require('../models/Slot');

// Get all temples
exports.getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find({ isActive: true });
    return res.json(temples);
  } catch (error) {
    console.error('Error fetching temples:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get temple by ID
exports.getTempleById = async (req, res) => {
  try {
    const { templeId } = req.params;
    
    const temple = await Temple.findById(templeId);
    
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    
    return res.json(temple);
  } catch (error) {
    console.error('Error fetching temple:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new temple
exports.createTemple = async (req, res) => {
  try {
    const { 
      name, 
      location, 
      description, 
      images, 
      defaultOpenTime, 
      defaultCloseTime, 
      defaultSlotDuration, 
      defaultSlotCapacity,
      specialInstructions,
      contactInfo
    } = req.body;
    
    // Validate required fields
    if (!name || !location || !location.address || !location.city || !location.state) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Create new temple
    const temple = new Temple({
      name,
      location,
      description,
      images,
      defaultOpenTime: defaultOpenTime || '06:00 AM',
      defaultCloseTime: defaultCloseTime || '09:00 PM',
      defaultSlotDuration: defaultSlotDuration || 60,
      defaultSlotCapacity: defaultSlotCapacity || 20,
      specialInstructions,
      contactInfo
    });
    
    await temple.save();
    
    return res.status(201).json(temple);
  } catch (error) {
    console.error('Error creating temple:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update temple details
exports.updateTemple = async (req, res) => {
  try {
    const { templeId } = req.params;
    const updateData = req.body;
    
    // Find and update
    const temple = await Temple.findByIdAndUpdate(
      templeId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    
    return res.json(temple);
  } catch (error) {
    console.error('Error updating temple:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a temple
exports.deleteTemple = async (req, res) => {
  try {
    const { templeId } = req.params;
    
    // Check if there are any slots for this temple
    const slotsExist = await Slot.exists({ temple: templeId });
    
    if (slotsExist) {
      // Soft delete by setting isActive to false
      await Temple.findByIdAndUpdate(templeId, { isActive: false });
      return res.json({ message: 'Temple has existing slots and has been deactivated' });
    }
    
    // Hard delete if no slots exist
    await Temple.findByIdAndDelete(templeId);
    return res.json({ message: 'Temple deleted successfully' });
  } catch (error) {
    console.error('Error deleting temple:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get temple availability overview
exports.getTempleAvailability = async (req, res) => {
  try {
    const { templeId } = req.params;
    const { startDate, endDate } = req.query;
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
    }
    
    // Set start and end of day
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    
    // Find slots for the temple in the date range
    const slots = await Slot.find({
      temple: templeId,
      date: { $gte: start, $lte: end },
      isActive: true
    }).sort({ date: 1, startTime: 1 });
    
    // Group availability by date
    const availabilityByDate = {};
    
    slots.forEach(slot => {
      const dateStr = slot.date.toISOString().split('T')[0];
      
      if (!availabilityByDate[dateStr]) {
        availabilityByDate[dateStr] = {
          date: dateStr,
          totalSlots: 0,
          availableSlots: 0,
          slots: []
        };
      }
      
      availabilityByDate[dateStr].totalSlots++;
      
      if (slot.status !== 'full') {
        availabilityByDate[dateStr].availableSlots++;
      }
      
      availabilityByDate[dateStr].slots.push({
        _id: slot._id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        availableSpots: slot.totalCapacity - slot.bookedCount,
        totalCapacity: slot.totalCapacity,
        status: slot.status
      });
    });
    
    return res.json(Object.values(availabilityByDate));
  } catch (error) {
    console.error('Error fetching temple availability:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};