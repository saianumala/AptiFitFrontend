import { useEffect, useState } from "react";
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Play,
  Dumbbell,
  Apple,
  Droplet,
  Moon,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "@/customHooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function FitnessTrackerLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
    }
  }, [isAuthenticated, loading]);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-blue-600 font-bold text-2xl">FitTracker</div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <a href="/login" className="text-gray-600 hover:text-blue-600">
                Log in
              </a>
              <a
                href="/signup"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Get Started
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-600">
                Features
              </a>

              <div className="border-t border-gray-200 my-2"></div>
              <a href="/login" className="block px-3 py-2 text-gray-600">
                Log in
              </a>
              <a href="/signup" className="block px-3 py-2 text-blue-600">
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Your Complete Fitness Journey Starts Here
              </h1>
              <p className="text-xl mb-8">
                Track your diet, workouts, sleep, and hydration all in one
                place. Achieve your fitness goals with personalized plans and
                real-time tracking.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="#how-it-works"
                  className="flex items-center justify-center border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 text-center"
                >
                  <Play size={16} className="mr-2" />
                  See How it Works
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,229.3C672,224,768,192,864,181.3C960,171,1056,181,1152,181.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need to Reach Your Fitness Goals
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Comprehensive tools designed to support your health journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Apple className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Personalized Diet Plans
              </h3>
              <p className="text-gray-600">
                Customized meal plans based on your goals, preferences, and
                dietary restrictions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Dumbbell className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adaptive Workouts</h3>
              <p className="text-gray-600">
                Exercise routines that evolve as you progress, with video
                demonstrations included.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Droplet className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hydration Tracking</h3>
              <p className="text-gray-600">
                Smart reminders and tracking to ensure you stay properly
                hydrated throughout the day.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Moon className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sleep Optimization</h3>
              <p className="text-gray-600">
                Analyze your sleep patterns and get recommendations for better
                rest and recovery.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-gray-50 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Comprehensive Dashboard
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get a complete overview of your fitness journey with our
                    intuitive dashboard. Track progress, set goals, and
                    visualize your achievements all in one place.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Goal progress tracking",
                      "Daily activity summaries",
                      "Nutrition analysis",
                      "Performance trends",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <Check size={20} className="text-green-500 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/signup"
                    className="mt-8 inline-flex items-center text-blue-600 font-medium"
                  >
                    Learn more
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
              <div className="bg-blue-600 flex items-center justify-center">
                <img
                  src="/api/placeholder/400/320"
                  alt="Dashboard Preview"
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              How FitTracker Works
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Three simple steps to transform your fitness journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Create Your Profile
              </h3>
              <p className="text-gray-600">
                Tell us about your goals, preferences, and current fitness
                level.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Get Personalized Plans
              </h3>
              <p className="text-gray-600">
                Receive customized diet and workout plans tailored just for you.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track & Improve</h3>
              <p className="text-gray-600">
                Monitor your progress and watch as your plans adapt to your
                achievements.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="/signup"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Start Your Journey
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of users who have already achieved their fitness
            goals with FitTracker's personalized approach.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100"
            >
              Start Free Trial
            </a>
            <a
              href="#features"
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-white font-bold text-2xl mb-2">
                FitTracker
              </div>
              <p className="text-sm">Your complete fitness companion</p>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>

              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06H12.315c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>

              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} FitTracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
