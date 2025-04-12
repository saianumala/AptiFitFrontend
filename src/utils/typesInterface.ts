// Define types for our question structure
export type InputType = "radio" | "calendar" | "number" | "text";
export type SelectionType = "single" | "multi";
export type UnitOption =
  | "KG"
  | "LB"
  | "CM"
  | "FT_IN"
  | "L"
  | "ML"
  | "HR"
  | "MIN";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "veryActive";
export type WorkoutType =
  | "strength"
  | "cardio"
  | "yoga"
  | "hiit"
  | "pilates"
  | "calisthenics"
  | "sports"
  | "other";
export type CoachingIntensity = "gentle" | "balanced" | "intense";
export type MotivationStyle =
  | "supportive"
  | "challengeBased"
  | "dataDriven"
  | "communityFocused";
export type NotificationFrequency =
  | "continuous"
  | "high"
  | "medium"
  | "low"
  | "minimal";
export type DietType =
  | "standard"
  | "vegetarian"
  | "vegan"
  | "pescatarian"
  | "keto"
  | "paleo"
  | "mediterranean"
  | "lowCarb"
  | "glutenFree"
  | "dairyFree"
  | "other";

export interface Question {
  key: string;
  title: string;
  description: string;
  inputType: InputType;
  options: string[];
  selection: SelectionType;
  required: boolean;
  isDisabled?: any;
}

// Values stored for each question
export interface FormValues {
  [key: string]: string | string[] | number | Date | null;
}
export type UserPreferences = {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  waistCircumference?: number;
  waterIntake?: number;
  activityLevel:
    | "sedentary"
    | "lightly_active"
    | "active"
    | "very_active"
    | string;
  preferredWorkoutType:
    | "strength"
    | "cardio"
    | "flexibility"
    | "balance"
    | "endurance"
    | "calisthenics"
    | "hiit"
    | "yoga"
    | string;
  healthGoalFocus: string;
  dietaryRestrictions?: string;
  stepsDaily?: number;
  heartRate?: number;
  caloriesBurned?: number;
  sleepDuration?: number;
  coachingIntensity: "gentle" | "balanced" | "intense" | string;
  motivationStyle: "supportive" | "challenging" | "data_driven" | string;
  notificationFrequency:
    | "continuous"
    | "high"
    | "medium"
    | "low"
    | "minimal"
    | string;
};

export type BodyMetric = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  bmi: number | null;
  bmr: number | null;
  tdee: number | null;
  bodyFatPercentage: number | null;
  muscleMass: number | null;
  boneMass: number | null;
};

export type DietAdvice = {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  meals: {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    dietAdviceId: string;
    date: Date;
    meal: {
      breakfast: {
        dishName: string;
        healthyBeverage: string;
        totalCalories: string;
      };
      lunch: {
        dishName: string;
        healthyBeverage: string;
        totalCalories: string;
      };
      snacks: {
        dishName: string;
        healthyBeverage: string;
        totalCalories: string;
      };
      dinner: {
        dishName: string;
        healthyBeverage: string;
        totalCalories: string;
      };
    };
  }[];

  summary: string;
  calories: number;
  macronutrients: {
    protein: string;
    carbs: string;
    fat: string;
  };
  recommendations: string[];
};

export type WorkoutPlan = {
  id: string;
  frequency: string;
  type: string;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    duration?: number;
    rest?: number;
  };
  summary: string;
};
export type SleepAdvice = {
  userId: string;
  id: string;
  summary: string;
  recommendations: string[];
  target: string;
};
export type HydrationAdvice = {
  userId: string;
  id: string;
  summary: string;
  recommendations: string[];
  target: string;
};
export type MotivationAdvice = {
  userId: string;
  id: string;
  summary: string;
  tips: string[];
};
