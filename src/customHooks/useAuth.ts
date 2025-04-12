import {
  userState,
  userPreferencesState,
  bodyMetricsState,
  workoutAdviceState,
  dietAdviceState,
  workoutLogState,
  mealPlanState,
  notificationsState,
  sleepAdviceState,
  hydrationAdviceState,
  motivationAdviceState,
  consumedMealsState,
  recoveryActionsState,
} from "@/recoilStore/recoilAtoms";
import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useRecoilState(userState);
  const setPreferences = useSetRecoilState(userPreferencesState);
  const setBodyMetrics = useSetRecoilState(bodyMetricsState);
  const setWorkoutAdvice = useSetRecoilState(workoutAdviceState);
  const setDietAdvice = useSetRecoilState(dietAdviceState);
  const setWorkoutLog = useSetRecoilState(workoutLogState);
  const setMealPlan = useSetRecoilState(mealPlanState);
  const setNotifications = useSetRecoilState(notificationsState);
  const setSleepAdvice = useSetRecoilState(sleepAdviceState);
  const setHydrationAdvice = useSetRecoilState(hydrationAdviceState);
  const setMotivationAdvice = useSetRecoilState(motivationAdviceState);
  const setConsumedMeals = useSetRecoilState(consumedMealsState);
  const setRecoveryActions = useSetRecoilState(recoveryActionsState);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKENDURL}/api/user/isLoggedIn`,
          { credentials: "include" }
        );
        if (response.ok) {
          const data = await response.json();
          // console.log("Login status response:", data.user);
          setIsAuthenticated(true);
          setUser({
            userId: data.user.userId,
            email: data.user.email,
            fullName: data.user.fullName,
            firstLogin: data.user.firstLogin,
            userPreferences: data.user.userPreferences,
            bodyMetrics: data.user.bodyMetrics,
            WorkoutAdvice: data.user.WorkoutAdvice,
            DietAdvice: data.user.DietAdvice,
            SleepAdvice: data.user.SleepAdvice,
            HydrationAdvice: data.user.HydrationAdvice,
            MotivationAdvice: data.user.MotivationAdvice,
          });
          // console.log("userpreferences: ", data.user?.userPreferences);
          // console.log("meal plans", data.user.MealPlan);
          if (data.user.userPreferences) {
            setPreferences(data.user.userPreferences);
          }
          if (data.user.bodyMetrics) {
            setBodyMetrics(data.user.bodyMetrics);
          }
          if (data.user.WorkoutAdvice?.[0]) {
            setWorkoutAdvice(data.user.WorkoutAdvice[0]);
          }
          if (data.user.DietAdvice?.[0]) {
            setDietAdvice(data.user.DietAdvice[0]);
          }
          if (data.user.WorkoutLog) {
            setWorkoutLog(data.user.WorkoutLog);
          }
          if (data.user.MealPlan) {
            console.log(data.user.MealPlan);
            setMealPlan(() => {
              const plans = data.user.MealPlan.map((plan: any) => ({
                ...plan,
                date: new Date(plan.date),
              }));
              return plans;
            });
          }
          if (data.user.Notifications) {
            setNotifications(data.user.Notifications);
          }
          if (data.user.SleepAdvice?.[0]) {
            setSleepAdvice(data.user.SleepAdvice[0]);
          }
          if (data.user.HydrationAdvice?.[0]) {
            setHydrationAdvice(data.user.HydrationAdvice[0]);
          }
          if (data.user.MotivationAdvice?.[0]) {
            setMotivationAdvice(data.user.MotivationAdvice[0]);
          }
          // console.log(data.user.ConsumedMeals);
          if (data.user.ConsumedMeals) {
            setConsumedMeals(() => {
              const consumedMeal = data.user.ConsumedMeals.map(
                (consumedMeal: any) => ({
                  ...consumedMeal,
                  time: new Date(consumedMeal.time),
                  createdAt: new Date(consumedMeal.createdAt),
                })
              );
              return consumedMeal;
            });
          }
          if (data.user.RecoveryActions) {
            console.log(data.user.RecoveryActions);
            setRecoveryActions(data.user.RecoveryActions);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, user, loading };
}
