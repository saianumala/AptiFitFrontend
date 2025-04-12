import { atom, selector } from "recoil";

// Types definitions
export interface User {
  userId: string;
  email: string;
  fullName: string;
  firstLogin: boolean;
  userPreferences: UserPreferences;
  bodyMetrics: BodyMetrics[];
  DietAdvice: DietAdvice[];
  WorkoutAdvice: WorkoutAdvice[];
  SleepAdvice: SleepAdvice[];
  HydrationAdvice: HydrationAdvice[];
  MotivationAdvice: MotivationAdvice[];
}

export interface UserPreferences {
  id: string;
  userId: string;
  gender: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  waistCircumference: number | null;
  neckCircumference: number | null;
  hip: number | null;
  waterIntake: number | null;
  cuisine: string;
  activityLevel: string;
  preferredWorkoutType: string;
  healthGoalFocus: string;
  dietaryRestrictions: string | null;
  wakeUpTime: string | null;
  sleepTime: string | null;
  sleepQuality: string | null;
  sleepDuration: number | null;
  stepsDaily: number | null;
  heartRate: number | null;
  caloriesBurned: number | null;
  coachingIntensity: string;
  motivationStyle: string;
  notificationFrequency: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BodyMetrics {
  id: string;
  userId: string;
  bmi: number;
  bmr: number;
  tdee: number;
  bodyFatPercentage: number;
  muscleMass: number;
  boneMass: number;

  createdAt?: string;
  updatedAt?: string;
}
interface Exercise {
  id?: string;
  workoutId: string;
  name: string;
  sets: string;
  reps: string;
  restTime: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}
interface workout {
  id: string;
  workoutAdviceId: string;
  time: string;
  date: Date;
  type: string;
  duration: number;
  order: number;
  targetMuscles: string[];
  Exercise: Exercise[];
  createdAt?: string;
  updatedAt?: string;
}
export interface WorkoutAdvice {
  id: string;
  userId: string;
  summary: string;
  frequency: string;
  type: string;
  active: boolean;
  workouts: workout[];
}

export interface Macronutrients {
  fat: string;
  carbs: string;
  protein: string;
}

export interface DietAdvice {
  id: string;
  userId: string;
  summary: string;
  calories: number;
  macronutrients: Macronutrients;
  recommendations: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface MealDetails {
  fat: number;
  carbs: number;
  fiber: number;
  sugar: number;
  sodium: number;
  protein: number;
  calories: number;
  ingredients: string[];
}

export interface ConsumedMeal {
  id: string;
  userId: string;
  mealType: string;
  name?: string;
  time: Date;
  description?: string;
  calories?: Number;
  protein?: Number;
  carbs?: Number;
  fat?: Number;
  fiber?: Number;
  sugar?: Number;
  sodium?: Number;
  ingredients: string[];
  preparation?: string;
  details: any;
  isFromPlan: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  imageUrl?: string;
  preparationTime?: number;
  instructions?: string[];
}

export interface MealPlanItem {
  id: string;
  userId: string;
  date: string;
  meals?: [];
  calories: number;
  macronutrients: Macronutrients;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id?: string;
  userId?: string;
  title?: string;
  message?: string;
  type?: string;
  referenceId?: string;
  actions?: any | null;
  read?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HydrationAdvice {
  id: string;
  userId: string;
  summary: string;
  current: {
    amount: number | null;
    unit: string;
  };
  target: {
    min: number;
    optimal: number;
    max: number;
  };
  progress: number;
  adjustment: string;
  recommendations: {
    timing: string[];
    quality: string[];
  };
  createdAt: Date;
}

export interface SleepAdvice {
  id: string;
  userId: string;
  summary: string;
  current: {
    duration: number | null;
    quality: number | null;
  };
  target: {
    duration: number;
    windows: {
      bedtime: string;
      wakeup: string;
    };
  };
  improvement: {
    plan: string[];
    environment: string[];
  };
  recovery: string[];
  createdAt: Date;
}

export interface MotivationAdvice {
  id: string;
  userId: string;
  summary: string;

  strategies: {
    immediate: string[];
    longTerm: string[];
  };
  boosters: string[];
  recovery: string[];
  createdAt: Date;
}

export interface RecoveryAction {
  id: string;
  userId: string;
  sourceType: string;
  deviations: Array<{
    [key: string]: {
      direction: string;
      percentage: number;
    };
  }>;
  actions: {
    workout: string[];
    immediate: string[];
    nextMealAdjustments: {
      decrease: string[];
      increase: string[];
    };
  };
  status: string;
  completedAt: string | null;
  consumedMealId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DailyNutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  token: string | null;
}

// UI State
export const showWelcomeSlide = atom({
  key: "showWelcomeSlide",
  default: true,
});

export const activeTabAtom = atom({
  key: "activeTabAtom",
  default: "home",
});

// User Profile
export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

// User Preferences
export const userPreferencesState = atom<UserPreferences | null>({
  key: "userPreferencesState",
  default: null,
});

// Selectors for user data
export const userPreferencesSelector = selector<UserPreferences | null>({
  key: "userPreferencesSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user?.userPreferences || null;
  },
});

export const bodyMetricsSelector = selector<BodyMetrics[] | null>({
  key: "bodyMetricsSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user?.bodyMetrics || null;
  },
});

export const dietAdviceSelector = selector<DietAdvice[] | null>({
  key: "dietAdviceSelector",
  get: ({ get }) => {
    const user = get(userState);
    const dietAdvice = user?.DietAdvice || get(dietAdviceState);
    return Array.isArray(dietAdvice) ? dietAdvice : null;
  },
});

export const workoutAdviceSelector = selector<WorkoutAdvice[] | null>({
  key: "workoutAdviceSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user?.WorkoutAdvice || null;
  },
});

