const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getHerbs,
    getHerb,
    createHerb,
    updateHerb,
    deleteHerb
} = require('../controllers/herbController');

// Input validation middleware
const { check } = require('express-validator');

const validateHerb = [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('benefits', 'Benefits must be an array').isArray(),
    check('usages', 'Usages must be an array').isArray(),
    check('region', 'Region is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('price.amount', 'Price amount is required').isNumeric(),
    check('price.unit', 'Price unit is required').not().isEmpty()
];

router.route('/')
    .get(getHerbs)
    .post(protect, authorize('admin', 'traditional-healer'), validateHerb, createHerb);

router.route('/:id')
    .get(getHerb)
    .put(protect, authorize('admin', 'traditional-healer'), validateHerb, updateHerb)
    .delete(protect, authorize('admin'), deleteHerb);

module.exports = router;