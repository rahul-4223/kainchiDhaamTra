const mongoose = require('mongoose');

const templeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  maxVisitorsPerSlot: {
    type: Number,
    default: 50
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Temple', templeSchema);