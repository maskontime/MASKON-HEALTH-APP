const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Personnel = require('../models/Personnel');
const { protect } = require('../middleware/auth');

// @route   POST /api/v1/auth/register
// @desc    Register personnel
// @access  Public
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required').not().isEmpty(),
    check('specialization', 'Specialization is required').not().isEmpty(),
    check('experience', 'Experience is required').not().isEmpty(),
    check('phoneNumber', 'Phone number is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let personnel = await Personnel.findOne({ email: req.body.email });

        if (personnel) {
            return res.status(400).json({
                success: false,
                error: 'Personnel already exists'
            });
        }

        personnel = await Personnel.create(req.body);

        const token = jwt.sign(
            { id: personnel._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.status(201).json({
            success: true,
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

// @route   POST /api/v1/auth/login
// @desc    Login personnel
// @access  Public
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const personnel = await Personnel.findOne({ email }).select('+password');

        if (!personnel) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const isMatch = await personnel.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { id: personnel._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

// @route   GET /api/v1/auth/me
// @desc    Get current logged in personnel
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        const personnel = await Personnel.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: personnel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

module.exports = router;