import { useState, useEffect, useRef } from "react";
import MealCard from "../mealCard";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-hot-toast";

import {
  todayMealPlanSelector,
  consumedMealsByDateSelector,
  dietAdviceSelector,
  ConsumedMeal,
  MealDetails,
  mealPlanState,
  consumedMealsState,
} from "@/recoilStore/recoilAtoms";
import MacroSummary from "../macroSummary";
import { Camera, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { saveUserMeal } from "@/lib/api";
import { format, addDays, subDays, isSameDay, parseISO } from "date-fns";

interface MealTrackingData {
  id: string;
  date: string;
  mealType: string;
  followedPlan: boolean;
  image?: string;
  description?: string;
  name?: string;
  ingredients?: string;
  calories?: number;
  protein?: string;
  details?: MealDetails;
}

// Meal time windows configuration - can be loaded from settings or API
const MEAL_TIME_WINDOWS: Record<string, { start: number; end: number }> = {
  breakfast: { start: 6, end: 10 }, // 6AM - 10AM
  lunch: { start: 11, end: 14 }, // 11AM - 2PM
  dinner: { start: 17, end: 21 }, // 5PM - 9PM
  snack: { start: 10, end: 22 }, // 10AM - 10PM (flexible)
};

// Standard meal types in preferred display order
const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"];

export default function DietTab() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [trackingData, setTrackingData] = useState<MealTrackingData | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [mealsForDisplay, setMealsForDisplay] = useState<any>();
  const setMealPlan = useSetRecoilState(mealPlanState);
  const setConsumedMeals = useSetRecoilState(consumedMealsState);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Recoil state
  const todaysMealPlan = useRecoilValue(todayMealPlanSelector);
  // const allMealPLans = useRecoilValue(mealPlanState);
  const mealsByDate = useRecoilValue(consumedMealsByDateSelector);
  const dietAdvice = useRecoilValue(dietAdviceSelector);
  // console.log("meal plans", allMealPLans);
  // console.log("todaysMealPlan:", todaysMealPlan);
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTrackMeal = (mealType: string, followedPlan: boolean) => {
    const type =
      mealType === "breakfast"
        ? "breakfast"
        : mealType === "lunch"
        ? "lunch"
        : mealType === "snack"
        ? "snack"
        : "dinner";
    // console.log(mealType);
    // console.log(type);

    const trackingMeal: any =
      type &&
      todaysMealPlan?.meals?.find((meal: any) => meal?.type === type && meal);
    setTrackingData({
      id: trackingMeal?.id || "",
      date: new Date().toISOString(),
      mealType,
      followedPlan,
    });

    if (!followedPlan) {
      fileInputRef.current?.click();
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!trackingData) return;
    // console.log("target element", e.target);
    try {
      setLoading(true);
      // console.log(trackingData);
      if (trackingData.followedPlan) {
        // User consumed the meal as planned - hit the "confirm-consumption" endpoint
        const response = await fetch(
          `${import.meta.env.VITE_BACKENDURL}/api/meal-plans/track-planned`,
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              mealId: trackingData.id,
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const mealConsumtionResponse = await response.json();

          console.log(mealConsumtionResponse);
          throw new Error("Failed to save meal data");
        }
        const mealConsumtionResponse = await response.json();
        console.log(mealConsumtionResponse);
        setMealPlan((prevPlans) => {
          const planToUpdate = prevPlans.find(
            (plan) =>
              new Date(plan.date).getTime() ===
              new Date(mealConsumtionResponse.date).getTime()
          );
          const otherPlans = prevPlans.filter(
            (plan) =>
              new Date(plan.date).getTime() !==
              new Date(mealConsumtionResponse.date).getTime()
          );

          if (!planToUpdate) return [...otherPlans]; // or return prevPlans

          return [planToUpdate, ...otherPlans];
        });
        setConsumedMeals((prevConsumedMeals) => {
          const consumedMeals = [
            ...prevConsumedMeals,
            {
              ...mealConsumtionResponse.consumedMeal,
              time: new Date(mealConsumtionResponse.consumedMeal.time),
              createdAt: new Date(
                mealConsumtionResponse.consumedMeal.createdAt
              ),
            },
          ];

          return consumedMeals;
        });
      } else {
        if (!trackingData.followedPlan && !trackingData.name) {
          alert("Please provide a name for your meal.");
          return;
        }
        if (
          !fileInputRef ||
          !fileInputRef.current ||
          !fileInputRef.current.files ||
          !fileInputRef.current.files[0]
        ) {
          alert("Please select a file");
          return;
        }
        // console.log(trackingData);
        const file = fileInputRef?.current?.files[0];
        const formData = new FormData();
        formData.append("image", file);
        formData.append(
          "mealData",
          JSON.stringify({
            name: trackingData.name,
            mealType: trackingData.mealType,
            isFromPlan: trackingData.followedPlan,
            details: {
              ingredients: trackingData.ingredients,
              description: trackingData.description,
              calories: trackingData.calories,
              protein: trackingData.protein,
            },
          })
        );

        const response = await fetch(
          `${import.meta.env.VITE_BACKENDURL}/api/meal-plans/track-adhoc`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );
        if (!response.ok) {
          const mealConsumtionResponse = await response.json();

          console.log(mealConsumtionResponse);
          throw new Error("Failed to save meal data");
        }
        const mealConsumtionResponse = await response.json();
        console.log(mealConsumtionResponse);

        setConsumedMeals((prevConsumedMeals) => {
          const consumedMeals = [
            ...prevConsumedMeals,
            {
              ...mealConsumtionResponse.meal,
              time: new Date(mealConsumtionResponse.meal.time),
              createdAt: new Date(mealConsumtionResponse.meal.createdAt),
            },
          ];

          return consumedMeals;
        });

        // console.log(jsonresponse);
      }
      console.log(trackingData);
      console.log("settint tracking data to null");

      setTrackingData(null);
      setImagePreview(null);
      setLoading(false);
      // Reset state
    } catch (error) {
      console.error("Error saving meal:", error);
      // You might want to add error handling UI here
    }
  };

  const navigateDay = (direction: "prev" | "next") => {
    setCurrentDate(
      direction === "prev" ? subDays(currentDate, 1) : addDays(currentDate, 1)
    );
  };

  const isToday = isSameDay(currentDate, new Date());
  console.log(currentDate);
  const currentDateTime = new Date(currentDate.setHours(0, 0, 0, 0)).getTime();
  console.log(currentDateTime);
  console.log(mealsByDate);
  const consumedMealsForCurrentDate = mealsByDate[currentDateTime] || [];

  console.log("consumedMealsForCurrentDate: ", consumedMealsForCurrentDate);
  // Check if current time is within a meal's time window
  const isMealTime = (mealType: string) => {
    if (!isToday) return false;

    const currentHour = currentTime.getHours();
    const timeWindow = MEAL_TIME_WINDOWS[mealType];

    if (!timeWindow) return false;
    return currentHour >= timeWindow.start;
    // && currentHour <= timeWindow.end;
  };

  // Function to get meals for display (combines plan and consumed meals)
  const transformMealPlan = (mealPlan: any) => {
    if (!mealPlan) return null;

    // Group meals by type dynamically
    const mealsByType: Record<string, any> = {};
    // console.log(mealsByType);
    // First, organize regular meals (breakfast, lunch, dinner)
    MEAL_TYPES.forEach((type, index) => {
      // console.log("iteration number: ", index);
      // console.log(type);
      const typeMeals = mealPlan.meals.filter((m: any) => m.type === type);
      // console.log(typeMeals);
      // console.log(mealsByType);
      if (typeMeals.length > 0) {
        // For meal types that typically have one entry (breakfast, lunch, dinner),
        // store the first one directly
        if (type !== "snack") {
          mealsByType[type] = typeMeals[0];
        }
        // For snacks, store the array
        else {
          mealsByType[type] = typeMeals[0];
        }
      }
    });
    // console.log(mealsByType);

    return {
      ...mealPlan,
      meals: mealsByType,
    };
  };
  const transformedMealPlan = todaysMealPlan
    ? transformMealPlan(todaysMealPlan)
    : null;
  // console.log("transformedMealPlan", transformedMealPlan);
  // Function to get meals for display
  const getMealsForDisplay = () => {
    if (!isToday || !transformedMealPlan) {
      return consumedMealsForCurrentDate;
    }
    const mealsToDisplay: Record<string, any> = {};
    // Add consumed meals first
    console.log(consumedMealsForCurrentDate);
    consumedMealsForCurrentDate.forEach((meal) => {
      // console.log(consumedMealsForCurrentDate);
      console.log(meal);
      // console.log(mealsToDisplay);
      // console.log("asfsaf");
      mealsToDisplay[meal.mealType] = {
        ...meal,
        isConsumed: true,
      };
      // console.log(mealsToDisplay);
    });

    // console.log(consumedMealsForCurrentDate);
    // console.log(mealsToDisplay);
    // console.log(transformedMealPlan);
    // Add planned meals that haven't been consumed
    const mealTypes = Object.keys(transformedMealPlan.meals);

    mealTypes.forEach((type) => {
      if (!mealsToDisplay[type]) {
        // Handle both single meal types and arrays (for snacks)
        const mealData = transformedMealPlan.meals[type];

        if (Array.isArray(mealData)) {
          // Handle multiple meals of same type (like snacks)
          if (mealData.length > 0) {
            mealData.forEach((mealItem, index) => {
              const mealKey = `${type}${index > 0 ? index : ""}`;
              if (!mealsToDisplay[mealKey]) {
                mealsToDisplay[mealKey] = {
                  ...mealItem,
                  isConsumed: mealItem.consumed,
                  isFromPlan: true,
                  mealType: type,
                };
              }
            });
          }
        } else {
          // Handle single meal types
          mealsToDisplay[type] = {
            ...mealData,
            isConsumed: mealData.consumed,
            isFromPlan: true,
            mealType: type,
          };
        }
      }
    });
    console.log(mealsToDisplay);

    // Sort meals by their typical order (breakfast, lunch, dinner, snacks)
    return Object.values(mealsToDisplay).sort((a, b) => {
      const typeA = a.mealType.split(/\d+/)[0]; // Remove numbers from type (e.g., "snack1" -> "snack")
      const typeB = b.mealType.split(/\d+/)[0];

      const indexA = MEAL_TYPES.indexOf(typeA);
      const indexB = MEAL_TYPES.indexOf(typeB);

      if (indexA === indexB) {
        // If same meal type (like multiple snacks), maintain their order
        return a.mealType.localeCompare(b.mealType);
      }
      return indexA - indexB;
    });
  };
  async function handleGenerateNewPlan() {
    const response = await fetch(
      `${import.meta.env.VITE_BACKENDURL}/api/meal-plans/generate`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          headers: { "Content-Type": "application/json" },
        }),
      }
    );
    if (!response.ok) {
      toast.error("unable to generate new plan");
      return;
    }
    const newMealPlanData = await response.json();
    console.log(newMealPlanData);
    setMealPlan((prevPlans) => {
      const otherPlans = prevPlans.filter(
        (plan) =>
          new Date(plan.date).getTime() !==
          new Date(newMealPlanData.newMealPlan.date).getTime()
      );

      return otherPlans
        ? [
            {
              ...newMealPlanData.newMealPlan,
              date: new Date(newMealPlanData.newMealPlan.date),
            },
            ...otherPlans,
          ]
        : [
            {
              ...newMealPlanData.newMealPlan,
              date: new Date(newMealPlanData.newMealPlan.date),
            },
          ];
    });
    // console.log(newMealPlanData);
    // setTod
  }
  const mealsToDisplay = getMealsForDisplay();
  // console.log(mealsToDisplay);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6">Nutrition Journal</h2>
        {isToday && (
          <button
            onClick={handleGenerateNewPlan}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Generate New Plan
          </button>
        )}{" "}
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigateDay("prev")}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={24} />
        </button>
        <h3 className="text-xl font-semibold">
          {format(currentDate, "EEEE, MMMM do")}
        </h3>
        <button
          onClick={() => navigateDay("next")}
          disabled={isToday}
          className={`p-2 rounded-full ${
            isToday ? "opacity-50" : "hover:bg-gray-100"
          }`}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {isToday && todaysMealPlan && (
        <MacroSummary
          calories={todaysMealPlan.calories}
          macros={todaysMealPlan.macronutrients}
        />
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      <div className="grid gap-6 mb-8">
        {mealsToDisplay.length > 0 ? (
          mealsToDisplay.map((meal) => (
            <div key={meal.id || meal.mealType} className="space-y-3">
              <MealCard
                mealType={meal.mealType}
                mealData={meal}
                isConsumed={meal.isConsumed}
              />
              {isToday && !meal.isConsumed && isMealTime(meal.mealType) && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleTrackMeal(meal.mealType, true)}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Check size={18} /> Consumed as Planned
                  </button>
                  <button
                    onClick={() => handleTrackMeal(meal.mealType, false)}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <X size={18} /> Modified Selection
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-2">No meals recorded</h3>
            <p className="text-gray-600">
              {isToday
                ? "Plan your meals for today."
                : "No meal data available for this date."}
            </p>
          </div>
        )}
      </div>

      {/* Tracking Modal */}
      {trackingData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {trackingData.followedPlan
                ? "Confirm Consumption"
                : "Document Alternative Selection"}
            </h3>

            {!trackingData.followedPlan && (
              <>
                <div className="mb-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Nutritional choice"
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <button
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Camera size={32} className="mb-2 text-gray-400" />
                      <span className="text-gray-500">
                        Capture Nutritional Choice
                      </span>
                    </button>
                  )}
                </div>

                {/* Meal Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Meal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={trackingData.name || ""}
                    onChange={(e) =>
                      setTrackingData({
                        ...trackingData,
                        name: e.target.value,
                      })
                    }
                    className="w-full border rounded-md p-2 text-gray-700"
                    placeholder="e.g., Chicken Caesar Salad"
                    required
                  />
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Ingredients
                  </label>
                  <textarea
                    value={trackingData.ingredients || ""}
                    onChange={(e) =>
                      setTrackingData({
                        ...trackingData,
                        ingredients: e.target.value,
                      })
                    }
                    className="w-full border rounded-md p-2 text-gray-700"
                    rows={2}
                    placeholder="e.g., Chicken breast, romaine lettuce, croutons, parmesan cheese"
                  />
                </div>

                {/* Nutritional Information */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Calories
                    </label>
                    <input
                      type="number"
                      value={trackingData.calories || ""}
                      onChange={(e) =>
                        setTrackingData({
                          ...trackingData,
                          calories: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        })
                      }
                      className="w-full border rounded-md p-2 text-gray-700"
                      placeholder="e.g., 450"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Protein
                    </label>
                    <input
                      type="text"
                      value={trackingData.protein || ""}
                      onChange={(e) =>
                        setTrackingData({
                          ...trackingData,
                          protein: e.target.value ? e.target.value : undefined,
                        })
                      }
                      className="w-full border rounded-md p-2 text-gray-700"
                      placeholder="chicken, mutton, paneer etc.,"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Additional Notes
                  </label>
                  <textarea
                    value={trackingData.description || ""}
                    onChange={(e) =>
                      setTrackingData({
                        ...trackingData,
                        description: e.target.value,
                      })
                    }
                    className="w-full border rounded-md p-2 text-gray-700"
                    rows={2}
                    placeholder="Any additional notes about your meal..."
                  />
                </div>
              </>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setTrackingData(null);
                  setImagePreview(null);
                }}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={
                  loading ||
                  (!trackingData.followedPlan &&
                    (!imagePreview || !trackingData.name))
                }
              >
                Save Nutritional Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