export const sleepAdviceSelector = selector<SleepAdvice[] | null>({
  key: "sleepAdviceSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user?.SleepAdvice || null;
  },
});

export const hydrationAdviceSelector = selector<HydrationAdvice[] | null>({
  key: "hydrationAdviceSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user?.HydrationAdvice || null;
  },
});

export const motivationAdviceSelector = selector<MotivationAdvice[] | null>({
  key: "motivationAdviceSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user?.MotivationAdvice || null;
  },
});

// Body Metrics
export const bodyMetricsState = atom<BodyMetrics[]>({
  key: "bodyMetricsState",
  default: [],
});

// Latest Body Metrics
export const latestBodyMetricsState = atom<BodyMetrics | null>({
  key: "latestBodyMetricsState",
  default: null,
});

// Workout Advice
export const workoutAdviceState = atom<WorkoutAdvice | null>({
  key: "workoutAdviceState",
  default: null,
});

// Diet Advice
export const dietAdviceState = atom<DietAdvice | null>({
  key: "dietAdviceState",
  default: null,
});

// Workout Log
export const workoutLogState = atom<any[]>({
  key: "workoutLogState",
  default: [],
});

// Meal Plan
export const mealPlanState = atom<MealPlanItem[]>({
  key: "mealPlanState",
  default: [],
});

// Today's Meal Plan Selector
export const todayMealPlanSelector = selector({
  key: "todayMealPlanSelector",
  get: ({ get }) => {
    const mealPlans = get(mealPlanState);
    console.log(mealPlans);
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const meal = mealPlans.find(
      (plan) => new Date(plan.date).getTime() === today.getTime()
    );

    return meal;
  },
});

// Notifications
export const notificationsState = atom<Notification[]>({
  key: "notificationsState",
  default: [],
});

// Unread Notifications Count
export const unreadNotificationsCountSelector = selector({
  key: "unreadNotificationsCountSelector",
  get: ({ get }) => {
    const notifications = get(notificationsState);
    return notifications.filter((notification) => !notification.read).length;
  },
});

// Sleep Advice
export const sleepAdviceState = atom<SleepAdvice | null>({
  key: "sleepAdviceState",
  default: null,
});

// Hydration Advice
export const hydrationAdviceState = atom<HydrationAdvice | null>({
  key: "hydrationAdviceState",
  default: null,
});

// Motivation Advice
export const motivationAdviceState = atom<MotivationAdvice | null>({
  key: "motivationAdviceState",
  default: null,
});

// Consumed Meals
export const consumedMealsState = atom<ConsumedMeal[]>({
  key: "consumedMealsState",
  default: [],
});

// Consumed Meals By Date Selector
export const consumedMealsByDateSelector = selector({
  key: "consumedMealsByDateSelector",
  get: ({ get }) => {
    const meals = get(consumedMealsState);
    const mealsByDate: { [key: string]: ConsumedMeal[] } = {};
    console.log(meals);
    meals.forEach((meal) => {
      console.log(meal);
      const consumedMealAt = new Date(
        new Date(meal.createdAt).setHours(0, 0, 0, 0)
      ).getTime();
      // console.log(date);
      // console.log(date.toString());
      if (!mealsByDate[consumedMealAt]) {
        mealsByDate[consumedMealAt] = [];
      }
      mealsByDate[consumedMealAt].push(meal);
    });
    console.log(mealsByDate);
    return mealsByDate;
  },
});

// Today's Consumed Meals
export const todayConsumedMealsSelector = selector({
  key: "todayConsumedMealsSelector",
  get: ({ get }) => {
    const meals = get(consumedMealsState);
    const today = new Date().toISOString();

    return meals.filter(
      (meal) => new Date(meal.createdAt).toISOString() === today
    );
  },
});

// Recovery Actions
export const recoveryActionsState = atom<RecoveryAction[]>({
  key: "recoveryActionsState",
  default: [],
});

// Pending Recovery Actions
export const pendingRecoveryActionsSelector = selector({
  key: "pendingRecoveryActionsSelector",
  get: ({ get }) => {
    const recoveryActions = get(recoveryActionsState);
    return recoveryActions.filter((action) => action.status === "PENDING");
  },
});

// Daily Nutrition Summary
export const dailyNutritionSummaryState = atom<DailyNutritionSummary>({
  key: "dailyNutritionSummaryState",
  default: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
  },
});

// Authentication State
export const authState = atom<AuthState>({
  key: "authState",
  default: {
    isAuthenticated: false,
    loading: true,
    token: null,
  },
});

export const showNotificationsAtom = atom({
  key: "showNotificationsAtom",
  default: false,
});
export const selectedNotificationAtom = atom<{
  id?: string;
  userId?: string;
  title?: string;
  message?: string;
  type?: string;
  referenceId?: string;
  actions?: any | null;
  read?: boolean;
  createdAt?: string;
  updatedAt?: string;
} | null>({
  key: "selectedNotificationAtom",
  default: null,
});
