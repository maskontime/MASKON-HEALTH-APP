const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Meal name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Meal description is required']
    },
    ingredients: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        nutritionalValue: {
            type: String
        }
    }],
    preparationSteps: [{
        type: String,
        required: true
    }],
    nutritionalInfo: {
        calories: Number,
        protein: Number,
        carbohydrates: Number,
        fats: Number,
        fiber: Number
    },
    category: {
        type: String,
        required: true,
        enum: ['breakfast', 'lunch', 'dinner', 'snack']
    },
    region: {
        type: String,
        required: true
    },
    healthBenefits: [{
        type: String
    }],
    image: {
        type: String
    },
    preparationTime: {
        type: Number,
        required: true
    },
    servingSize: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Meal', mealSchema);