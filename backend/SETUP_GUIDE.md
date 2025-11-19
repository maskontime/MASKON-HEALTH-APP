# 🚀 Backend Setup Guide

## Prerequisites

- Node.js >= 14.0.0
- MongoDB >= 4.4
- npm or yarn

## Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend` directory. See `ENV_SETUP.md` for all required environment variables.

Minimum required variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URL=mongodb://localhost:27017/maskon-health
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# On Windows (if installed as service, it should start automatically)
# On Linux/Mac
mongod
```

### 4. Seed Database (Optional)

To populate the database with sample data:
```bash
npm run seed:import
```

To clear all data:
```bash
npm run seed:destroy
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### 6. Verify Installation

Visit `http://localhost:5000/health` - you should see:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/          # Database configuration
│   ├── Controllers/      # Route controllers
│   ├── Middleware/      # Custom middleware
│   ├── Models/          # Mongoose models
│   ├── Routes/          # Express routes
│   ├── Seed/            # Database seeder
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── public/
│   └── uploads/         # Uploaded files
├── logs/                # Application logs
└── package.json
```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed:import` - Import seed data
- `npm run seed:destroy` - Delete all seed data

## API Endpoints

See `API_DOCUMENTATION.md` for complete API documentation.

Base URL: `http://localhost:5000/api/v1`

## Testing the API

### Health Check
```bash
curl http://localhost:5000/health
```

### Register Personnel
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "nutritionist",
    "specialization": "Traditional Nutrition",
    "experience": 5,
    "phoneNumber": "+254712345678"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get All Meals
```bash
curl http://localhost:5000/api/v1/meals
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URL` in `.env` file
- Verify MongoDB connection string format

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using the port

### JWT Secret Error
- Ensure `JWT_SECRET` is set in `.env`
- Use a strong, random string

### CORS Errors
- Update `ALLOWED_ORIGINS` in `.env` with your frontend URL
- Restart the server after changing CORS settings

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Configure proper CORS origins
4. Set up MongoDB connection string for production
5. Use process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name maskon-health-api
   ```

## Support

For issues or questions, refer to the main README.md or contact the development team.

