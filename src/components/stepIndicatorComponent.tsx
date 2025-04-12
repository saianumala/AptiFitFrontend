import { CheckCircle } from "lucide-react";
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

// Step indicator component
export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[...Array(totalSteps)].map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  index < currentStep
                    ? "bg-green-100 text-green-600 border border-green-600"
                    : index === currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`mt-2 text-xs ${
                  index === currentStep
                    ? "text-blue-600 font-medium"
                    : "text-gray-500"
                }`}
              >
                {index === 0
                  ? "Basic Info"
                  : index === 1
                  ? "Body Metrics"
                  : index === 2
                  ? "Activity & Goals"
                  : index === 3
                  ? "Health Metrics"
                  : index === 4
                  ? "Preferences"
                  : `Step ${index + 1}`}
              </span>
            </div>

            {index < totalSteps - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  index < currentStep ? "bg-green-400" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
