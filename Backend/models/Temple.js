const mongoose = require('mongoose');

const TempleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  description: {
    type: String
  },
  images: [String],
  defaultOpenTime: {
    type: String,
    default: '06:00 AM'
  },
  defaultCloseTime: {
    type: String,
    default: '09:00 PM'
  },
  defaultSlotDuration: {
    type: Number, // in minutes
    default: 60
  },
  defaultSlotCapacity: {
    type: Number,
    default: 20
  },
  isActive: {
    type: Boolean,
    default: true
  },
  specialInstructions: {
    type: String
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Temple', TempleSchema);