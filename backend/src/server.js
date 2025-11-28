// Handle uncaught exceptions early
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

// Load environment file based on NODE_ENV
const environment = process.env.NODE_ENV || 'development';
require('dotenv').config({
    path: environment === 'production' ? '.env.production' : '.env.development'
});

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

// FIXED: Changed Middleware → middleware
const { limiter, authLimiter } = require('./middleware/rateLimiter');
const { errorHandler } = require('./middleware/errorHandler');

const logger = require('./utils/logger');
const connectDB = require('./config/db');

// Initialize app
const app = express();

// Connect to Database
if (!process.env.MONGODB_URL) {
    logger.error("❌ MONGODB_URL is missing from environment variables");
    process.exit(1);
}

connectDB();

// Security Middleware
app.use(helmet());

// Proper CORS setup
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : ['*'];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(limiter);
app.use('/api/v1/auth', authLimiter);

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Logging
if (environment === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(
        morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } })
    );
}

// Routes
app.use('/api/v1/meals', require('./routes/mealRoutes'));
app.use('/api/v1/herbs', require('./routes/herbRoutes'));
app.use('/api/v1/honey', require('./routes/honeyRoutes'));
app.use('/api/v1/workouts', require('./routes/workoutRoutes'));
app.use('/api/v1/personnel', require('./routes/personnelRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/search', require('./routes/searchRoutes'));

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server running' });
});

// Error Handler
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `Route ${req.originalUrl} not found`,
    });
});

// Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection:', err.message || err);
    server.close(() => process.exit(1));
});

// Start Server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    logger.info(
        `🚀 Server running in ${environment.toUpperCase()} mode on port ${PORT}`
    );
});
