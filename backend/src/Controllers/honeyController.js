const Honey = require('../models/Honey');
const { validationResult } = require('express-validator');

// @desc    Get all honey products
// @route   GET /api/v1/honey
// @access  Public
exports.getAllHoney = async (req, res) => {
    try {
        const { type, region, search, minPurity } = req.query;
        let query = {};

        if (type) {
            query.type = type;
        }
        if (region) {
            query.region = region;
        }
        if (minPurity) {
            query['quality.purity'] = { $gte: parseFloat(minPurity) };
        }
        if (search) {
            query.$text = { $search: search };
        }

        const honey = await Honey.find(query)
            .sort('-createdAt')
            .populate({
                path: 'reviews.user',
                select: 'name'
            });

        res.status(200).json({
            success: true,
            count: honey.length,
            data: honey
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get single honey product
// @route   GET /api/v1/honey/:id
// @access  Public
exports.getHoney = async (req, res) => {
    try {
        const honey = await Honey.findById(req.params.id)
            .populate({
                path: 'reviews.user',
                select: 'name'
            });

        if (!honey) {
            return res.status(404).json({
                success: false,
                error: 'Honey product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: honey
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Honey product not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Create new honey product
// @route   POST /api/v1/honey
// @access  Private (Admin, Traditional Healer)
exports.createHoney = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const honey = await Honey.create({
            ...req.body,
            harvestInfo: {
                ...req.body.harvestInfo,
                date: req.body.harvestInfo?.date ? new Date(req.body.harvestInfo.date) : new Date()
            }
        });

        res.status(201).json({
            success: true,
            data: honey
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Update honey product
// @route   PUT /api/v1/honey/:id
// @access  Private (Admin, Traditional Healer)
exports.updateHoney = async (req, res) => {
    try {
        let honey = await Honey.findById(req.params.id);

        if (!honey) {
            return res.status(404).json({
                success: false,
                error: 'Honey product not found'
            });
        }

        honey = await Honey.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                harvestInfo: {
                    ...req.body.harvestInfo,
                    date: req.body.harvestInfo?.date ? new Date(req.body.harvestInfo.date) : honey.harvestInfo.date
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: honey
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Honey product not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Delete honey product
// @route   DELETE /api/v1/honey/:id
// @access  Private (Admin)
exports.deleteHoney = async (req, res) => {
    try {
        const honey = await Honey.findById(req.params.id);

        if (!honey) {
            return res.status(404).json({
                success: false,
                error: 'Honey product not found'
            });
        }

        await honey.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Honey product not found'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Add review to honey product
// @route   POST /api/v1/honey/:id/reviews
// @access  Private
exports.addHoneyReview = async (req, res) => {
    try {
        const honey = await Honey.findById(req.params.id);

        if (!honey) {
            return res.status(404).json({
                success: false,
                error: 'Honey product not found'
            });
        }

        const review = {
            user: req.user.id,
            rating: req.body.rating,
            comment: req.body.comment
        };

        honey.reviews.push(review);

        // Calculate average rating
        honey.rating = honey.reviews.reduce((acc, item) => item.rating + acc, 0) / honey.reviews.length;

        await honey.save();

        res.status(201).json({
            success: true,
            data: honey
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};