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
const Personnel = require('../Models/Personnel');
const { validationResult } = require('express-validator');

// @desc    Get all personnel
// @route   GET /api/v1/personnel
// @access  Public
exports.getPersonnel = async (req, res) => {
    try {
        const { role, specialization, location, search, isVerified } = req.query;
        let query = {};

        if (role) {
            query.role = role;
        }
        if (specialization) {
            query.specialization = { $regex: specialization, $options: 'i' };
        }
        if (location) {
            query.$or = [
                { 'location.region': { $regex: location, $options: 'i' } },
                { 'location.city': { $regex: location, $options: 'i' } }
            ];
        }
        if (isVerified !== undefined) {
            query.isVerified = isVerified === 'true';
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { specialization: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const personnel = await Personnel.find(query)
            .select('-password')
            .populate({
                path: 'reviews.user',
                select: 'name'
            })
            .sort('-rating -createdAt');

        res.status(200).json({
            success: true,
            count: personnel.length,
            data: personnel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get single personnel
// @route   GET /api/v1/personnel/:id
// @access  Public
exports.getPersonnelById = async (req, res) => {
    try {
        const personnel = await Personnel.findById(req.params.id)
            .select('-password')
            .populate({
                path: 'reviews.user',
                select: 'name'
            });

        if (!personnel) {
            return res.status(404).json({
                success: false,
                error: 'Personnel not found'
            });
        }

        res.status(200).json({
            success: true,
            data: personnel
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Personnel not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Create new personnel
// @route   POST /api/v1/personnel
// @access  Private (Admin)
exports.createPersonnel = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        // Check if personnel already exists
        const existingPersonnel = await Personnel.findOne({ email: req.body.email });
        if (existingPersonnel) {
            return res.status(400).json({
                success: false,
                error: 'Personnel with this email already exists'
            });
        }

        const personnel = await Personnel.create(req.body);

        // Remove password from response
        personnel.password = undefined;

        res.status(201).json({
            success: true,
            data: personnel
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Personnel with this email already exists'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Update personnel
// @route   PUT /api/v1/personnel/:id
// @access  Private (Admin, Self)
exports.updatePersonnel = async (req, res) => {
    try {
        let personnel = await Personnel.findById(req.params.id);

        if (!personnel) {
            return res.status(404).json({
                success: false,
                error: 'Personnel not found'
            });
        }

        // Make sure user is updating themselves or is admin
        if (personnel._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to update this personnel'
            });
        }

        // Don't allow password update through this route
        if (req.body.password) {
            delete req.body.password;
        }

        personnel = await Personnel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).select('-password');

        res.status(200).json({
            success: true,
            data: personnel
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Personnel not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Delete personnel
// @route   DELETE /api/v1/personnel/:id
// @access  Private (Admin)
exports.deletePersonnel = async (req, res) => {
    try {
        const personnel = await Personnel.findById(req.params.id);

        if (!personnel) {
            return res.status(404).json({
                success: false,
                error: 'Personnel not found'
            });
        }

        await Personnel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Personnel not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Add review to personnel
// @route   POST /api/v1/personnel/:id/reviews
// @access  Private
exports.addPersonnelReview = async (req, res) => {
    try {
        const personnel = await Personnel.findById(req.params.id);

        if (!personnel) {
            return res.status(404).json({
                success: false,
                error: 'Personnel not found'
            });
        }

        // Check if user has already reviewed
        const alreadyReviewed = personnel.reviews.find(
            review => review.user.toString() === req.user.id
        );

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                error: 'Personnel already reviewed'
            });
        }

        const review = {
            user: req.user.id,
            rating: req.body.rating,
            comment: req.body.comment
        };

        personnel.reviews.push(review);

        // Calculate average rating
        personnel.rating = personnel.reviews.reduce((acc, item) => item.rating + acc, 0) / personnel.reviews.length;

        await personnel.save();

        res.status(201).json({
            success: true,
            data: personnel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Verify personnel
// @route   PUT /api/v1/personnel/:id/verify
// @access  Private (Admin)
exports.verifyPersonnel = async (req, res) => {
    try {
        const personnel = await Personnel.findById(req.params.id);

        if (!personnel) {
            return res.status(404).json({
                success: false,
                error: 'Personnel not found'
            });
        }

        personnel.isVerified = true;
        await personnel.save();

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
};

