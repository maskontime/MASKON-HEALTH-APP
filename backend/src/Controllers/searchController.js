const Meal = require('../models/Meal');
const Herb = require('../models/Herb');
const Honey = require('../models/Honey');
const Workout = require('../models/Workout');
const Personnel = require('../models/Personneljs');

// @desc    Global search across all resources
// @route   GET /api/v1/search
// @access  Public
exports.globalSearch = async (req, res) => {
    try {
        const { q, type, limit = 10 } = req.query;

        if (!q || q.trim() === '') {
            return res.status(400).json({ success: false, error: 'Search query is required' });
        }

        const searchQuery = q.trim();
        const searchLimit = parseInt(limit, 10);
        const searchType = type ? type.toLowerCase() : 'all';

        const results = { meals: [], herbs: [], honey: [], workouts: [], personnel: [] };

        if (searchType === 'all' || searchType === 'meals') {
            results.meals = await Meal.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } },
                    { region: { $regex: searchQuery, $options: 'i' } }
                ]
            }).limit(searchLimit).select('name description image region category');
        }

        if (searchType === 'all' || searchType === 'herbs') {
            results.herbs = await Herb.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { scientificName: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ]
            }).limit(searchLimit).select('name scientificName description image region category');
        }

        if (searchType === 'all' || searchType === 'honey') {
            results.honey = await Honey.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ]
            }).limit(searchLimit).select('name type description image region quality');
        }

        if (searchType === 'all' || searchType === 'workouts') {
            results.workouts = await Workout.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ]
            }).limit(searchLimit).select('name description image category difficulty duration');
        }

        if (searchType === 'all' || searchType === 'personnel') {
            results.personnel = await Personnel.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { specialization: { $regex: searchQuery, $options: 'i' } }
                ]
            }).limit(searchLimit).select('-password name role specialization isVerified profileImage');
        }

        const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);

        res.status(200).json({ success: true, query: searchQuery, totalResults, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Advanced search with filters
// @route   POST /api/v1/search/advanced
// @access  Public
exports.advancedSearch = async (req, res) => {
    try {
        const { query, filters, types } = req.body;

        if (!query || query.trim() === '') return res.status(400).json({ success: false, error: 'Search query is required' });

        const searchQuery = query.trim();
        const searchTypes = types && Array.isArray(types) ? types : ['meals','herbs','honey','workouts','personnel'];
        const results = {};

        if (searchTypes.includes('meals')) {
            const mealQuery = { $or: [ { name: { $regex: searchQuery, $options: 'i' } }, { description: { $regex: searchQuery, $options: 'i' } } ] };
            if (filters?.meals) {
                if (filters.meals.category) mealQuery.category = filters.meals.category;
                if (filters.meals.region) mealQuery.region = { $regex: filters.meals.region, $options: 'i' };
            }
            results.meals = await Meal.find(mealQuery).limit(20);
        }

        if (searchTypes.includes('herbs')) {
            const herbQuery = { $or: [ { name: { $regex: searchQuery, $options: 'i' } }, { scientificName: { $regex: searchQuery, $options: 'i' } } ] };
            if (filters?.herbs) {
                if (filters.herbs.category) herbQuery.category = filters.herbs.category;
                if (filters.herbs.region) herbQuery.region = { $regex: filters.herbs.region, $options: 'i' };
            }
            results.herbs = await Herb.find(herbQuery).limit(20);
        }

        if (searchTypes.includes('honey')) {
            const honeyQuery = { $or: [ { name: { $regex: searchQuery, $options: 'i' } }, { description: { $regex: searchQuery, $options: 'i' } } ] };
            if (filters?.honey) {
                if (filters.honey.type) honeyQuery.type = filters.honey.type;
                if (filters.honey.region) honeyQuery.region = { $regex: filters.honey.region, $options: 'i' };
            }
            results.honey = await Honey.find(honeyQuery).limit(20);
        }

        if (searchTypes.includes('workouts')) {
            const workoutQuery = { $or: [ { name: { $regex: searchQuery, $options: 'i' } }, { description: { $regex: searchQuery, $options: 'i' } } ] };
            if (filters?.workouts) {
                if (filters.workouts.category) workoutQuery.category = filters.workouts.category;
            }
            results.workouts = await Workout.find(workoutQuery).limit(20);
        }

        if (searchTypes.includes('personnel')) {
            const personnelQuery = { $or: [ { name: { $regex: searchQuery, $options: 'i' } }, { specialization: { $regex: searchQuery, $options: 'i' } } ] };
            if (filters?.personnel) {
                if (filters.personnel.role) personnelQuery.role = filters.personnel.role;
            }
            results.personnel = await Personnel.find(personnelQuery).select('-password').limit(20);
        }

        const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);

        res.status(200).json({ success: true, query: searchQuery, filters, totalResults, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};