import { showWelcomeSlide } from "@/recoilStore/recoilAtoms";
import { ArrowRight } from "lucide-react";
import { useSetRecoilState } from "recoil";

export const WelcomeScreen = () => {
  const setShowWelcomeSlide = useSetRecoilState(showWelcomeSlide);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to Your Fitness Journey
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full mb-8">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Create Your Personalized Fitness Profile
        </h2>

        <p className="text-gray-600 mb-6">
          We're going to ask you some questions about your body, fitness goals,
          and preferences to create a customized workout and nutrition plan just
          for you.
        </p>

        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <span className="text-green-600 font-semibold">5</span>
            </div>
            <p className="text-sm text-gray-600">Short Steps</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <span className="text-blue-600 font-semibold">~3</span>
            </div>
            <p className="text-sm text-gray-600">Minutes</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
              <span className="text-purple-600 font-semibold">100%</span>
            </div>
            <p className="text-sm text-gray-600">Personalized</p>
          </div>
        </div>

        <button
          onClick={() => setShowWelcomeSlide(false)}
          className="px-8 py-4 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition duration-200 mx-auto"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Your data is private and used only to create your personalized fitness
        plan.
      </p>
    </div>
  );
};
