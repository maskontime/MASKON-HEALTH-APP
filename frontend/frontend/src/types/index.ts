export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'traditional-healer' | 'nutritionist' | 'fitness-trainer' | 'user';
  specialization?: string;
}

export interface Meal {
  _id: string;
  name: string;
  description: string;
  ingredients: Array<{
    name: string;
    quantity: string;
    nutritionalValue?: string;
  }>;
  preparationSteps: string[];
  nutritionalInfo: {
    calories?: number;
    protein?: number;
    carbohydrates?: number;
    fats?: number;
    fiber?: number;
  };
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  region: string;
  healthBenefits: string[];
  image?: string;
  preparationTime: number;
  servingSize: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Herb {
  _id: string;
  name: string;
  scientificName?: string;
  description: string;
  benefits: string[];
  usages: Array<{
    condition: string;
    preparation: string;
    dosage: string;
    precautions?: string;
  }>;
  sideEffects?: string[];
  contraindications?: string[];
  region: string;
  availability: 'in-stock' | 'out-of-stock' | 'seasonal';
  price: {
    amount: number;
    unit: string;
  };
  image?: string;
  category: 'medicinal' | 'culinary' | 'aromatic' | 'ceremonial';
  certifications?: Array<{
    name: string;
    issuedBy: string;
    year: number;
  }>;
  harvesting?: {
    season: string;
    method: string;
    bestPractices: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Honey {
  _id: string;
  name: string;
  type: 'raw' | 'processed' | 'comb' | 'creamed';
  flowerSource: string[];
  description: string;
  region: string;
  benefits: string[];
  nutritionalInfo?: {
    calories?: number;
    sugar?: number;
    minerals?: string[];
    vitamins?: string[];
  };
  quality: {
    purity: number;
    moisture: number;
    color?: string;
  };
  certifications?: Array<{
    name: string;
    issuedBy: string;
    year: number;
    verificationUrl?: string;
  }>;
  packaging: Array<{
    size: {
      value: number;
      unit: string;
    };
    price: number;
    available: boolean;
  }>;
  harvestInfo?: {
    date: string;
    season: string;
    method: string;
  };
  storage?: {
    recommendations: string[];
    shelfLife: string;
    temperature: string;
  };
  image?: string;
  rating: number;
  reviews?: Review[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Workout {
  _id: string;
  name: string;
  description: string;
  type: 'traditional' | 'modern' | 'hybrid';
  category: 'strength' | 'cardio' | 'flexibility' | 'balance' | 'meditation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: {
    value: number;
    unit: 'minutes' | 'hours';
  };
  exercises: Array<{
    name: string;
    description: string;
    sets?: number;
    reps?: number;
    duration?: {
      value: number;
      unit: string;
    };
    image?: string;
    video?: string;
    equipment?: string[];
    modifications?: Array<{
      level: string;
      description: string;
    }>;
  }>;
  equipment?: string[];
  targetMuscles?: string[];
  benefits: string[];
  precautions?: string[];
  trainer: Personnel | string;
  image?: string;
  video?: string;
  calories?: number;
  rating: number;
  reviews?: Review[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Personnel {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: 'traditional-healer' | 'nutritionist' | 'fitness-trainer' | 'admin';
  specialization: string;
  certifications?: Array<{
    name: string;
    issuedBy: string;
    year: number;
    verificationUrl?: string;
  }>;
  experience: number;
  location?: {
    region: string;
    city: string;
    address?: string;
  };
  availability?: Array<{
    day: string;
    slots: Array<{
      startTime: string;
      endTime: string;
    }>;
  }>;
  rating: number;
  reviews?: Review[];
  isVerified: boolean;
  profileImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  _id?: string;
  user: User | string;
  rating: number;
  comment: string;
  date?: string;
}

export interface CartItem {
  productType: 'meal' | 'herb' | 'honey' | 'workout';
  productId: string;
  product: Meal | Herb | Honey | Workout;
  quantity: number;
  price?: number;
  addedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}

export interface SearchResults {
  meals: Meal[];
  herbs: Herb[];
  honey: Honey[];
  workouts: Workout[];
  personnel: Personnel[];
}

