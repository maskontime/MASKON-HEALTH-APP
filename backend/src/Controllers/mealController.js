const Meal = require('../models/Meal');
const { validationResult } = require('express-validator');

// @desc    Get all meals
// @route   GET /api/v1/meals
// @access  Public
exports.getMeals = async (req, res) => {
    try {
        const { category, region, search } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }
        if (region) {
            query.region = region;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const meals = await Meal.find(query);
        res.status(200).json({
            success: true,
            count: meals.length,
            data: meals
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get single meal
// @route   GET /api/v1/meals/:id
// @access  Public
exports.getMeal = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(404).json({
                success: false,
                error: 'Meal not found'
            });
        }
        res.status(200).json({
            success: true,
            data: meal
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Meal not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Create new meal
// @route   POST /api/v1/meals
// @access  Private (Admin)
exports.createMeal = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const meal = await Meal.create(req.body);
        res.status(201).json({
            success: true,
            data: meal
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Update meal
// @route   PUT /api/v1/meals/:id
// @access  Private (Admin)
exports.updateMeal = async (req, res) => {
    try {
        let meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(404).json({
                success: false,
                error: 'Meal not found'
            });
        }

        meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: meal
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Meal not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Delete meal
// @route   DELETE /api/v1/meals/:id
// @access  Private (Admin)
exports.deleteMeal = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(404).json({
                success: false,
                error: 'Meal not found'
            });
        }

        await meal.remove();
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Meal not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};