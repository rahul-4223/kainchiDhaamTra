const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
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
    required: true,
    default: 20
  },
  bookedCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['available', 'filling', 'almost-full', 'full'],
    default: 'available'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Virtual field for available spots
SlotSchema.virtual('availableSpots').get(function() {
  return this.totalCapacity - this.bookedCount;
});

// Pre-save middleware to update status based on booking count
SlotSchema.pre('save', function(next) {
  const percentBooked = (this.bookedCount / this.totalCapacity) * 100;
  
  if (this.bookedCount >= this.totalCapacity) {
    this.status = 'full';
  } else if (percentBooked >= 75) {
    this.status = 'almost-full';
  } else if (percentBooked >= 25) {
    this.status = 'filling';
  } else {
    this.status = 'available';
  }
  
  next();
});

// Ensure virtuals are included in JSON
SlotSchema.set('toJSON', { virtuals: true });
SlotSchema.set('toObject', { virtuals: true });

// Compound index for finding slots by temple and date
SlotSchema.index({ temple: 1, date: 1 });

module.exports = mongoose.model('Slot', SlotSchema);