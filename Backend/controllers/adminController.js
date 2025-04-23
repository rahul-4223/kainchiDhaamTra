const Temple = require('../models/Temple');
const Slot = require('../models/Slot');
const Booking = require('../models/Booking');

// Create Temple
exports.createTemple = async (req, res) => {
  try {
    const { name, location, description } = req.body;
    const newTemple = new Temple({ name, location, description });
    await newTemple.save();
    res.status(201).json({ message: 'Temple created successfully', temple: newTemple });
  } catch (err) {
    res.status(500).json({ message: 'Error creating temple' });
  }
};

// Create Slot for a Temple
exports.createSlot = async (req, res) => {
  try {
    const { templeId, date, startTime, endTime, totalCapacity } = req.body;
    const newSlot = new Slot({
      templeId,
      date,
      startTime,
      endTime,
      totalCapacity,
      availableSpots: totalCapacity
    });
    await newSlot.save();
    res.status(201).json({ message: 'Slot created successfully', slot: newSlot });
  } catch (err) {
    res.status(500).json({ message: 'Error creating slot' });
  }
};

// Get all Bookings (with optional filter by temple)
exports.getAllBookings = async (req, res) => {
  try {
    const filter = req.query.templeId ? { templeId: req.query.templeId } : {};
    const bookings = await Booking.find(filter).populate('templeId').populate('slotId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};
