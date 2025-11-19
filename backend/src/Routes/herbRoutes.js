const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const herbController = require('../controllers/herbController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(herbController.getHerbs)
    .post(
        protect,
        authorize('admin','healer'),
        [
            body('name').notEmpty().withMessage('Name is required'),
            body('category').notEmpty().withMessage('Category is required')
        ],
        herbController.createHerb
    );

router.route('/:id')
    .get(herbController.getHerb)
    .put(protect, authorize('admin','healer'), herbController.updateHerb)
    .delete(protect, authorize('admin'), herbController.deleteHerb);

module.exports = router;