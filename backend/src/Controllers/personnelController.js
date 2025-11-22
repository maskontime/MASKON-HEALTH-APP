const Personnel = require('../models/Personnel');
const { validationResult } = require('express-validator');

// @desc    Register personnel (admin/traditional/helpers)
// @route   POST /api/v1/personnel
// @access  Private (Admin)
exports.registerPersonnel = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
        const personnel = await Personnel.create(req.body);
        res.status(201).json({ success: true, data: personnel });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ success: false, error: 'Personnel already exists' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get personnel list
// @route   GET /api/v1/personnel
// @access  Private (Admin)
exports.getPersonnel = async (req, res) => {
    try {
        const personnel = await Personnel.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: personnel.length, data: personnel });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single personnel
// @route   GET /api/v1/personnel/:id
// @access  Private (Admin)
exports.getPersonnelById = async (req, res) => {
    try {
        const person = await Personnel.findById(req.params.id).select('-password');
        if (!person) return res.status(404).json({ success: false, error: 'Personnel not found' });
        res.status(200).json({ success: true, data: person });
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json({ success: false, error: 'Personnel not found' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update personnel
// @route   PUT /api/v1/personnel/:id
// @access  Private (Admin)
exports.updatePersonnel = async (req, res) => {
    try {
        let person = await Personnel.findById(req.params.id);
        if (!person) return res.status(404).json({ success: false, error: 'Personnel not found' });

        person = await Personnel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
        res.status(200).json({ success: true, data: person });
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json({ success: false, error: 'Personnel not found' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete personnel
// @route   DELETE /api/v1/personnel/:id
// @access  Private (Admin)
exports.deletePersonnel = async (req, res) => {
    try {
        const person = await Personnel.findById(req.params.id);
        if (!person) return res.status(404).json({ success: false, error: 'Personnel not found' });

        await Personnel.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json({ success: false, error: 'Personnel not found' });
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};