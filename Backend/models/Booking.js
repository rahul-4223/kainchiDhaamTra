const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },
  temple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Temple',
    required: true
  },
  visitDate: {
    type: Date,
    required: true
  },
  visitorCount: {
    type: Number,
    required: true,
    min: 1
  },
  contactName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  bookingId: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  },
  checkInTime: {
    type: Date
  },
  notes: {
    type: String
  }
}, { timestamps: true });

// Generate a unique booking ID before saving
BookingSchema.pre('save', async function(next) {
  if (!this.bookingId) {
    // Generate a random alphanumeric booking ID
    const prefix = 'TBK';
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    
    this.bookingId = ${prefix}-${randomPart}-${timestamp};
  }
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);