import { ConsumedMeal, dietAdviceState, Meal } from "@/recoilStore/recoilAtoms";
import { format, parseISO } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Utensils,
  BarChart2,
} from "lucide-react";
import { JSX, useState } from "react";
import { useRecoilValue } from "recoil";

interface MealCardProps {
  mealType: string;
  mealData: Meal | ConsumedMeal | any;
  isConsumed?: boolean;
}

// Color mappings for different meal types
const MEAL_TYPE_COLORS: Record<
  string,
  { light: string; dark: string; accent: string }
> = {
  breakfast: {
    light: "bg-blue-50",
    dark: "bg-blue-600",
    accent: "text-blue-600",
  },
  lunch: {
    light: "bg-green-50",
    dark: "bg-green-600",
    accent: "text-green-600",
  },
  dinner: {
    light: "bg-purple-50",
    dark: "bg-purple-600",
    accent: "text-purple-600",
  },
  snack: {
    light: "bg-amber-50",
    dark: "bg-amber-600",
    accent: "text-amber-600",
  },
  // Default fallback
  default: {
    light: "bg-gray-50",
    dark: "bg-gray-600",
    accent: "text-gray-600",
  },
};

export default function MealCard({ mealType, mealData }: MealCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get color theme based on meal type
  const getColorTheme = () => {
    const baseType = mealType.toLowerCase().replace(/[0-9]/g, "");
    return MEAL_TYPE_COLORS[baseType] || MEAL_TYPE_COLORS.default;
  };

  const colorTheme = getColorTheme();

  // Get meal time icon and text
  const getMealTimeDisplay = () => {
    const mealTimeMap: Record<string, { icon: JSX.Element; text: string }> = {
      breakfast: {
        icon: <Clock size={16} className="mr-1" />,
        text: "Morning",
      },
      lunch: {
        icon: <Clock size={16} className="mr-1" />,
        text: "Midday",
      },
      dinner: {
        icon: <Clock size={16} className="mr-1" />,
        text: "Evening",
      },
      snack: {
        icon: <Clock size={16} className="mr-1" />,
        text: "Anytime",
      },
    };

    const baseType = mealType.toLowerCase().replace(/[0-9]/g, "");
    return (
      mealTimeMap[baseType] || {
        icon: <Clock size={16} className="mr-1" />,
        text: "Anytime",
      }
    );
  };
  const dietAdvice = useRecoilValue(dietAdviceState);
  const mealTimeDisplay = getMealTimeDisplay();

  // Function to render nutrient information with progress bars
  const renderNutrients = (nutrientData: any) => {
    // Define maximum recommended values for visualization
    // console.log(dietAdvice);
    // console.log(nutrientData);
    const maxValues = {
      protein: dietAdvice?.macronutrients.protein.split("g ")[0], // g
      carbs: dietAdvice?.macronutrients.carbs.split("g ")[0], // g
      // @ts-ignore
      fat: dietAdvice?.macronutrients.fats.split("g ")[0], // g
    };
    // console.log(maxValues);
    const nutrients = [
      { key: "protein", label: "Protein", unit: "g" },
      { key: "carbs", label: "Carbs", unit: "g" },
      { key: "fat", label: "Fat", unit: "g" },
    ];

    return (
      <div className="space-y-3 mt-3">
        {nutrients.map(({ key, label, unit }) => {
          // Only render if the nutrient data exists or it's not optional
          if (nutrientData[key] === undefined) return null;

          const value = nutrientData[key];
          const max = maxValues[key as keyof typeof maxValues] || 100;
          // console.log(value, max);
          // console.log(typeof value, typeof max);
          const percentage = Math.min(
            Math.round((Number(value) / Number(max)) * 100),
            100
          );
          // console.log(percentage);
          return (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-xs text-gray-600">
                <span>
                  {label} {percentage}%
                </span>
                <span>
                  {value}
                  {unit}
                  <span className="text-gray-400 text-xs">
                    {" "}
                    / {max}
                    {unit}
                  </span>
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${colorTheme.dark} h-2 rounded-full transition-all duration-500 ease-in-out`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Function to render ingredients list
  const renderIngredientsList = (ingredients: string[]) => {
    if (!ingredients || ingredients.length === 0) return null;

    return (
      <div className="mt-4">
        <div className="flex items-center font-medium text-gray-700 mb-2">
          <Utensils size={18} className="mr-2" />
          <span>Ingredients</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ing: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {ing}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderMealDetails = () => {
    if (!mealData)
      return <p className="text-gray-500">No meal data available</p>;
    console.log(mealData);
    // Determine what type of meal data we're dealing with
    const isPlannedMeal = mealData.isFromPlan;
    const isConsumedMeal = mealData.isConsumed;
    console.log(isConsumedMeal);
    console.log(isPlannedMeal);
    // Get the appropriate data source for nutrients and other info
    const nutrientSource = isConsumedMeal ? mealData : mealData;
    // console.log(nutrientSource);
    const ingredients = isPlannedMeal
      ? mealData.ingredients
      : isConsumedMeal && mealData
      ? mealData.ingredients
      : [];
    // console.log(ingredients);
    // Render status badge
    const renderStatus = () => {
      if (isPlannedMeal && mealData.isConsumed) {
        let createdAtDate: Date | null = null;

        if (typeof mealData.createdAt === "string") {
          try {
            createdAtDate = parseISO(mealData.createdAt);
            if (isNaN(createdAtDate.getTime())) createdAtDate = null;
          } catch (err) {
            createdAtDate = null;
          }
        } else if (mealData.createdAt instanceof Date) {
          createdAtDate = mealData.createdAt;
        }

        return (
          <div className="flex items-center text-green-600 text-sm mt-3 bg-green-50 px-3 py-1 rounded-full w-fit">
            <span className="mr-1">✓</span>{" "}
            {createdAtDate ? (
              <>Consumed at {format(createdAtDate, "h:mm a")}</>
            ) : (
              <>Consumed</>
            )}
          </div>
        );
      } else if (isPlannedMeal) {
        return (
          <div className="flex items-center text-gray-500 text-sm mt-3 bg-gray-50 px-3 py-1 rounded-full w-fit">
            <Clock size={14} className="mr-1" /> Scheduled
          </div>
        );
      } else if (isConsumedMeal) {
        return (
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="flex items-center text-green-600 text-sm bg-green-50 px-3 py-1 rounded-full">
              <span className="mr-1">✓</span> Consumed
            </div>
            {mealData.isFromPlan ? (
              <div className="flex items-center text-blue-600 text-sm bg-blue-50 px-3 py-1 rounded-full">
                Followed plan
              </div>
            ) : (
              <div className="flex items-center text-amber-600 text-sm bg-amber-50 px-3 py-1 rounded-full">
                Custom selection
              </div>
            )}
          </div>
        );
      }
      return null;
    };

    return (
      <>
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium text-gray-900 text-lg">
              {mealData.name || (isConsumedMeal ? "Custom meal" : "Unknown")}
            </h4>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              {mealTimeDisplay.icon}
              <span>{mealTimeDisplay.text}</span>
            </div>
          </div>

          {nutrientSource && nutrientSource.calories !== undefined && (
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">
                {nutrientSource.calories}
              </div>
              <div className="text-xs text-gray-500">calories</div>
            </div>
          )}
        </div>

        {mealData.description && (
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">
            {mealData.description}
          </p>
        )}

        {renderStatus()}

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {nutrientSource && (
              <div className="mb-4">
                <div className="flex items-center font-medium text-gray-700 mb-2">
                  <BarChart2 size={18} className="mr-2" />
                  <span>Nutritional Information</span>
                </div>
                {renderNutrients(nutrientSource)}
              </div>
            )}

            {renderIngredientsList(ingredients)}
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mt-4 w-full flex items-center justify-center p-2 rounded-md ${colorTheme.light} ${colorTheme.accent} hover:bg-opacity-80 transition-all duration-150`}
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} className="mr-1" />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1" />
              <span>View Details</span>
            </>
          )}
        </button>
      </>
    );
  };

  return (
    <div
      className={`rounded-xl overflow-hidden border shadow-sm bg-white hover:shadow-md transition-shadow duration-200`}
    >
      <div
        className={`p-3 ${colorTheme.dark} text-white flex items-center justify-between`}
      >
        <h3 className="font-semibold text-lg capitalize flex items-center">
          <Utensils size={18} className="mr-2" />
          {mealType}
        </h3>
        {mealData.isConsumed && (
          <span className="text-xs text-black bg-white bg-opacity-30 px-2 py-1 rounded-full">
            Consumed
          </span>
        )}
      </div>
      <div className="p-4">{renderMealDetails()}</div>
    </div>
  );
}
