const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../Middleware/auth');
const {
    getAllHoney,
    getHoney,
    createHoney,
    updateHoney,
    deleteHoney,
    addHoneyReview
} = require('../Controllers/honeyController');

// Input validation middleware
const { check } = require('express-validator');

const validateHoney = [
    check('name', 'Name is required').not().isEmpty(),
    check('type', 'Type is required').isIn(['raw', 'processed', 'comb', 'creamed']),
    check('flowerSource', 'Flower source must be an array').isArray(),
    check('description', 'Description is required').not().isEmpty(),
    check('region', 'Region is required').not().isEmpty(),
    check('benefits', 'Benefits must be an array').isArray(),
    check('quality.purity', 'Purity percentage is required').isFloat({ min: 0, max: 100 }),
    check('quality.moisture', 'Moisture content is required').isFloat({ min: 0 }),
    check('packaging', 'Packaging information must be an array').isArray(),
    check('packaging.*.size.value', 'Package size value is required').isNumeric(),
    check('packaging.*.size.unit', 'Package size unit is required').not().isEmpty(),
    check('packaging.*.price', 'Package price is required').isNumeric()
];

const validateReview = [
    check('rating', 'Rating must be between 1 and 5').isFloat({ min: 1, max: 5 }),
    check('comment', 'Comment is required').not().isEmpty()
];

// Main routes
router.route('/')
    .get(getAllHoney)
    .post(protect, authorize('admin', 'traditional-healer'), validateHoney, createHoney);

router.route('/:id')
    .get(getHoney)
    .put(protect, authorize('admin', 'traditional-healer'), validateHoney, updateHoney)
    .delete(protect, authorize('admin'), deleteHoney);

// Review routes
router.route('/:id/reviews')
    .post(protect, validateReview, addHoneyReview);

module.exports = router;