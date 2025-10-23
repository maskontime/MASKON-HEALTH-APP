const express = require('express');
const router = express.Router();

// Middleware
const { protect, authorize } = require('../middleware/auth');

// Routes
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Personnel routes are working' });
});

module.exports = router;