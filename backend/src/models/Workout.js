const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Workout name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    type: {
        type: String,
        required: true,
        enum: ['traditional', 'modern', 'hybrid']
    },
    category: {
        type: String,
        required: true,
        enum: ['strength', 'cardio', 'flexibility', 'balance', 'meditation']
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced']
    },
    duration: {
        value: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            enum: ['minutes', 'hours'],
            default: 'minutes'
        }
    },
    exercises: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        sets: Number,
        reps: Number,
        duration: {
            value: Number,
            unit: String
        },
        image: String,
        video: String,
        equipment: [String],
        modifications: [{
            level: String,
            description: String
        }]
    }],
    equipment: [{
        type: String
    }],
    targetMuscles: [{
        type: String
    }],
    benefits: [{
        type: String,
        required: true
    }],
    precautions: [{
        type: String
    }],
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Personnel',
        required: true
    },
    image: {
        type: String
    },
    video: {
        type: String
    },
    calories: {
        type: Number
    },
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
    }]
}, {
    timestamps: true
});

// Add text index for search functionality
workoutSchema.index({ 
    name: 'text', 
    description: 'text', 
    'exercises.name': 'text' 
});

module.exports = mongoose.model('Workout', workoutSchema);