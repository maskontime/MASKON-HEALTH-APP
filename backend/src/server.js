require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const { limiter, authLimiter } = require('./Middleware/rateLimiter');
const { errorHandler } = require('./Middleware/errorHandler');
const logger = require('./utils/logger');
const connectDB = require('./config/db');

// Initialize express app
const app = express();

// Connect to Database
if (process.env.MONGODB_URL) {
    connectDB();
} else {
    logger.warn('MongoDB URI not found. Starting without database connection.');
}

// Security Middleware
app.use(helmet()); // Security headers
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS,
    credentials: true
}));
app.use(limiter); // Rate limiting
app.use('/api/v1/auth', authLimiter); // Specific limiter for auth routes

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
}

// Import routes
const mealRoutes = require('./Routes/mealRoutes');
const herbRoutes = require('./Routes/herbRoutes');
const honeyRoutes = require('./Routes/honeyRoutes');
const workoutRoutes = require('./Routes/workoutRoutes');
const personnelRoutes = require('./Routes/personnelRoutes');
const authRoutes = require('./Routes/authRoutes');

// API Routes
app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/herbs', herbRoutes);
app.use('/api/v1/honey', honeyRoutes);
app.use('/api/v1/workouts', workoutRoutes);
app.use('/api/v1/personnel', personnelRoutes);
app.use('/api/v1/auth', authRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

// Handle unhandled routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `Route ${req.originalUrl} not found`
    });
});

// Unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    logger.error('Unhandled Rejection:', err);
    // Close server & exit process
    server.close(() => process.exit(1));
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});