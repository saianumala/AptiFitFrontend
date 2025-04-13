import { Dumbbell, Activity, BarChart2 } from "lucide-react";

interface ExerciseCardProps {
  name: string;
  sets?: string | number;
  reps?: string | number;
  restTime?: number;
  duration?: string | number;
  targetMuscles?: string[];
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  exerciseList?: Exercise[];
  type?: string;
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

export default function ExerciseCard({
  name,
  sets,
  reps,
  restTime,
  duration,
  targetMuscles,
  isCompleted = false,
  onToggleComplete,
  exerciseList,
  type,
}: ExerciseCardProps) {
  // Generate a gradient background color based on the workout type
  const getGradientColor = (type?: string) => {
    switch (type?.toLowerCase()) {
      case "strength":
        return "from-blue-50 to-indigo-50";
      case "cardio":
        return "from-green-50 to-emerald-50";
      case "hiit":
        return "from-orange-50 to-amber-50";
      case "flexibility":
        return "from-purple-50 to-fuchsia-50";
      default:
        return "from-gray-50 to-slate-50";
    }
  };

  // Get icon based on exercise type
  const getExerciseIcon = (exerciseType?: string) => {
    switch (exerciseType?.toLowerCase()) {
      case "strength":
        return <Dumbbell className="text-blue-600" size={16} />;
      case "cardio":
        return <Activity className="text-green-600" size={16} />;
      case "hiit":
        return <BarChart2 className="text-orange-600" size={16} />;
      default:
        return <Dumbbell className="text-gray-600" size={16} />;
    }
  };

  return (
    <div
      className={`border rounded-lg shadow-sm overflow-hidden ${
        isCompleted ? "bg-green-50 border-green-200" : "bg-white"
      }`}
    >
      <div
        className={`bg-gradient-to-r ${getGradientColor(
          type
        )} px-4 py-3 border-b`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {getExerciseIcon(type)}
            <h4 className="font-semibold text-lg ml-2">{name}</h4>
          </div>
          {onToggleComplete && (
            <button
              onClick={onToggleComplete}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                isCompleted
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {isCompleted ? "Completed" : "Mark Complete"}
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {sets && (
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">
                Sets
              </span>
              <p className="font-medium text-gray-800">{sets}</p>
            </div>
          )}
          {reps && (
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">
                Reps
              </span>
              <p className="font-medium text-gray-800">{reps}</p>
            </div>
          )}
          {restTime && (
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">
                Rest
              </span>
              <p className="font-medium text-gray-800">{restTime}s</p>
            </div>
          )}
          {duration && (
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">
                Duration
              </span>
              <p className="font-medium text-gray-800">
                {typeof duration === "number" ? `${duration} min` : duration}
              </p>
            </div>
          )}
        </div>

        {targetMuscles && targetMuscles.length > 0 && (
          <div className="mt-3">
            <div className="text-gray-500 text-xs uppercase tracking-wide mb-2">
              Target Muscles
            </div>
            <div className="flex flex-wrap gap-2">
              {targetMuscles.map((muscle, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full flex items-center transition-all hover:bg-gray-200"
                >
                  <Dumbbell size={12} className="mr-1.5" />
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Display the list of specific exercises if provided */}
        {exerciseList && exerciseList.length > 0 && (
          <div className="mt-5 pt-4 border-t border-gray-100">
            <h5 className="font-medium mb-3 text-sm text-gray-700 uppercase tracking-wide">
              Exercise Details
            </h5>
            <div className="space-y-3">
              {exerciseList.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md"
                >
                  <div className="flex items-center mb-2">
                    {getExerciseIcon(exercise.type)}
                    <div className="font-medium ml-2">{exercise.name}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white rounded p-2">
                      <span className="text-gray-500 text-xs block">Sets</span>
                      <span className="font-semibold text-sm">
                        {exercise.sets}
                      </span>
                    </div>
                    <div className="bg-white rounded p-2">
                      <span className="text-gray-500 text-xs block">Reps</span>
                      <span className="font-semibold text-sm">
                        {exercise.reps}
                      </span>
                    </div>
                    <div className="bg-white rounded p-2">
                      <span className="text-gray-500 text-xs block">Rest</span>
                      <span className="font-semibold text-sm">
                        {exercise.restTime}s
                      </span>
                    </div>
                  </div>
                  {exercise.type && (
                    <div className="text-xs mt-2 text-gray-500 flex items-center">
                      <span className="block mr-1">Type:</span>
                      <span
                        className={`px-2 py-0.5 rounded-full ${
                          exercise.type.toLowerCase() === "strength"
                            ? "bg-blue-100 text-blue-700"
                            : exercise.type.toLowerCase() === "cardio"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {exercise.type}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
