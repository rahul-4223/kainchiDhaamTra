const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const mongoose = require('mongoose');

// Create a new booking
exports.createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { slotId, templeId, visitorCount, contactName, phoneNumber, email } = req.body;
    
    // Validate required fields
    if (!slotId || !templeId || !visitorCount || !contactName || !phoneNumber) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Check if visitor count is valid
    if (visitorCount < 1) {
      return res.status(400).json({ message: 'Visitor count must be at least 1' });
    }
    
    // Find the slot and check availability
    const slot = await Slot.findById(slotId).session(session);
    
    if (!slot) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Slot not found' });
    }
    
    // Check if slot belongs to the specified temple
    if (slot.temple.toString() !== templeId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Slot does not belong to the specified temple' });
    }
    
    // Check if slot has enough capacity
    const availableSpots = slot.totalCapacity - slot.bookedCount;
    
    if (availableSpots < visitorCount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ 
        message: `Not enough capacity. Only ${availableSpots} spots available.` 
      });
    }
    
    // Create the booking
    const booking = new Booking({
      slot: slotId,
      temple: templeId,
      visitDate: slot.date,
      visitorCount,
      contactName,
      phoneNumber,
      email,
      status: 'confirmed'
    });
    
    await booking.save({ session });
    
    // Update slot's booked count
    slot.bookedCount += visitorCount;
    
    // Update slot status based on new booking count
    const percentBooked = (slot.bookedCount / slot.totalCapacity) * 100;
    
    if (slot.bookedCount >= slot.totalCapacity) {
      slot.status = 'full';
    } else if (percentBooked >= 75) {
      slot.status = 'almost-full';
    } else if (percentBooked >= 25) {
      slot.status = 'filling';
    } else {
      slot.status = 'available';
    }
    
    await slot.save({ session });
    
    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    
    return res.status(201).json({
      bookingId: booking.bookingId,
      status: 'confirmed',
      message: 'Booking successfully created',
      booking
    });
  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();
    
    console.error('Error creating booking:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    // Try to find by MongoDB _id first
    let booking;
    
    if (mongoose.Types.ObjectId.isValid(bookingId)) {
      booking = await Booking.findById(bookingId)
        .populate('slot')
        .populate('temple', 'name location');
    }
    
    // If not found by _id, try by bookingId field
    if (!booking) {
      booking = await Booking.findOne({ bookingId })
        .populate('slot')
        .populate('temple', 'name location');
    }
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    return res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all bookings for a user by phone number
exports.getBookingsByPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    
    const bookings = await Booking.find({ phoneNumber })
      .populate('slot')
      .populate('temple', 'name location')
      .sort({ visitDate: 1 });
    
    return res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by phone:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all bookings for a temple on a specific date
exports.getBookingsByTempleAndDate = async (req, res) => {
  try {
    const { templeId, date } = req.params;
    
    // Convert date string to Date object
    const targetDate = new Date(date);
    
    // Check if date is valid
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
    }
    
    // Set start and end of day for query
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
    
    const bookings = await Booking.find({
      temple: templeId,
      visitDate: { $gte: startOfDay, $lte: endOfDay }
    })
      .populate('slot')
      .sort({ 'slot.startTime': 1 });
    
    return res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by temple and date:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update booking status (e.g., cancel booking)
exports.updateBookingStatus = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    
    // Validate status
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    
    // Find booking
    const booking = await Booking.findOne({ 
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(bookingId) ? bookingId : null },
        { bookingId }
      ]
    }).session(session);
    
    if (!booking) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    const previousStatus = booking.status;
    booking.status = status;
    
    // If cancelling a previously confirmed booking, update slot availability
    if (status === 'cancelled' && previousStatus === 'confirmed') {
      const slot = await Slot.findById(booking.slot).session(session);
      
      if (slot) {
        // Reduce booked count
        slot.bookedCount = Math.max(0, slot.bookedCount - booking.visitorCount);
        
        // Update slot status
        const percentBooked = (slot.bookedCount / slot.totalCapacity) * 100;
        
        if (slot.bookedCount >= slot.totalCapacity) {
          slot.status = 'full';
        } else if (percentBooked >= 75) {
          slot.status = 'almost-full';
        } else if (percentBooked >= 25) {
          slot.status = 'filling';
        } else {
          slot.status = 'available';
        }
        
        await slot.save({ session });
      }
    }
    
    await booking.save({ session });
    
    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    
    return res.json({ message: 'Booking status updated successfully', booking });
  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();
    
    console.error('Error updating booking status:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Check in visitors (update checkInTime)
exports.checkInBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    // Find booking
    const booking = await Booking.findOne({ 
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(bookingId) ? bookingId : null },
        { bookingId }
      ]
    });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if already checked in
    if (booking.checkInTime) {
      return res.status(400).json({ 
        message: 'Already checked in', 
        checkInTime: booking.checkInTime 
      });
    }
    
    // Update check-in time
    booking.checkInTime = new Date();
    await booking.save();
    
    return res.json({ 
      message: 'Check-in successful', 
      booking 
    });
  } catch (error) {
    console.error('Error checking in booking:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};