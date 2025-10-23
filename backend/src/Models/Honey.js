const mongoose = require('mongoose');

const honeySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Honey name is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Honey type is required'],
        enum: ['raw', 'processed', 'comb', 'creamed']
    },
    flowerSource: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    region: {
        type: String,
        required: true
    },
    benefits: [{
        type: String,
        required: true
    }],
    nutritionalInfo: {
        calories: Number,
        sugar: Number,
        minerals: [String],
        vitamins: [String]
    },
    quality: {
        purity: {
            type: Number,
            min: 0,
            max: 100,
            required: true
        },
        moisture: {
            type: Number,
            required: true
        },
        color: String
    },
    certifications: [{
        name: String,
        issuedBy: String,
        year: Number,
        verificationUrl: String
    }],
    packaging: [{
        size: {
            value: Number,
            unit: String
        },
        price: Number,
        available: {
            type: Boolean,
            default: true
        }
    }],
    harvestInfo: {
        date: Date,
        season: String,
        method: String
    },
    storage: {
        recommendations: [String],
        shelfLife: String,
        temperature: String
    },
    image: {
        type: String
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
honeySchema.index({ 
    name: 'text', 
    description: 'text', 
    'flowerSource': 'text' 
});

module.exports = mongoose.model('Honey', honeySchema);