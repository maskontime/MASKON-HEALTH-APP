const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const mealController = require('../Controllers/mealController');
const { protect, authorize } = require('../Middleware/auth');

router.route('/')
    .get(mealController.getMeals)
    .post(
        protect,
        authorize('admin'),
        [
            body('name').notEmpty().withMessage('Name is required'),
            body('calories').isNumeric().withMessage('Calories must be a number')
        ],
        mealController.createMeal
    );

router.route('/:id')
    .get(mealController.getMeal)
    .put(protect, authorize('admin'), mealController.updateMeal)
    .delete(protect, authorize('admin'), mealController.deleteMeal);

module.exports = router;