const Workout = require('../models/workout');
const { validationResult } = require('express-validator');

// @desc    Get all workouts
// @route   GET /api/v1/workouts
// @access  Public
exports.getWorkouts = async (req, res) => {
    try {
        const { level, focus } = req.query;
        let query = {};
        if (level) query.level = level;
        if (focus) query.focus = focus;

        const workouts = await Workout.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: workouts.length, data: workouts });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single workout
// @route   GET /api/v1/workouts/:id
// @access  Public
exports.getWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) return res.status(404).json({ success: false, error: 'Workout not found' });
        res.status(200).json({ success: true, data: workout });
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json({ success: false, error: 'Workout not found' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create workout
// @route   POST /api/v1/workouts
// @access  Private (Admin)
exports.createWorkout = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
        const workout = await Workout.create(req.body);
        res.status(201).json({ success: true, data: workout });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ success: false, error: 'Workout already exists' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update workout
// @route   PUT /api/v1/workouts/:id
// @access  Private (Admin)
exports.updateWorkout = async (req, res) => {
    try {
        let workout = await Workout.findById(req.params.id);
        if (!workout) return res.status(404).json({ success: false, error: 'Workout not found' });

        workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: workout });
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json({ success: false, error: 'Workout not found' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete workout
// @route   DELETE /api/v1/workouts/:id
// @access  Private (Admin)
exports.deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) return res.status(404).json({ success: false, error: 'Workout not found' });

        await Workout.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json({ success: false, error: 'Workout not found' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};