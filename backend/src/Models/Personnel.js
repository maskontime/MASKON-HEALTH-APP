const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const personnelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required']
    },
    role: {
        type: String,
        enum: ['traditional-healer', 'nutritionist', 'fitness-trainer', 'admin'],
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    certifications: [{
        name: String,
        issuedBy: String,
        year: Number,
        verificationUrl: String
    }],
    experience: {
        type: Number,
        required: true
    },
    location: {
        region: String,
        city: String,
        address: String
    },
    availability: [{
        day: {
            type: String,
            enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        },
        slots: [{
            startTime: String,
            endTime: String
        }]
    }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: Number,
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String
    }
}, {
    timestamps: true
});

// Hash password before saving
personnelSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to check password
personnelSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.Personnel || mongoose.model('Personnel', personnelSchema);
