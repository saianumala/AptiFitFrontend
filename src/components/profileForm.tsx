import { SubmitHandler, useForm } from "react-hook-form";
import {
  User,
  Ruler,
  Scale,
  HeartPulse,
  Droplet,
  Moon,
  Activity,
  Zap,
  Bell,
  Clock,
  Utensils,
} from "lucide-react";
import { SelectInput, TextInput, NumberInput } from "./formInputs";
import { Button } from "./button";
import {
  bodyMetricsState,
  UserPreferences,
  userPreferencesState,
} from "@/recoilStore/recoilAtoms";
import { useAuth } from "@/customHooks/useAuth";
import { useSetRecoilState } from "recoil";
import toast from "react-hot-toast";

interface ProfileFormProps {
  loading?: boolean;
  initialData: UserPreferences;
}

const activityLevels = [
  { value: "sedentary", label: "Sedentary (little or no exercise)" },
  {
    value: "lightly_active",
    label: "Lightly Active (light exercise 1-3 days/week)",
  },
  { value: "active", label: "Active (moderate exercise 3-5 days/week)" },
  { value: "very_active", label: "Very Active (hard exercise 6-7 days/week)" },
];

const workoutTypes = [
  { value: "strength", label: "Strength Training" },
  { value: "cardio", label: "Cardio" },
  { value: "endurance", label: "Endurance" },
  { value: "pilates", label: "Pilates" },
  { value: "hiit", label: "HIIT" },
  { value: "yoga", label: "Yoga/Pilates" },
  { value: "calisthenics", label: "Calisthenics" },
];

const coachingIntensityOptions = [
  { value: "gentle", label: "Gentle" },
  { value: "balanced", label: "Balanced" },
  { value: "intense", label: "Intense" },
];

const motivationStyleOptions = [
  { value: "supportive", label: "Supportive" },
  { value: "challenging", label: "Challenging" },
  { value: "data_driven", label: "Data-Driven" },
];

const notificationUnitOptions = [
  { value: "min", label: "Minutes" },
  { value: "hour", label: "Hours" },
];

