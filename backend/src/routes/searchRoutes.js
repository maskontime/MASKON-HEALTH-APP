const express = require('express');
const router = express.Router();
const {
    globalSearch,
    advancedSearch
} = require('../controllers/searchController');

// @route   GET /api/v1/search
// @desc    Global search across all resources
// @access  Public
router.get('/', globalSearch);

// @route   POST /api/v1/search/advanced
// @desc    Advanced search with filters
// @access  Public
router.post('/advanced', advancedSearch);

module.exports = router;

