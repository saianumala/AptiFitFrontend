import { CheckCircle, ChevronRight, Dumbbell } from "lucide-react";

// Introduction component
export const IntroductionScreen: React.FC<{ onStart: () => void }> = ({
  onStart,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg text-center">
        <div className="flex justify-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <Dumbbell className="h-16 w-16 text-blue-600" />
          </div>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold text-gray-900">
          Welcome to Your Fitness Journey
        </h1>

        <p className="mt-4 text-xl text-gray-600">
          You're about to create your personalized fitness profile
        </p>

        <div className="mt-6 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            What you'll need to provide:
          </h2>
          <ul className="text-left space-y-2 mt-3">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Basic information about yourself</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Your current fitness level and activity habits</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Your fitness goals and preferences</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>
                Optional health metrics for more personalized recommendations
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-6 text-gray-600">
          <p className="mb-4">
            Based on your answers, we'll create a custom fitness plan tailored
            to your unique needs and goals.
          </p>
          <p className="text-sm">
            Your information is confidential and will only be used to generate
            your personalized fitness recommendations.
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={onStart}
            className="group relative w-full flex justify-center py-4 px-8 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          >
            <span className="flex items-center">
              Start My Fitness Profile
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          This questionnaire takes approximately 5-7 minutes to complete.
        </p>
      </div>
    </div>
  );
};
