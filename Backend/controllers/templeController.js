const Temple = require('../models/Temple');

// @desc    Get all temples
// @route   GET /api/temples
// @access  Public
const getTemples = async (req, res) => {
  try {
    const temples = await Temple.find({});
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get temple by ID
// @route   GET /api/temples/:id
// @access  Public
const getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    
    if (temple) {
      res.json(temple);
    } else {
      res.status(404).json({ message: 'Temple not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a temple
// @route   POST /api/temples
// @access  Private/Admin
const createTemple = async (req, res) => {
  try {
    const { name, address, description, maxVisitorsPerSlot, image } = req.body;
    
    const temple = await Temple.create({
      name,
      address,
      description,
      maxVisitorsPerSlot,
      image
    });
    
    res.status(201).json(temple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTemples,
  getTempleById,
  createTemple
};
