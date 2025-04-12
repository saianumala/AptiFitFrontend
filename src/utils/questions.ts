import { Question } from "./typesInterface";

// Enhanced questions with more specific wording and improved titles
export const questions: Question[] = [
  {
    key: "gender",
    title: "What is your gender?",
    description: "This helps us customize your fitness recommendations.",
    options: ["male", "female", "other", "Prefer not to say"],
    inputType: "radio",
    selection: "single",
    required: true,
    isDisabled: false,
  },
  {
    key: "age",
    title: "What is your age?",
    description:
      "Your age helps determine appropriate exercise intensity and recovery periods.",
    inputType: "number",
    options: ["years"],
    selection: "single",
    required: true,
    isDisabled: false,
  },
  {
    key: "height",
    title: "Current Height",
    description:
      "Used to calculate your BMI and personalize your workout plan.",
    inputType: "number",
    options: ["ft"],
    selection: "single",
    required: true,
    isDisabled: false,
  },
  {
    key: "weight",
    title: "Current Weight",
    description:
      "Used to calculate your calorie needs and track progress over time.",
    inputType: "number",
    options: ["kg"],
    selection: "single",
    required: true,
    isDisabled: false,
  },
  {
    key: "waistCircumference",
    title: "Waist Circumference",
    description:
      "This measurement helps assess health risks related to weight and fat distribution.",
    inputType: "number",
    options: ["in"],
    selection: "single",
    required: false,
    isDisabled: false,
  },
  {
    key: "neckCircumference",
    title: "Neck Circumference",
    description:
      "This measurement helps assess health risks related to weight and fat distribution.",
    inputType: "number",
    options: ["in"],
    selection: "single",
    required: false,
    isDisabled: false,
  },
  {
    key: "hip",
    title: "Hip Circumference",
    description:
      "This measurement helps assess health risks related to weight and fat distribution.",
    inputType: "number",
    options: ["in"],
    selection: "single",
    required: false,
    isDisabled: false,
  },
  {
    key: "waterIntake",
    title: "Daily Water Intake",
    description: "How much water do you typically consume per day?",
    inputType: "number",
    options: ["l"],
    selection: "single",
    required: false,
    isDisabled: false,
  },
  {
    key: "activityLevel",
    title: "Activity Level",
    description:
      "How active are you in your daily life outside of planned workouts?",
    options: [
      "Sedentary (Little to no exercise, desk job)",
      "Lightly_active (Light exercise 1-3 days/week)",
      "Moderate (Moderate exercise 3-5 days/week)",
      "Active (Hard exercise 6-7 days/week)",
      "Very_active (Hard daily exercise & physical job or training twice daily)",
    ],
    inputType: "radio",
    selection: "single",
    required: true,
    isDisabled: false,
  },
  {
    key: "preferredWorkoutType",
    title: "Primary Workout Type",
    description:
      "Which type of exercise do you prefer or want to focus on most?",
    options: [
      "Strength Training (weights, resistance bands)",
      "Cardio (running, cycling, swimming)",
      "Yoga (flexibility, balance, mindfulness)",
      "HIIT (high-intensity interval training)",
      "Pilates (core strength, posture)",
      "Calisthenics (bodyweight exercises)",
      "Endurance (Physical endurance and Mental endurance)",
    ],
    inputType: "radio",
    selection: "single",
    required: true,
    isDisabled: false,
  },
  {
    key: "healthGoalFocus",
    title: "Primary Fitness Goal",
    description:
      "What's the main result you want to achieve through your fitness journey?",
    options: [
      "Weight Loss (fat reduction)",
      "Muscle Building (strength and size)",
      "Endurance Improvement (stamina and cardiovascular health)",
      "Flexibility & Mobility (range of motion)",
      "Stress Management & Mental Wellbeing",
      "Overall Health Maintenance",
    ],
    inputType: "radio",
    selection: "single",
    required: true,
    isDisabled: false,
  },
  {
    key: "dietaryRestrictions",
    title: "Dietary Preferences",
    description: "What type of diet do you follow or prefer?",
    options: [
      "Standard (No specific restrictions)",
      "Vegetarian (No meat)",
      "Vegan (No animal products)",
      "Pescatarian (Vegetarian + seafood)",
      "Keto (High fat, low carb)",
      "Paleo (Whole foods based on hunter-gatherer diet)",
      "Mediterranean (Plant-based, lean proteins, healthy fats)",
      "Low Carb (Reduced carbohydrate intake)",
      "Gluten-Free (No gluten)",
      "Dairy-Free (No dairy products)",
      "Other (Additional dietary needs)",
    ],
    inputType: "radio",
    selection: "single",
    required: true,
    isDisabled: false,
  },
  {
    key: "cuisine",
    title: "cuisine",
    description: "What kind of cuisine you like?",
    inputType: "text",
    options: [],
    selection: "single",
    required: true,
    isDisabled: false,
  },
  {
    key: "stepsDaily",
    title: "Average Daily Steps",
    description:
      "Approximately how many steps do you take in a typical day? (Leave blank if unsure)",
    inputType: "number",
    options: ["steps"],
    selection: "single",
    required: false,
    isDisabled: false,
  },
  {
    key: "heartRate",
    title: "Resting Heart Rate",
    description:
      "What is your typical resting heart rate? (Leave blank if unsure)",
    inputType: "number",
    options: ["BPM"],
    selection: "single",
    required: false,
    isDisabled: false,
  },
  {
    key: "caloriesBurned",
    title: "Average Daily Calories Burned",
    description:
      "If you track this, what is your average daily calorie expenditure?",
    inputType: "number",
    options: ["calories"],
    selection: "single",
    required: false,
    isDisabled: false,
  },
  {
    key: "sleepDuration",
    title: "Average Sleep Duration",
    description: "How many hours do you typically sleep each night?",
    inputType: "number",
    options: ["HR", "MIN"],
    selection: "single",
    required: false,
    isDisabled: false,
  },
  {
    key: "coachingIntensity",
    title: "Coaching Style Preference",
    description:
      "How would you like your AI coach to guide your fitness journey?",
    options: [
      "Gentle (Supportive, gradual progression)",
      "Balanced (Moderate challenge with adequate rest)",
      "Intense (Challenging, push your limits)",
    ],
    inputType: "radio",
    selection: "single",
    required: true,
    isDisabled: false,
  },
  {
    key: "motivationStyle",
    title: "Motivation Approach",
    description: "What type of encouragement helps you perform at your best?",
    options: [
      "Supportive (Positive reinforcement, celebrating small wins)",
      "Challenging (Setting goals that push your boundaries)",
      "Data_Driven (Progress tracking, metrics, and analytics)",
    ],
    inputType: "radio",
    selection: "single",
    required: true,
    isDisabled: false,
  },
  {
    key: "notificationFrequency",
    title: "Notification Preference",
    description:
      "How frequently would you like to receive workout reminders and progress updates?",
    options: ["min", "hour"],
    inputType: "number",
    selection: "single",
    required: true,
    isDisabled: false,
  },
];
interface FormValues {
  [key: string]: string | string[] | number | Date | null;
}

export const getQuestions = (formValues: FormValues) => {
  return questions.map((question) => {
    if (question.key === "hip") {
      return {
        ...question,
        description:
          formValues.gender === "male"
            ? "You can skip this question (typically only measured for females)"
            : question.description,
        isDisabled: formValues.gender === "male",
      };
    }
    return question;
  });
};
