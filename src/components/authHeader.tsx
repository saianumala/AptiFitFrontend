import { Link } from "react-router-dom";
import { Dumbbell, Apple, Droplet, Moon } from "lucide-react";
import React from "react";

interface FeatureIconProps {
  icon: React.ReactNode;
  label: string;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ icon, label }) => (
  <div className="flex items-center text-sm text-gray-500">
    {icon}
    <span className="ml-1">{label}</span>
  </div>
);

export function AuthHeader() {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="flex items-center justify-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full mr-3">
          <Dumbbell className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">FitTracker</h1>
      </Link>

      <div className="flex justify-center space-x-4">
        <FeatureIcon icon={<Apple className="h-4 w-4" />} label="Diet" />
        <FeatureIcon icon={<Dumbbell className="h-4 w-4" />} label="Workouts" />
        <FeatureIcon icon={<Droplet className="h-4 w-4" />} label="Hydration" />
        <FeatureIcon icon={<Moon className="h-4 w-4" />} label="Sleep" />
      </div>
    </div>
  );
}
