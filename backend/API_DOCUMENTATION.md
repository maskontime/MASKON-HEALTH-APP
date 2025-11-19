# 🚀 Maskon Health API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

---

## 📋 Endpoints

### Authentication Routes

#### Register Personnel
```http
POST /api/v1/auth/register
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "nutritionist",
  "specialization": "Traditional Nutrition",
  "experience": 5,
  "phoneNumber": "+254712345678"
}
```

#### Login
```http
POST /api/v1/auth/login
```
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/v1/auth/me
```
**Headers:** `Authorization: Bearer <token>`

---

### Meals Routes

#### Get All Meals
```http
GET /api/v1/meals?category=breakfast&region=kenya&search=ugali
```
**Query Parameters:**
- `category`: breakfast, lunch, dinner, snack
- `region`: Filter by region
- `search`: Search in name and description

#### Get Single Meal
```http
GET /api/v1/meals/:id
```

#### Create Meal (Protected - Admin/Nutritionist)
```http
POST /api/v1/meals
```
**Headers:** `Authorization: Bearer <token>`

#### Update Meal (Protected - Admin/Nutritionist)
```http
PUT /api/v1/meals/:id
```

#### Delete Meal (Protected - Admin)
```http
DELETE /api/v1/meals/:id
```

---

### Herbs Routes

#### Get All Herbs
```http
GET /api/v1/herbs?category=medicinal&region=kenya&availability=in-stock&search=moringa
```
**Query Parameters:**
- `category`: medicinal, culinary, aromatic, ceremonial
- `region`: Filter by region
- `availability`: in-stock, out-of-stock, seasonal
- `search`: Full-text search

#### Get Single Herb
```http
GET /api/v1/herbs/:id
```

#### Create Herb (Protected - Admin/Traditional Healer)
```http
POST /api/v1/herbs
```

#### Update Herb (Protected - Admin/Traditional Healer)
```http
PUT /api/v1/herbs/:id
```

#### Delete Herb (Protected - Admin)
```http
DELETE /api/v1/herbs/:id
```

---

### Honey Routes

#### Get All Honey Products
```http
GET /api/v1/honey?type=raw&region=kenya&minPurity=90&search=acacia
```
**Query Parameters:**
- `type`: raw, processed, comb, creamed
- `region`: Filter by region
- `minPurity`: Minimum purity percentage
- `search`: Full-text search

#### Get Single Honey Product
```http
GET /api/v1/honey/:id
```

#### Create Honey (Protected - Admin/Traditional Healer)
```http
POST /api/v1/honey
```

#### Update Honey (Protected - Admin/Traditional Healer)
```http
PUT /api/v1/honey/:id
```

#### Delete Honey (Protected - Admin)
```http
DELETE /api/v1/honey/:id
```

#### Add Review to Honey (Protected)
```http
POST /api/v1/honey/:id/reviews
```
**Body:**
```json
{
  "rating": 5,
  "comment": "Excellent quality honey!"
}
```

---

### Workouts Routes

#### Get All Workouts
```http
GET /api/v1/workouts?type=traditional&category=strength&difficulty=beginner&trainer=123&search=yoga
```
**Query Parameters:**
- `type`: traditional, modern, hybrid
- `category`: strength, cardio, flexibility, balance, meditation
- `difficulty`: beginner, intermediate, advanced
- `trainer`: Filter by trainer ID
- `search`: Full-text search

#### Get Single Workout
```http
GET /api/v1/workouts/:id
```

#### Create Workout (Protected - Admin/Fitness Trainer)
```http
POST /api/v1/workouts
```

#### Update Workout (Protected - Admin/Fitness Trainer/Owner)
```http
PUT /api/v1/workouts/:id
```

#### Delete Workout (Protected - Admin/Fitness Trainer/Owner)
```http
DELETE /api/v1/workouts/:id
```

#### Add Review to Workout (Protected)
```http
POST /api/v1/workouts/:id/reviews
```

---

### Personnel Routes

#### Get All Personnel
```http
GET /api/v1/personnel?role=nutritionist&specialization=nutrition&location=nairobi&isVerified=true&search=john
```
**Query Parameters:**
- `role`: traditional-healer, nutritionist, fitness-trainer, admin
- `specialization`: Filter by specialization
- `location`: Filter by region or city
- `isVerified`: true/false
- `search`: Search in name, specialization, email

#### Get Single Personnel
```http
GET /api/v1/personnel/:id
```

#### Create Personnel (Protected - Admin)
```http
POST /api/v1/personnel
```

#### Update Personnel (Protected - Admin/Self)
```http
PUT /api/v1/personnel/:id
```

#### Delete Personnel (Protected - Admin)
```http
DELETE /api/v1/personnel/:id
```

#### Add Review to Personnel (Protected)
```http
POST /api/v1/personnel/:id/reviews
```

#### Verify Personnel (Protected - Admin)
```http
PUT /api/v1/personnel/:id/verify
```

---

### Search Routes

#### Global Search
```http
GET /api/v1/search?q=moringa&type=all&limit=10
```
**Query Parameters:**
- `q`: Search query (required)
- `type`: all, meals, herbs, honey, workouts, personnel
- `limit`: Number of results per type (default: 10)

#### Advanced Search
```http
POST /api/v1/search/advanced
```
**Body:**
```json
{
  "query": "moringa",
  "types": ["herbs", "meals"],
  "filters": {
    "herbs": {
      "category": "medicinal",
      "region": "kenya",
      "availability": "in-stock"
    },
    "meals": {
      "category": "breakfast",
      "region": "kenya"
    }
  }
}
```

---

## 🔒 Role-Based Access Control

### Roles:
- **admin**: Full access to all resources
- **traditional-healer**: Can create/update herbs and honey
- **nutritionist**: Can create/update meals
- **fitness-trainer**: Can create/update workouts
- **user**: Can view resources and add reviews

---

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "count": 10
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🚨 Error Codes

- `400`: Bad Request - Validation errors
- `401`: Unauthorized - Missing or invalid token
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource not found
- `500`: Internal Server Error

---

## 📤 File Uploads

Upload images using `multipart/form-data`:
- Max file size: 5MB
- Allowed types: jpeg, jpg, png, gif
- Upload path: `/uploads`

---

## 🔄 Rate Limiting

- General API: 100 requests per 15 minutes per IP
- Authentication: 5 requests per hour per IP

---

## 🏥 Health Check

```http
GET /health
```

Returns server status.

