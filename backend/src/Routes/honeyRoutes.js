const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const honeyController = require('../controllers/honeyController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(honeyController.getHoney)
    .post(
        protect,
        authorize('admin'),
        [body('name').notEmpty().withMessage('Name is required')],
        honeyController.createHoney
    );

router.route('/:id')
    .get(honeyController.getHoneyById)
    .put(protect, authorize('admin'), honeyController.updateHoney)
    .delete(protect, authorize('admin'), honeyController.deleteHoney);

module.exports = router;