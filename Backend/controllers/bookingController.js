const Booking = require('../models/Booking');
const Slot = require('../models/Slot');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const { slotId, templeId, visitorCount, contactName, phoneNumber, email } = req.body;
    
    // Find the slot
    const slot = await Slot.findById(slotId);
    
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    
    // Check if enough spots are available
    if (slot.availableSpots < visitorCount) {
      return res.status(400).json({ 
        message: 'Not enough spots available for this booking',
        availableSpots: slot.availableSpots 
      });
    }
    
    // Create booking
    const booking = await Booking.create({
      slot: slotId,
      temple: templeId,
      visitorCount,
      contactName,
      phoneNumber,
      email
    });
    
    // Update available spots in slot
    slot.availableSpots -= visitorCount;
    await slot.save();
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Public
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('slot')
      .populate('temple', 'name address');
    
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get booking by booking ID
// @route   GET /api/bookings/code/:bookingId
// @access  Public
const getBookingByCode = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId })
      .populate('slot')
      .populate('temple', 'name address');
    
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Public
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Can only cancel confirmed bookings
    if (booking.status !== 'confirmed') {
      return res.status(400).json({ message: `Cannot cancel a booking with status: ${booking.status}` });
    }
    
    // Update booking status
    booking.status = 'cancelled';
    await booking.save();
    
    // Restore slot availability
    const slot = await Slot.findById(booking.slot);
    if (slot) {
      slot.availableSpots += booking.visitorCount;
      await slot.save();
    }
    
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get bookings by phone number
// @route   GET /api/bookings/phone/:phoneNumber
// @access  Public
const getBookingsByPhone = async (req, res) => {
  try {
    const bookings = await Booking.find({ phoneNumber: req.params.phoneNumber })
      .populate('slot')
      .populate('temple', 'name address');
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  getBookingByCode,
  cancelBooking,
  getBookingsByPhone
};