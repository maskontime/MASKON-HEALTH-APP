const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../Middleware/auth');
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    addWorkoutReview
} = require('../Controllers/workoutController');

// Input validation middleware
const { check } = require('express-validator');

const validateWorkout = [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('type', 'Type must be traditional, modern, or hybrid').isIn(['traditional', 'modern', 'hybrid']),
    check('category', 'Category is required').isIn(['strength', 'cardio', 'flexibility', 'balance', 'meditation']),
    check('difficulty', 'Difficulty level is required').isIn(['beginner', 'intermediate', 'advanced']),
    check('duration.value', 'Duration value is required').isNumeric(),
    check('duration.unit', 'Duration unit must be minutes or hours').isIn(['minutes', 'hours']),
    check('exercises', 'Exercises must be an array').isArray(),
    check('exercises.*.name', 'Exercise name is required').not().isEmpty(),
    check('exercises.*.description', 'Exercise description is required').not().isEmpty(),
    check('benefits', 'Benefits must be an array').isArray()
];

const validateReview = [
    check('rating', 'Rating must be between 1 and 5').isFloat({ min: 1, max: 5 }),
    check('comment', 'Comment is required').not().isEmpty()
];

// Main routes
router.route('/')
    .get(getWorkouts)
    .post(protect, authorize('admin', 'fitness-trainer'), validateWorkout, createWorkout);

router.route('/:id')
    .get(getWorkout)
    .put(protect, authorize('admin', 'fitness-trainer'), validateWorkout, updateWorkout)
    .delete(protect, authorize('admin', 'fitness-trainer'), deleteWorkout);

// Review routes
router.route('/:id/reviews')
    .post(protect, validateReview, addWorkoutReview);

module.exports = router;