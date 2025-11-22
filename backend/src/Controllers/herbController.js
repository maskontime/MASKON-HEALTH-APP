const Herb = require('../models/Herb');
const { validationResult } = require('express-validator');

// @desc    Get all herbs
// @route   GET /api/v1/herbs
// @access  Public
exports.getHerbs = async (req, res) => {
    try {
        const { category, region, search, availability } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }
        if (region) {
            query.region = region;
        }
        if (availability) {
            query.availability = availability;
        }
        if (search) {
            query.$text = { $search: search };
        }

        const herbs = await Herb.find(query)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: herbs.length,
            data: herbs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get single herb
// @route   GET /api/v1/herbs/:id
// @access  Public
exports.getHerb = async (req, res) => {
    try {
        const herb = await Herb.findById(req.params.id);
        
        if (!herb) {
            return res.status(404).json({
                success: false,
                error: 'Herb not found'
            });
        }

        res.status(200).json({
            success: true,
            data: herb
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Herb not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Create new herb
// @route   POST /api/v1/herbs
// @access  Private (Admin, Traditional Healer)
exports.createHerb = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const herb = await Herb.create(req.body);
        
        res.status(201).json({
            success: true,
            data: herb
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'This herb already exists'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Update herb
// @route   PUT /api/v1/herbs/:id
// @access  Private (Admin, Traditional Healer)
exports.updateHerb = async (req, res) => {
    try {
        let herb = await Herb.findById(req.params.id);

        if (!herb) {
            return res.status(404).json({
                success: false,
                error: 'Herb not found'
            });
        }

        herb = await Herb.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: herb
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Herb not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Delete herb
// @route   DELETE /api/v1/herbs/:id
// @access  Private (Admin)
exports.deleteHerb = async (req, res) => {
    try {
        const herb = await Herb.findById(req.params.id);

        if (!herb) {
            return res.status(404).json({
                success: false,
                error: 'Herb not found'
            });
        }

        await Herb.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Herb not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};