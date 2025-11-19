# Environment Variables Setup

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database Configuration
MONGODB_URL=mongodb://localhost:27017/maskon-health

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=30d

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
CORS_ORIGIN=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=public/uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

## Variable Descriptions

- **NODE_ENV**: Environment mode (development/production)
- **PORT**: Server port number
- **API_VERSION**: API version prefix
- **MONGODB_URL**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT token signing (use a strong random string in production)
- **JWT_EXPIRE**: JWT token expiration time (e.g., 30d, 1h)
- **ALLOWED_ORIGINS**: Comma-separated list of allowed CORS origins
- **CORS_ORIGIN**: Primary CORS origin
- **MAX_FILE_SIZE**: Maximum file upload size in bytes (5MB default)
- **UPLOAD_PATH**: Directory for uploaded files
- **RATE_LIMIT_WINDOW_MS**: Rate limiting window in milliseconds
- **RATE_LIMIT_MAX_REQUESTS**: Maximum requests per window
- **LOG_LEVEL**: Logging level (info, error, warn, debug)

## Production Notes

⚠️ **Important**: Change `JWT_SECRET` to a strong, random string in production!

You can generate a secure secret using:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

