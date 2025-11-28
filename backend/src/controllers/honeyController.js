const Honey = require('../models/honey');
const { validationResult } = require('express-validator');

// @desc    Get all honey products
// @route   GET /api/v1/honey
// @access  Public
exports.getHoney = async (req, res) => {
    try {
        const { search, source, availability } = req.query;
        let query = {};

        if (source) query.source = source;
        if (availability) query.availability = availability;
        if (search) query.$text = { $search: search };

        const items = await Honey.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single honey
// @route   GET /api/v1/honey/:id
// @access  Public
exports.getHoneyById = async (req, res) => {
    try {
        const item = await Honey.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, error: 'Honey not found' });

        res.status(200).json({ success: true, data: item });
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json({ success: false, error: 'Honey not found' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create honey
// @route   POST /api/v1/honey
// @access  Private (Admin)
exports.createHoney = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
        const item = await Honey.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ success: false, error: 'Honey already exists' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update honey
// @route   PUT /api/v1/honey/:id
// @access  Private (Admin)
exports.updateHoney = async (req, res) => {
    try {
        let item = await Honey.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, error: 'Honey not found' });

        item = await Honey.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json({ success: false, error: 'Honey not found' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete honey
// @route   DELETE /api/v1/honey/:id
// @access  Private (Admin)
exports.deleteHoney = async (req, res) => {
    try {
        const item = await Honey.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, error: 'Honey not found' });

        await Honey.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json({ success: false, error: 'Honey not found' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};