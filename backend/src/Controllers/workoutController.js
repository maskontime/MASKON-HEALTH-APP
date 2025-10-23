const Workout = require('../models/Workout');
const { validationResult } = require('express-validator');

// @desc    Get all workouts
// @route   GET /api/v1/workouts
// @access  Public
exports.getWorkouts = async (req, res) => {
    try {
        const { type, category, difficulty, search, trainer } = req.query;
        let query = {};

        if (type) {
            query.type = type;
        }
        if (category) {
            query.category = category;
        }
        if (difficulty) {
            query.difficulty = difficulty;
        }
        if (trainer) {
            query.trainer = trainer;
        }
        if (search) {
            query.$text = { $search: search };
        }

        const workouts = await Workout.find(query)
            .populate({
                path: 'trainer',
                select: 'name specialization rating'
            })
            .populate({
                path: 'reviews.user',
                select: 'name'
            })
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: workouts.length,
            data: workouts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get single workout
// @route   GET /api/v1/workouts/:id
// @access  Public
exports.getWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id)
            .populate({
                path: 'trainer',
                select: 'name specialization rating'
            })
            .populate({
                path: 'reviews.user',
                select: 'name'
            });

        if (!workout) {
            return res.status(404).json({
                success: false,
                error: 'Workout not found'
            });
        }

        res.status(200).json({
            success: true,
            data: workout
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Workout not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Create new workout
// @route   POST /api/v1/workouts
// @access  Private (Admin, Fitness Trainer)
exports.createWorkout = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        // Add logged in user as trainer
        req.body.trainer = req.user.id;

        const workout = await Workout.create(req.body);

        res.status(201).json({
            success: true,
            data: workout
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Update workout
// @route   PUT /api/v1/workouts/:id
// @access  Private (Admin, Fitness Trainer)
exports.updateWorkout = async (req, res) => {
    try {
        let workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({
                success: false,
                error: 'Workout not found'
            });
        }

        // Make sure user is workout owner or admin
        if (workout.trainer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to update this workout'
            });
        }

        workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: workout
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Workout not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Delete workout
// @route   DELETE /api/v1/workouts/:id
// @access  Private (Admin, Fitness Trainer)
exports.deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({
                success: false,
                error: 'Workout not found'
            });
        }

        // Make sure user is workout owner or admin
        if (workout.trainer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to delete this workout'
            });
        }

        await workout.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Workout not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Add review to workout
// @route   POST /api/v1/workouts/:id/reviews
// @access  Private
exports.addWorkoutReview = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({
                success: false,
                error: 'Workout not found'
            });
        }

        // Check if user has already reviewed
        const alreadyReviewed = workout.reviews.find(
            review => review.user.toString() === req.user.id
        );

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                error: 'Workout already reviewed'
            });
        }

        const review = {
            user: req.user.id,
            rating: req.body.rating,
            comment: req.body.comment
        };

        workout.reviews.push(review);

        // Calculate average rating
        workout.rating = workout.reviews.reduce((acc, item) => item.rating + acc, 0) / workout.reviews.length;

        await workout.save();

        res.status(201).json({
            success: true,
            data: workout
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};