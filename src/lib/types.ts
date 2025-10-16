// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  createdAt: string;
  plan: PlanType;
}

export type PlanType = "free" | "pro" | "elite";

export interface PlanLimits {
  messagesPerDay: number;
  imagesPerDay: number;
  canExportPdf: boolean;
  historyDays: number;
  priority: boolean;
  macroTracking: boolean;
}

// Chat and Message Types
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  timestamp: string;
  feedback?: "positive" | "negative";
  feedbackNote?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

// Usage Tracking Types
export interface DailyUsage {
  userId: string;
  date: string;
  messagesUsed: number;
  imagesUsed: number;
  resetAt: string;
}

// Nutrition and Health Types
export interface NutritionAnalysis {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  ingredients: string[];
  warnings?: string[];
  suggestions?: string[];
}

export interface MealPlan {
  id: string;
  userId: string;
  name: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  createdAt: string;
}

export interface Meal {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  time?: string;
  nutrition: NutritionAnalysis;
  imageUrl?: string;
}

// Training Types
export interface WorkoutPlan {
  id: string;
  userId: string;
  name: string;
  exercises: Exercise[];
  duration: number; // in minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  duration?: number; // in seconds
  rest?: number; // in seconds
  notes?: string;
  videoUrl?: string;
}

// Progress Tracking Types
export interface UserProgress {
  userId: string;
  date: string;
  weight?: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    legs?: number;
  };
  photos?: string[];
  notes?: string;
}

// Subscription Types
export interface Subscription {
  id: string;
  userId: string;
  plan: PlanType;
  status: "active" | "cancelled" | "expired" | "past_due";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ChatStreamResponse {
  delta: string;
  done: boolean;
}

export interface ImageAnalysisResponse {
  type: "meal" | "label" | "workout" | "progress";
  description: string;
  nutrition?: NutritionAnalysis;
  suggestions: string[];
  warnings?: string[];
}

// Constants
export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    messagesPerDay: 10,
    imagesPerDay: 3,
    canExportPdf: false,
    historyDays: 7,
    priority: false,
    macroTracking: false,
  },
  pro: {
    messagesPerDay: 200,
    imagesPerDay: 30,
    canExportPdf: true,
    historyDays: 365,
    priority: true,
    macroTracking: true,
  },
  elite: {
    messagesPerDay: 1000,
    imagesPerDay: 100,
    canExportPdf: true,
    historyDays: 999999,
    priority: true,
    macroTracking: true,
  },
};

export const PLAN_PRICES = {
  pro: {
    monthly: 9.99,
    yearly: 89.99,
  },
  elite: {
    monthly: 19.99,
    yearly: 179.99,
  },
};
