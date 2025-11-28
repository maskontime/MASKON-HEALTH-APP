const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const personnelController = require('../controllers/personnelController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(protect, authorize('admin'), personnelController.getPersonnel)
    .post(
        protect,
        authorize('admin'),
        [
            body('name').notEmpty().withMessage('Name is required'),
            body('email').isEmail().withMessage('Valid email required'),
            body('role').notEmpty().withMessage('Role is required')
        ],
        personnelController.registerPersonnel
    );

router.route('/:id')
    .get(protect, authorize('admin'), personnelController.getPersonnelById)
    .put(protect, authorize('admin'), personnelController.updatePersonnel)
    .delete(protect, authorize('admin'), personnelController.deletePersonnel);

module.exports = router;