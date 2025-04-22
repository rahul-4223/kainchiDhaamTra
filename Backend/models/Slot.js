const mongoose = require('mongoose');

const slotSchema = mongoose.Schema({
  temple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Temple',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  totalCapacity: {
    type: Number,
    required: true
  },
  availableSpots: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'filling', 'almost-full', 'full'],
    default: 'available'
  }
}, {
  timestamps: true
});

// Pre-save hook to calculate status
slotSchema.pre('save', function(next) {
  const availabilityPercentage = (this.availableSpots / this.totalCapacity) * 100;
  
  if (this.availableSpots === 0) {
    this.status = 'full';
  } else if (availabilityPercentage <= 10) {
    this.status = 'almost-full';
  } else if (availabilityPercentage <= 30) {
    this.status = 'filling';
  } else {
    this.status = 'available';
  }
  
  next();
});

module.exports = mongoose.model('Slot', slotSchema);
