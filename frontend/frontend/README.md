# 🌿 Maskon Health Frontend

Modern React frontend for the Maskon Health application - promoting traditional African wellness through natural foods, herbs, and fitness practices.

## 🚀 Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router v6** - Navigation
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Headless UI** - Accessible components
- **Heroicons** - Icon library
- **React Hot Toast** - Notifications

## 📦 Installation

1. **Install Dependencies**
   ```bash
   cd frontend/frontend
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the `frontend/frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   VITE_UPLOAD_URL=http://localhost:5000/uploads
   VITE_APP_NAME=Maskon Health
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 🏗️ MERN FRONTEND STRUCTURE & IMAGE RULES

### Complete Project Structure

```
frontend/frontend/
├── public/                    # Static public assets (favicon, etc.)
├── src/
│   ├── assets/               # ⚠️ ALL IMAGES MUST BE HERE
│   │   ├── assets.js         # Centralized ES6 image exports
│   │   ├── logo.png          # App logo
│   │   ├── Honey.jpg         # Honey product images
│   │   ├── Moringa.jpg       # Herb images
│   │   ├── ugali.jpg         # Meal images
│   │   ├── *.png             # Fitness/workout images
│   │   └── *.jpg             # Traditional foods images
│   │
│   ├── components/            # React components
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── Modal.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CategoryCards.tsx
│   │   │   └── HealthGoalCards.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── search/
│   │       └── SearchBar.tsx
│   │
│   ├── pages/                # Page-level components
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── MealsPage.tsx
│   │   ├── HerbsPage.tsx
│   │   ├── HoneyPage.tsx
│   │   ├── WorkoutsPage.tsx
│   │   ├── ExpertsPage.tsx
│   │   ├── CartPage.tsx
│   │   └── CheckoutPage.tsx
│   │
│   ├── context/              # React Context providers
│   │   ├── AuthContext.tsx   # Authentication state
│   │   └── CartContext.tsx   # Shopping cart state
│   │
│   ├── services/             # API service layer
│   │   ├── api.ts            # Axios instance & interceptors
│   │   ├── authService.ts
│   │   ├── mealService.ts
│   │   ├── herbService.ts
│   │   ├── honeyService.ts
│   │   ├── workoutService.ts
│   │   ├── personnelService.ts
│   │   └── searchService.ts
│   │
│   ├── types/                # TypeScript definitions
│   │   └── index.ts          # All type interfaces
│   │
│   ├── utils/                # Utility functions
│   │   ├── helpers.ts        # formatPrice, getImageUrl, etc.
│   │   ├── constants.ts      # App constants
│   │   └── validators.ts     # Form validation
│   │
│   ├── App.tsx               # Main app component with routing
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles + Tailwind
│
├── .env                      # Environment variables
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind v4 config (CSS-first)
└── README.md
```

## 🖼️ Image Usage Rules (MERN Project)

### **CRITICAL: All images MUST be imported from `src/assets`**

In a MERN stack project, **all static images must be imported using ES6 imports** from the `src/assets` directory. This ensures:
- Images are properly bundled by Vite
- Type safety and build-time error checking
- Proper asset optimization
- No broken image paths in production

### ✅ Correct Image Import Pattern

```typescript
// ✅ CORRECT: Import from assets.js
import { honeyImg, logoImg, moringaImg } from '../assets/assets';

// Use in component
<img src={honeyImg} alt="Honey product" />
```

### ❌ Incorrect Patterns (DO NOT USE)

```typescript
// ❌ WRONG: Relative paths
<img src="./assets/honey.jpg" />
<img src="../../assets/honey.jpg" />
<img src="/assets/honey.jpg" />

// ❌ WRONG: Public folder paths (unless using Vite public folder)
<img src="/images/honey.jpg" />
```

### 📁 Assets Structure

All images are organized in `src/assets/` and exported through `src/assets/assets.js`:

- **Traditional Foods**: `moringaImg`, `honeyImg`, `ugaliImg`, `riceBeefStewImg`, etc.
- **Fitness Images**: `workoutImg`, `cyclingImg`, `manTrainingImg`, `womanTrainingImg`, etc.
- **Logo**: `logoImg`

### 📝 Example Component with Correct Image Import