export function ProfileForm({
  initialData,
  loading = false,
}: ProfileFormProps) {
  const setBodyMetrics = useSetRecoilState(bodyMetricsState);
  const setPreferences = useSetRecoilState(userPreferencesState);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    watch,
  } = useForm<Partial<UserPreferences>>({ defaultValues: initialData });

  const onSubmit: SubmitHandler<Partial<UserPreferences>> = (data) => {
    const changedData: Partial<any> = {};
    console.log(changedData);
    Object.keys(dirtyFields).forEach((key) => {
      const fieldName = key as keyof UserPreferences;
      const fieldValue = data[fieldName];
      if (fieldValue !== undefined) {
        switch (fieldName) {
          case "height":
            changedData.height = {
              value: Number(fieldValue),
              unit: "ft",
            };
            break;
          case "weight":
            changedData.weight = {
              value: Number(fieldValue),
              unit: "kg",
            };
            break;
          case "age":
            changedData.age = {
              value: Number(fieldValue),
              unit: "years",
            };
            break;
          case "waistCircumference":
            changedData.waistCircumference = {
              value: Number(fieldValue),
              unit: "in",
            };
            break;
          case "neckCircumference":
            changedData.neckCircumference = {
              value: Number(fieldValue),
              unit: "in",
            };
            break;
          case "hip":
            changedData.hip = {
              value: Number(fieldValue),
              unit: "in",
            };
            break;
          case "waterIntake":
            changedData.waterIntake = Number(fieldValue);
            break;
          case "sleepDuration":
            changedData.sleepDuration = Number(fieldValue);
            break;
          case "stepsDaily":
            changedData.stepsDaily = Number(fieldValue);
            break;
          case "heartRate":
            changedData.heartRate = Number(fieldValue);
            break;
          case "caloriesBurned":
            changedData.caloriesBurned = Number(fieldValue);
            break;
          case "sleepTime":
            changedData.sleepTime = fieldValue;
            break;
          case "wakeUpTime":
            changedData.wakeUpTime = fieldValue;
            break;
          default:
            changedData[fieldName] = fieldValue as any;
        }
      }
    });

    fetch(`${import.meta.env.VITE_BACKENDURL}/api/user/preferences/update`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        userPreferences: changedData,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          toast.error("failed to update");
        }
        return res.json();
      })
      .then((jsonResponse: any) => {
        reset(jsonResponse.preferences);
        setBodyMetrics([jsonResponse.bodyMetrics]);
        setPreferences(jsonResponse.preferences);
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-500" />
            Personal Information
          </h3>

          <TextInput
            label="Gender"
            name="gender"
            register={register}
            required
            error={errors.gender}
            icon={User}
          />

          <NumberInput
            label="Age"
            name="age"
            register={register}
            required
            min={13}
            max={120}
            error={errors.age}
          />
        </div>

        {/* Body Metrics */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center">
            <Scale className="h-5 w-5 mr-2 text-blue-500" />
            Body Metrics
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              label="Height (ft)"
              name="height"
              register={register}
              required
              min={4}
              max={8}
              step={0.1}
              error={errors.height}
              icon={Ruler}
            />

            <NumberInput
              label="Weight (kg)"
              name="weight"
              register={register}
              required
              min={30}
              max={300}
              step={1}
              error={errors.weight}
              icon={Scale}
            />
          </div>

          <NumberInput
            label="Waist Circumference (in)"
            name="waistCircumference"
            register={register}
            min={20}
            max={100}
            step={1}
            error={errors.waistCircumference}
          />

          <NumberInput
            label="Neck Circumference (in)"
            name="neckCircumference"
            register={register}
            min={13}
            max={25}
            step={1}
            error={errors.neckCircumference}
          />

          {initialData?.gender === "female" && (
            <NumberInput
              label="Hip (in)"
              name="hip"
              register={register}
              min={25}
              max={60}
              step={1}
              error={errors.hip}
            />
          )}
        </div>
      </div>

      {/* Activity & Fitness */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-500" />
          Activity & Fitness
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectInput
            label="Activity Level"
            name="activityLevel"
            options={activityLevels}
            register={register}
            required
            error={errors.activityLevel}
          />

          <SelectInput
            label="Preferred Workout Type"
            name="preferredWorkoutType"
            options={workoutTypes}
            register={register}
            required
            error={errors.preferredWorkoutType}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumberInput
            label="Daily Steps Goal"
            name="stepsDaily"
            register={register}
            min={1000}
            max={50000}
            step={500}
            error={errors.stepsDaily}
            icon={Activity}
          />

          <NumberInput
            label="Resting Heart Rate (bpm)"
            name="heartRate"
            register={register}
            min={40}
            max={120}
            step={1}
            error={errors.heartRate}
            icon={HeartPulse}
          />

          <NumberInput
            label="Daily Calories Burned"
            name="caloriesBurned"
            register={register}
            min={500}
            max={5000}
            step={100}
            error={errors.caloriesBurned}
            icon={Zap}
          />
        </div>
      </div>

      {/* Health Goals */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center">
          <HeartPulse className="h-5 w-5 mr-2 text-blue-500" />
          Health Goals & Nutrition
        </h3>

        <TextInput
          label="Primary Health Goal"
          name="healthGoalFocus"
          register={register}
          placeholder="e.g., Weight loss, Muscle gain, Endurance"
          error={errors.healthGoalFocus}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Dietary Restrictions"
            name="dietaryRestrictions"
            register={register}
            placeholder="e.g., Vegetarian, Gluten-free"
            error={errors.dietaryRestrictions}
          />

          <TextInput
            label="Preferred Cuisine"
            name="cuisine"
            register={register}
            placeholder="e.g., Indian, Japanese"
            error={errors.cuisine}
            icon={Utensils}
          />
        </div>
      </div>

      {/* Sleep & Hydration */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center">
          <Moon className="h-5 w-5 mr-2 text-blue-500" />
          Sleep & Hydration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NumberInput
            label="Sleep Duration (hours)"
            name="sleepDuration"
            register={register}
            min={4}
            max={12}
            step={0.5}
            error={errors.sleepDuration}
            icon={Moon}
          />

          <TextInput
            label="Bedtime"
            name="sleepTime"
            register={register}
            placeholder="HH:MM"
            error={errors.sleepTime}
            icon={Clock}
          />

          <TextInput
            label="Wake-up Time"
            name="wakeUpTime"
            register={register}
            placeholder="HH:MM"
            error={errors.wakeUpTime}
            icon={Clock}
          />
        </div>

        <NumberInput
          label="Daily Water Intake (L)"
          name="waterIntake"
          register={register}
          min={0.5}
          max={10}
          step={0.25}
          error={errors.waterIntake}
          icon={Droplet}
        />
      </div>

      {/* Coaching Preferences */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center">
          <Zap className="h-5 w-5 mr-2 text-blue-500" />
          Coaching Preferences
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectInput
            label="Coaching Intensity"
            name="coachingIntensity"
            options={coachingIntensityOptions}
            register={register}
            error={errors.coachingIntensity}
          />

          <SelectInput
            label="Motivation Style"
            name="motivationStyle"
            options={motivationStyleOptions}
            register={register}
            error={errors.motivationStyle}
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center">
          <Bell className="h-5 w-5 mr-2 text-blue-500" />
          Notification Preferences
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NumberInput
            label="Notification Frequency"
            name="notificationFrequency.value"
            register={register}
            min={1}
            max={24}
            step={1}
            error={errors.notificationFrequency}
            icon={Bell}
          />

          <SelectInput
            label="Frequency Unit"
            name="notificationFrequency.unit"
            options={notificationUnitOptions}
            register={register}
            error={errors.notificationFrequency}
          />
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" loading={loading} className="w-full md:w-auto">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
