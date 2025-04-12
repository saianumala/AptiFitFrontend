import React from "react";

type Macronutrients = {
  protein: string;
  carbs: string;
  fat: string;
};

type MacroSummaryProps = {
  calories?: number;
  macros?: Macronutrients;
};

const MacroSummary: React.FC<MacroSummaryProps> = ({ calories, macros }) => {
  if (!macros || !calories) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Nutrition Summary</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-gray-700">Total Calories</h4>
          <p className="text-2xl font-bold text-indigo-600">{calories} kcal</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Protein</span>
            <span className="font-medium">{macros.protein}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Carbohydrates</span>
            <span className="font-medium">{macros.carbs}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fat</span>
            <span className="font-medium">{macros.fat}g</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroSummary;
