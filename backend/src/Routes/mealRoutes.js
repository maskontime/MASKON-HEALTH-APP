const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getMeals,
    getMeal,
    createMeal,
    updateMeal,
    deleteMeal
} = require('../controllers/mealController');

// Input validation middleware
const { check } = require('express-validator');

const validateMeal = [
    check('name', 'Meal name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('ingredients', 'Ingredients must be an array').isArray(),
    check('preparationSteps', 'Preparation steps must be an array').isArray(),
    check('category', 'Category is required').not().isEmpty(),
    check('region', 'Region is required').not().isEmpty(),
    check('preparationTime', 'Preparation time must be a number').isNumeric(),
    check('servingSize', 'Serving size must be a number').isNumeric()
];

router.route('/')
    .get(getMeals)
    .post(protect, authorize('admin', 'nutritionist'), validateMeal, createMeal);

router.route('/:id')
    .get(getMeal)
    .put(protect, authorize('admin', 'nutritionist'), validateMeal, updateMeal)
    .delete(protect, authorize('admin'), deleteMeal);

module.exports = router;