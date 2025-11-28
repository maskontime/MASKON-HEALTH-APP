const Meal = require('../models/meal');
const { validationResult } = require('express-validator');

// @desc    Get all meals
// @route   GET /api/v1/meals
// @access  Public
exports.getMeals = async (req, res) => {
    try {
        const { search, category, diet } = req.query;
        let query = {};
        if (category) query.category = category;
        if (diet) query.diet = diet;
        if (search) query.$text = { $search: search };

        const meals = await Meal.find(query).sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: meals.length, data: meals });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single meal
// @route   GET /api/v1/meals/:id
// @access  Public
exports.getMeal = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) return res.status(404).json({ success: false, error: 'Meal not found' });
        res.status(200).json({ success: true, data: meal });
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json({ success: false, error: 'Meal not found' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create new meal
// @route   POST /api/v1/meals
// @access  Private (Admin)
exports.createMeal = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
        const meal = await Meal.create(req.body);
        res.status(201).json({ success: true, data: meal });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ success: false, error: 'Meal already exists' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update meal
// @route   PUT /api/v1/meals/:id
// @access  Private (Admin)
exports.updateMeal = async (req, res) => {
    try {
        let meal = await Meal.findById(req.params.id);
        if (!meal) return res.status(404).json({ success: false, error: 'Meal not found' });

        meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: meal });
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json({ success: false, error: 'Meal not found' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete meal
// @route   DELETE /api/v1/meals/:id
// @access  Private (Admin)
exports.deleteMeal = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) return res.status(404).json({ success: false, error: 'Meal not found' });

        await Meal.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json({ success: false, error: 'Meal not found' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};