```typescript
import React from 'react';
import { honeyImg } from '../assets/assets';

export const HoneyCard: React.FC = () => {
  return (
    <div>
      <img 
        src={honeyImg} 
        alt="Pure honey" 
        className="w-full h-48 object-cover"
      />
    </div>
  );
};
```

### 📋 Complete Example: React Page with Images

```typescript
// src/pages/HoneyPage.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { honeyService } from '../services/honeyService';
import { Card, CardBody } from '../components/common/Card';
import { getImageUrl, formatPrice } from '../utils/helpers';
import { honeyImg } from '../assets/assets'; // ✅ Correct import
import { Link } from 'react-router-dom';

export const HoneyPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['honey'],
    queryFn: () => honeyService.getAll(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-6">
      {data?.data.map((honey) => (
        <Link key={honey._id} to={`/honey/${honey._id}`}>
          <Card>
            {/* ✅ Correct: Fallback to asset image */}
            <img
              src={honey.image ? getImageUrl(honey.image) : honeyImg}
              alt={honey.name}
              className="w-full h-48 object-cover"
            />
            <CardBody>
              <h3>{honey.name}</h3>
              <p>{formatPrice(honey.packaging[0]?.price)}</p>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
};
```

### 🔄 Fallback Pattern for API Images

When displaying images from the API, always provide a fallback from assets:

```typescript
import { honeyImg } from '../assets/assets';
import { getImageUrl } from '../utils/helpers';

// In component
<img 
  src={product.image ? getImageUrl(product.image) : honeyImg}
  alt={product.name}
/>
```

### 📋 Page-Specific Image Rules

- **Honey Page** → Use only `honeyImg`, `honey2Img` from assets
- **Meals Page** → Use only meal images: `ugaliImg`, `riceBeefStewImg`, `kenyanTraditionalMealImg`
- **Workouts Page** → Use only fitness images: `workoutImg`, `cyclingImg`, `manTrainingImg`, `womanTrainingImg`
- **Herbs Page** → Use only herb images: `moringaImg`, `moringa2Img`

**Never reuse wrong images across pages!**

## 🎨 Design System

### Colors
- **Primary Green**: `#2e7d32` - Natural health
- **Secondary Orange**: `#ff6b35` - African earth tones
- **Accent Green**: `#66bb6a` - Freshness
- **Text Primary**: `#333333`
- **Text Secondary**: `#666666`
- **Surface**: `#f5f5f5`

### Typography
- **Font**: Inter (Google Fonts)
- Clean, modern, highly readable

## 📱 Features

### Implemented
- ✅ Homepage with hero section, health goals, and categories
- ✅ Authentication (Login)
- ✅ Product pages (Meals, Herbs, Honey, Workouts)
- ✅ Expert directory
- ✅ Shopping cart with LocalStorage persistence
- ✅ Checkout flow
- ✅ Search functionality
- ✅ Responsive design
- ✅ Loading states and error handling

### Pages
- `/` - Homepage
- `/login` - Login page
- `/meals` - Traditional meals listing
- `/herbs` - Medicinal herbs catalog
- `/honey` - Honey products
- `/workouts` - Fitness plans
- `/experts` - Expert directory
- `/cart` - Shopping cart
- `/checkout` - Checkout page

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The frontend integrates with the backend API at `http://localhost:5000/api/v1`:

- **Authentication**: `/auth/login`, `/auth/register`, `/auth/me`
- **Meals**: `/meals`
- **Herbs**: `/herbs`
- **Honey**: `/honey`
- **Workouts**: `/workouts`
- **Personnel**: `/personnel`
- **Search**: `/search`

## 🔐 Authentication

- JWT tokens stored in localStorage
- Automatic token injection in API requests
- Protected routes with role-based access
- Auto-logout on 401 errors

## 🛒 Shopping Cart

- LocalStorage persistence
- Support for multiple product types
- Real-time price calculation
- Quantity management

## 📝 Notes

- Ensure the backend server is running before starting the frontend
- The app uses React Query for data fetching and caching
- All forms use React Hook Form for validation
- Toast notifications for user feedback
- Responsive design with mobile-first approach

## 🚀 Production Build

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 📄 License

MIT
