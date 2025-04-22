const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
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
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  visitorCount: {
    type: Number,
    required: true,
    min: 1
  },
  contactName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

// Generate unique booking ID
bookingSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }
  
  const prefix = 'DVDR-';
  const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
  this.bookingId = prefix + randomPart;
  
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);