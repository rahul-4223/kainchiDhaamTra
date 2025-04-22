const express = require('express');
const { getTemples, getTempleById, createTemple } = require('../controllers/templeController');
const router = express.Router();

router.route('/').get(getTemples).post(createTemple);
router.route('/:id').get(getTempleById);

module.exports = router;