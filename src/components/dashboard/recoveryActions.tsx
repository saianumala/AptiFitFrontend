import { pendingRecoveryActionsSelector } from "@/recoilStore/recoilAtoms";
import { useState } from "react";
import { useRecoilValue } from "recoil";

export default function RecoveryActionsTab() {
  const recoveryActions = useRecoilValue(pendingRecoveryActionsSelector);
  const [expandedAction, setExpandedAction] = useState(null);

  if (!recoveryActions || recoveryActions.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-center">
          No recovery actions needed at this time.
        </p>
      </div>
    );
  }

  const toggleExpand = (actionId: any) => {
    if (expandedAction === actionId) {
      setExpandedAction(null);
    } else {
      setExpandedAction(actionId);
    }
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // const getDeviationLabel = (deviation: any) => {
  //   const [key] = Object.keys(deviation);
  //   const { direction, percentage } = deviation[key];
  //   const absPercentage = Math.abs(percentage);
  //   return `${
  //     key.charAt(0).toUpperCase() + key.slice(1)
  //   } ${direction} by ${absPercentage}%`;
  // };

  const getSourceTypeLabel = (sourceType: any) => {
    switch (sourceType) {
      case "MEAL_DEVIATION":
        return "Meal Plan Deviation";
      case "WORKOUT_MISSED":
        return "Missed Workout";
      case "SLEEP_DISRUPTION":
        return "Sleep Disruption";
      case "HYDRATION_DEFICIT":
        return "Hydration Deficit";
      default:
        return sourceType.replace(/_/g, " ");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Recovery Actions</h2>

      {recoveryActions.map((action) => (
        <div
          key={action.id}
          className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
        >
          <div
            className="p-4 flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpand(action.id)}
          >
            <div>
              <h3 className="font-semibold text-lg">
                {getSourceTypeLabel(action.sourceType)}
              </h3>
              <p className="text-sm text-gray-500">
                Created: {formatDate(action.createdAt)}
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              {expandedAction === action.id ? "Hide details" : "Show details"}
            </button>
          </div>

          {expandedAction === action.id && (
            <div className="border-t border-gray-200 p-4">
              {/* Deviations Section */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">
                  Deviations Detected:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {action.deviations.map((deviation, idx) => {
                    const [key] = Object.keys(deviation);
                    const { direction, percentage } = deviation[key];
                    const absPercentage = Math.abs(percentage);
                    const isOver = direction === "over";

                    return (
                      <div
                        key={`deviation-${idx}`}
                        className={`px-3 py-2 rounded-md ${
                          isOver
                            ? "bg-red-50 text-red-800"
                            : "bg-yellow-50 text-yellow-800"
                        }`}
                      >
                        <span className="font-medium">
                          {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                        </span>
                        <span>
                          {isOver ? "+" : "-"}
                          {absPercentage}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Immediate Actions */}
              {action.actions.immediate &&
                action.actions.immediate.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Do These Now:
                    </h4>
                    <ul className="space-y-2">
                      {action.actions.immediate.map((item, idx) => (
                        <li
                          key={`immediate-${idx}`}
                          className="flex items-start"
                        >
                          <span className="inline-flex items-center justify-center bg-blue-100 text-blue-700 h-5 w-5 rounded-full mr-2 mt-0.5 flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Workout Recommendations */}
              {action.actions.workout && action.actions.workout.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Recommended Workout:
                  </h4>
                  <ul className="space-y-2">
                    {action.actions.workout.map((item, idx) => (
                      <li key={`workout-${idx}`} className="flex items-start">
                        <span className="inline-flex items-center justify-center bg-green-100 text-green-700 h-5 w-5 rounded-full mr-2 mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Meal Adjustments */}
              {action.actions.nextMealAdjustments && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-800 mb-2">
                    For Your Next Meal:
                  </h4>

                  {action.actions.nextMealAdjustments.decrease &&
                    action.actions.nextMealAdjustments.decrease.length > 0 && (
                      <div className="mb-3">
                        <h5 className="text-sm font-medium text-red-700 mb-1">
                          Decrease:
                        </h5>
                        <ul className="pl-5 list-disc space-y-1">
                          {action.actions.nextMealAdjustments.decrease.map(
                            (item, idx) => (
                              <li key={`decrease-${idx}`}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  {action.actions.nextMealAdjustments.increase &&
                    action.actions.nextMealAdjustments.increase.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-green-700 mb-1">
                          Increase:
                        </h5>
                        <ul className="pl-5 list-disc space-y-1">
                          {action.actions.nextMealAdjustments.increase.map(
                            (item, idx) => (
                              <li key={`increase-${idx}`}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Logic to dismiss action
                  }}
                >
                  Dismiss
                </button>
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Logic to mark as completed
                  }}
                >
                  Mark as Completed
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
