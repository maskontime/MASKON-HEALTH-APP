const mongoose = require('mongoose');

const herbSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Herb name is required'],
        trim: true,
        unique: true
    },
    scientificName: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    benefits: [{
        type: String,
        required: true
    }],
    usages: [{
        condition: {
            type: String,
            required: true
        },
        preparation: {
            type: String,
            required: true
        },
        dosage: {
            type: String,
            required: true
        },
        precautions: {
            type: String
        }
    }],
    sideEffects: [{
        type: String
    }],
    contraindications: [{
        type: String
    }],
    region: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        enum: ['in-stock', 'out-of-stock', 'seasonal'],
        default: 'in-stock'
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        }
    },
    image: {
        type: String
    },
    category: {
        type: String,
        required: true,
        enum: ['medicinal', 'culinary', 'aromatic', 'ceremonial']
    },
    certifications: [{
        name: String,
        issuedBy: String,
        year: Number
    }],
    harvesting: {
        season: String,
        method: String,
        bestPractices: [String]
    }
}, {
    timestamps: true
});

// Add text index for search functionality
herbSchema.index({ 
    name: 'text', 
    scientificName: 'text', 
    description: 'text' 
});

module.exports = mongoose.model('Herb', herbSchema);