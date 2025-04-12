import { useState, useMemo } from "react";
import { workoutAdviceState } from "@/recoilStore/recoilAtoms";
import { useRecoilValue } from "recoil";
import ExerciseCard from "../exerciseCard";
import {
  CheckCircle,
  Calendar,
  Clock,
  Dumbbell,
  ChevronDown,
  ChevronUp,
  Award,
  Activity,
  BarChart2,
  User,
  AlertCircle,
  X,
} from "lucide-react";

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

interface Workout {
  id: string;
  workoutAdviceId: string;
  time: string;
  date: Date | string;
  type: string;
  duration: number;
  order: number;
  targetMuscles: string[];
  Exercise: Exercise[];
  createdAt?: string;
  updatedAt?: string;
}

interface WorkoutAdvice {
  id: string;
  userId: string;
  summary: string;
  frequency: string;
  type: string;
  active: boolean;
  workouts: Workout[];
}

export default function WorkoutTab() {
  const workoutAdvice = useRecoilValue(workoutAdviceState);
  const [completedWorkouts, setCompletedWorkouts] = useState<
    Record<string, boolean>
  >({});
  const [expandedWorkouts, setExpandedWorkouts] = useState<
    Record<string, boolean>
  >({});
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Group workouts by day of the week
  const workoutsByDay = useMemo(() => {
    if (!workoutAdvice?.workouts?.length) return {};

    return workoutAdvice.workouts.reduce(
      (acc: Record<string, Workout[]>, workout) => {
        // Get the day of the week (0-6, where 0 is Sunday)
        const date = new Date(workout.date);
        const dayNum = date.getDay();
        const days = [
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ];
        const dayName = days[dayNum];

        if (!acc[dayName]) {
          acc[dayName] = [];
        }

        acc[dayName].push({
          ...workout,
          date: new Date(workout.date), // Ensure date remains a Date object
        });
        return acc;
      },
      {}
    );
  }, [workoutAdvice]);

  // Get unique days that have workouts
  const workoutDays = useMemo(() => {
    return Object.keys(workoutsByDay);
  }, [workoutsByDay]);

  // Set default selected day if none is selected
  if (workoutDays.length > 0 && selectedDayIndex >= workoutDays.length) {
    setSelectedDayIndex(0);
  }

  const selectedDay = workoutDays[selectedDayIndex];

  interface ExpandedWorkoutsState {
    [workoutId: string]: boolean;
  }

  const toggleWorkoutExpanded = (workoutId: string): void => {
    setExpandedWorkouts((prev: ExpandedWorkoutsState) => ({
      ...prev,
      [workoutId]: !prev[workoutId],
    }));
  };

  interface CompletedWorkoutsState {
    [workoutId: string]: boolean;
  }

  const markWorkoutComplete = (
    workoutId: string,
    isCompleted: boolean
  ): void => {
    setCompletedWorkouts((prev: CompletedWorkoutsState) => ({
      ...prev,
      [workoutId]: isCompleted,
    }));
  };

  const getDayCompletionPercentage = (day: string): number => {
    const dayWorkouts: Workout[] = workoutsByDay[day] || [];
    if (dayWorkouts.length === 0) return 0;

    const completedCount: number = dayWorkouts.filter(
      (workout: Workout) => completedWorkouts[workout.id]
    ).length;

    return Math.round((completedCount / dayWorkouts.length) * 100);
  };

  const isDayComplete = (day: string): boolean => {
    const dayWorkouts = workoutsByDay[day] || [];
    if (dayWorkouts.length === 0) return false;

    return dayWorkouts.every((workout) => completedWorkouts[workout.id]);
  };

  const resetDayProgress = (day: string): void => {
    const newCompletedWorkouts = { ...completedWorkouts };
    const dayWorkouts = workoutsByDay[day] || [];

    dayWorkouts.forEach((workout) => {
      delete newCompletedWorkouts[workout.id];
    });

    setCompletedWorkouts(newCompletedWorkouts);
  };

  // Get workout type icon
  const getWorkoutTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "strength":
        return <Dumbbell className="text-blue-600" size={18} />;
      case "cardio":
        return <Activity className="text-green-600" size={18} />;
      case "hiit":
        return <BarChart2 className="text-orange-600" size={18} />;
      default:
        return <Dumbbell className="text-gray-600" size={18} />;
    }
  };

  // Get background gradient based on workout type
  const getWorkoutGradient = (type: string) => {
    switch (type.toLowerCase()) {
      case "strength":
        return "from-blue-50 to-indigo-50";
      case "cardio":
        return "from-green-50 to-emerald-50";
      case "hiit":
        return "from-orange-50 to-amber-50";
      default:
        return "from-gray-50 to-slate-50";
    }
  };

  if (!workoutAdvice)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm">
          <AlertCircle size={36} className="text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            No Workout Plan Available
          </h3>
          <p className="text-gray-600 mb-4">
            Complete your fitness assessment to get a personalized workout plan.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Take Assessment
          </button>
        </div>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 flex items-center">
        <Award className="text-blue-600 mr-2" size={24} />
        Your Workout Plan
      </h2>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm mb-8">
        <h3 className="font-semibold mb-4 text-lg flex items-center">
          <User className="text-blue-600 mr-2" size={18} />
          Program Summary
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">
              Frequency
            </p>
            <p className="font-medium text-lg">{workoutAdvice.frequency}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">
              Type
            </p>
            <p className="font-medium text-lg">{workoutAdvice.type}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">
              Status
            </p>
            <p
              className={`font-medium text-lg flex items-center ${
                workoutAdvice.active ? "text-green-600" : "text-gray-600"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full mr-2 ${
                  workoutAdvice.active ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
              {workoutAdvice.active ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
        <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">
            Summary
          </p>
          <p className="leading-relaxed">{workoutAdvice.summary}</p>
        </div>
      </div>

      {workoutDays.length > 0 ? (
        <div className="grid md:grid-cols-4 gap-6">
          {/* Day selector sidebar */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4 flex items-center">
              <Calendar className="text-blue-600 mr-2" size={18} />
              Workout Days
            </h3>
            <div className="space-y-2 bg-white p-3 rounded-lg shadow-sm">
              {workoutDays.map((day, index) => (
                <button
                  key={day}
                  onClick={() => setSelectedDayIndex(index)}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all ${
                    selectedDayIndex === index
                      ? "bg-blue-100 border-l-4 border-blue-500"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <Calendar
                      size={16}
                      className={`mr-2 ${
                        selectedDayIndex === index
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`capitalize font-medium ${
                        selectedDayIndex === index ? "text-blue-800" : ""
                      }`}
                    >
                      {day}
                    </span>
                  </div>
                  {isDayComplete(day) ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <CheckCircle size={12} className="mr-1" />
                      Done
                    </span>
                  ) : getDayCompletionPercentage(day) > 0 ? (
                    <div className="flex items-center">
                      <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${getDayCompletionPercentage(day)}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-blue-800">
                        {getDayCompletionPercentage(day)}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {workoutsByDay[day]?.length || 0} workouts
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Selected day workout */}
          <div className="md:col-span-3">
            {selectedDay && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold capitalize flex items-center">
                    {isDayComplete(selectedDay) ? (
                      <CheckCircle size={20} className="text-green-500 mr-2" />
                    ) : (
                      <Calendar size={20} className="text-blue-600 mr-2" />
                    )}
                    {selectedDay}'s Workouts
                  </h3>
                  {getDayCompletionPercentage(selectedDay) > 0 && (
                    <button
                      onClick={() => resetDayProgress(selectedDay)}
                      className="text-sm text-red-600 hover:text-red-800 bg-red-50 px-3 py-1.5 rounded-full flex items-center transition-colors hover:bg-red-100"
                    >
                      <X size={14} className="mr-1" />
                      Reset Progress
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {(workoutsByDay[selectedDay] || []).map((workout) => (
                    <div
                      key={workout.id}
                      className={`border rounded-xl overflow-hidden shadow-sm transition-all ${
                        completedWorkouts[workout.id]
                          ? "bg-green-50 border-green-200"
                          : "bg-white hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`bg-gradient-to-r ${getWorkoutGradient(
                          workout.type
                        )} px-5 py-4 border-b`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            {getWorkoutTypeIcon(workout.type)}
                            <h4 className="font-semibold text-lg ml-2">
                              {workout.type} Workout
                            </h4>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Clock size={14} className="mr-1" />
                            <span>{workout.duration} min</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                              Time
                            </div>
                            <div className="font-medium">{workout.time}</div>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                              Order
                            </div>
                            <div className="font-medium">#{workout.order}</div>
                          </div>
                        </div>

                        <div className="mb-5">
                          <div className="text-gray-500 text-xs uppercase tracking-wide mb-2">
                            Target Muscles
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {workout.targetMuscles.map((muscle, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full flex items-center transition-all hover:bg-gray-200"
                              >
                                <Dumbbell size={12} className="mr-1.5" />
                                {muscle}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Exercise details section */}
                        <div className="mt-4 border-t border-gray-100 pt-4">
                          <button
                            onClick={() => toggleWorkoutExpanded(workout.id)}
                            className="flex items-center justify-between w-full py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <span className="font-medium flex items-center">
                              <Dumbbell size={16} className="mr-2" />
                              Exercise Details
                            </span>
                            {expandedWorkouts[workout.id] ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </button>

                          {expandedWorkouts[workout.id] && (
                            <div className="mt-4 space-y-4">
                              {/* If there are exercises in the workout, display them */}
                              {workout.Exercise &&
                              workout.Exercise.length > 0 ? (
                                <ExerciseCard
                                  name={`${workout.type} Workout`}
                                  duration={workout.duration}
                                  targetMuscles={workout.targetMuscles}
                                  exerciseList={workout.Exercise}
                                  type={workout.type}
                                />
                              ) : (
                                /* Default exercise card if no exercises are defined */
                                <ExerciseCard
                                  name={`${workout.type} Workout`}
                                  duration={workout.duration}
                                  targetMuscles={workout.targetMuscles}
                                  type={workout.type}
                                />
                              )}

                              {/* Display detailed exercise breakdown if no specific exercises */}
                              {(!workout.Exercise ||
                                workout.Exercise.length === 0) && (
                                <div className="pl-4 border-l-2 border-gray-200 mt-4">
                                  <h5 className="font-medium text-gray-700 mb-3">
                                    Suggested Exercises:
                                  </h5>
                                  <ul className="space-y-3">
                                    {workout.targetMuscles.map(
                                      (muscle, idx) => (
                                        <li
                                          key={idx}
                                          className="bg-gray-50 p-4 rounded-lg hover:shadow-sm transition-all"
                                        >
                                          <div className="font-medium flex items-center">
                                            {getWorkoutTypeIcon(workout.type)}
                                            <span className="ml-2">
                                              {muscle} Exercise
                                            </span>
                                          </div>
                                          <div className="text-sm text-gray-600 mt-2 ml-6">
                                            {workout.type === "Strength"
                                              ? "3 sets x 10-12 reps, 60s rest between sets"
                                              : workout.type === "Cardio"
                                              ? `${Math.round(
                                                  workout.duration * 0.8
                                                )} minutes, moderate intensity`
                                              : "30-45 seconds per exercise, 15s rest"}
                                          </div>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="px-5 py-3 bg-gray-50 flex justify-end">
                        <button
                          onClick={() =>
                            markWorkoutComplete(
                              workout.id,
                              !completedWorkouts[workout.id]
                            )
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all ${
                            completedWorkouts[workout.id]
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          }`}
                        >
                          {completedWorkouts[workout.id] ? (
                            <>
                              <CheckCircle size={16} className="mr-2" />
                              Completed
                            </>
                          ) : (
                            "Mark as Complete"
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {!workoutsByDay[selectedDay] ||
                workoutsByDay[selectedDay].length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <Calendar
                      size={36}
                      className="text-gray-400 mx-auto mb-3"
                    />
                    <p className="text-gray-600 font-medium">
                      No workouts scheduled for {selectedDay}.
                    </p>
                    <p className="text-gray-500 mt-1">
                      This is your rest day - enjoy it!
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <Calendar size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium text-lg mb-2">
            No workouts have been scheduled yet.
          </p>
          <p className="text-gray-500 mb-6">
            Your personalized workout plan will appear here once it's created.
          </p>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Create Workout Plan
          </button>
        </div>
      )}
    </div>
  );
}
