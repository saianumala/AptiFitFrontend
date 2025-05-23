// import { useState } from "react";
import DietTab from "./dietTab";
import HomeTab from "./homeTab";
import Sidebar from "../sidebar/sidebarComponent";
import MotivationTab from "./motivationTab";
import HydrationSleepTab from "./hydrationSleepTab";
import WorkoutTab from "./workoutTab";
import { useRecoilValue } from "recoil";
import { activeTabAtom } from "@/recoilStore/recoilAtoms";

export default function FitnessTrackerDashboard() {
  // const [selectedDay, setSelectedDay] = useState(3); // Wednesday by default
  const activeTab = useRecoilValue(activeTabAtom);
  const renderMainContent = () => {
    switch (activeTab) {
      case "diet":
        return <DietTab />;
      case "workout":
        return <WorkoutTab />;
      case "hydration":
        return <HydrationSleepTab />;
      case "motivation":
        return <MotivationTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">{renderMainContent()}</div>
    </div>
  );
}
