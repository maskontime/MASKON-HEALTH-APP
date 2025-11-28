# 🩺 MASKON HEALTH APP

> **Maskon Health** is a comprehensive wellness platform dedicated to promoting health, fitness, and traditional nutrition in Kenyan communities. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this application brings traditional health wisdom to the modern digital age.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)](https://www.mongodb.com/)
Deploymnt links
 https://maskon-health-app-3.onrender.com

---

## 🌍 Overview

Maskon Health is a full-stack application that bridges traditional Kenyan wellness practices with modern technology. Our platform offers:

### Key Features

- 🥗 **Traditional Nutrition**
  - Comprehensive database of traditional Kenyan meals
  - Nutritional information and health benefits
  - Meal planning and recommendations

- 🌿 **Natural Remedies**
  - Herbal medicine catalog
  - Pure honey products
  - Traditional healing practices

- 💪 **Fitness & Wellness**
  - Customized workout routines
  - Traditional exercise methods
  - Progress tracking

- 👩🏽‍⚕️ **Health Professionals**
  - Verified traditional healers
  - Modern healthcare practitioners
  - Online consultations

- 📦 **E-commerce Integration**
  - Secure product ordering
  - Appointment booking
  - Payment processing

---

## ⚙️ Technology Stack

### Backend Technologies
| Category | Technology | Purpose |
|----------|------------|----------|
| Runtime | Node.js | Server-side JavaScript runtime |
| Framework | Express.js | Web application framework |
| Database | MongoDB | NoSQL database |
| ODM | Mongoose | MongoDB object modeling |
| Authentication | JWT | User authentication & authorization |
| Security | bcrypt | Password hashing |
| Validation | Express-validator | Input validation |
| Middleware | CORS | Cross-Origin Resource Sharing |
| Environment | dotenv | Environment configuration |
| Development | Nodemon | Hot-reloading during development |

### Frontend Technologies (Coming Soon)
- React.js with TypeScript
- Redux for state management
- Material-UI components
- Axios for API calls
- React Router for navigation

### DevOps & Tools
- Git for version control
- ESLint & Prettier for code formatting
- Jest for testing
- Docker for containerization
- CI/CD pipeline (planned)

---

## 📁 Project Structure
backend/
│
├── .env
├── package.json
├── server.js
│
└── src/
├── app.js # Main Express app (routes, middleware)
├── config/
│ └── db.js # MongoDB connection setup
├── models/
│ ├── Meal.js
│ ├── Herb.js
│ ├── Honey.js
│ ├── Workout.js
│ └── Personnel.js
├── controllers/
│ ├── mealController.js
│ ├── herbController.js
│ ├── honeyController.js
│ ├── workoutController.js
│ └── personnelController.js
├── routes/
│ ├── mealRoutes.js
│ ├── herbRoutes.js
│ ├── honeyRoutes.js
│ ├── workoutRoutes.js
│ └── personnelRoutes.js
├── middleware/
│ └── errorHandler.js
└── seed/
└── seedData.js


---

## 📦 Getting Started

### Prerequisites
- Node.js >= 14.0.0
- MongoDB >= 4.4
- npm or yarn
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/maskontime/MASKON-HEALTH-APP.git
   cd MASKON-HEALTH-APP
   ```

2. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend

   # Install dependencies
   npm install

   # Create environment file
   cp .env.example .env
   ```

3. **Configure Environment Variables**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   API_VERSION=v1
   ```

4. **Initialize Database**
   ```bash
   # Run database migrations
   npm run migrate

   # Seed initial data (optional)
   npm run seed
   ```

5. **Start Development Server**
   ```bash
   # Run with hot-reload
   npm run dev

   # Or run in production mode
   npm start
   ```

### Additional Setup

- **API Documentation**: Visit `http://localhost:5000/api-docs` after starting the server
- **Database GUI**: Use MongoDB Compass for database management
- **Environment**: Different configurations for development/production in `config/`
- **Logging**: Winston logger configured in `src/utils/logger.js`

## 🛠 Development Guidelines

### Code Style
- Follow Airbnb JavaScript Style Guide
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages following conventional commits
- Document all functions and complex logic

### Testing
- Write unit tests for all new features
- Maintain minimum 80% code coverage
- Run tests before pushing: `npm test`
- Integration tests for critical paths

### Git Workflow
1. Create feature branch from `develop`
2. Make changes and test locally
3. Submit PR with description and tests
4. Code review and approval required
5. Merge to `develop` after CI passes

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@maskonhealth.com or join our Slack channel.

---

## 🙏 Acknowledgments

- Traditional Kenyan healers and nutritionists
- Open source community
- All contributors and supporters

---

Made with ❤️ by the Maskon Health Team

