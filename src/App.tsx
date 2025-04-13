import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "./components/authLayout";
import { SignIn } from "./components/signin";
import { SignUp } from "./components/signup";
import { ProtectedRoute } from "./components/protectedRoute";
import { DashboardLayout } from "./components/dashboardLayout";
import HomeTab from "./components/dashboard/homeTab";
import DietTab from "./components/dashboard/dietTab";
import WorkoutTab from "./components/dashboard/workoutTab";
import ProfileTab from "./components/profileTabComponent";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HydrationSleepTab from "./components/dashboard/hydrationSleepTab";
import MotivationTab from "./components/dashboard/motivationTab";
import FitnessQuestionnaireForm from "./components/preferences";
import FitnessTrackerLanding from "./pages/landingPage";
import RecoveryActionsTab from "./components/dashboard/recoveryActions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomeTab />,
      },
      {
        path: "diet",
        element: <DietTab />,
      },
      {
        path: "workout",
        element: <WorkoutTab />,
      },
      {
        path: "hydration",
        element: <HydrationSleepTab />,
      },
      {
        path: "motivation",
        element: <MotivationTab />,
      },
      {
        path: "profile",
        element: <ProfileTab />,
      },
      {
        path: "recovery",
        element: <RecoveryActionsTab />,
      },
      // {
      //   path: "body-metrics",
      //   async lazy() {
      //     const { BodyMetricsPage } = await import(
      //       "../pages/BodyMetricsPage"
      //     );
      //     return { Component: BodyMetricsPage };
      //   },
      // },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      // {
      //   path: 'forgot-password',
      //   element: <ForgotPassword />
      // },
      // {
      //   path: 'reset-password/:token',
      //   element: <ResetPassword />
      // }
    ],
  },
  {
    path: "/preferences",
    element: (
      <ProtectedRoute>
        <FitnessQuestionnaireForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/landing",
    element: <FitnessTrackerLanding />,
  },

  // {
  //   path: "*",
  //   async lazy() {
  //     const { NotFoundPage } = await import("../pages/NotFoundPage");
  //     return { Component: NotFoundPage };
  //   },
  // },
]);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
