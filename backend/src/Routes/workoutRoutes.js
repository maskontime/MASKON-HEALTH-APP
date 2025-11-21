const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const workoutController = require('../Controllers/workoutController');
const { protect, authorize } = require('../Middleware/auth');

router.route('/')
    .get(workoutController.getWorkouts)
    .post(
        protect,
        authorize('admin'),
        [body('name').notEmpty().withMessage('Name is required')],
        workoutController.createWorkout
    );

router.route('/:id')
    .get(workoutController.getWorkout)
    .put(protect, authorize('admin'), workoutController.updateWorkout)
    .delete(protect, authorize('admin'), workoutController.deleteWorkout);

module.exports = router;