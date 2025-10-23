const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config();

// Load models
const Herb = require('../models/Herb');
const Honey = require('../models/Honey');
const Meal = require('../models/Meal');
const Personnel = require('../models/Personnel');
const Workout = require('../models/Workout');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Read JSON files
const herbs = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'herbs.json'), 'utf-8'));
const honey = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'honey.json'), 'utf-8'));
const meals = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'meals.json'), 'utf-8'));
const personnel = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'personnel.json'), 'utf-8'));
const workouts = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'workouts.json'), 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await Herb.create(herbs);
        await Honey.create(honey);
        await Meal.create(meals);
        await Personnel.create(personnel);
        await Workout.create(workouts);

        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Herb.deleteMany();
        await Honey.deleteMany();
        await Meal.deleteMany();
        await Personnel.deleteMany();
        await Workout.deleteMany();

        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}