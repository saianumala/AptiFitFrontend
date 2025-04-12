import {
  Home,
  Apple,
  Dumbbell,
  Droplet,
  Moon,
  Award,
  RefreshCw,
} from "lucide-react";
import SidebarItem from "./sidebarItemComponent";

export default function Sidebar() {
  const menuItems = [
    { id: "/", icon: Home, label: "Dashboard" },
    { id: "diet", icon: Apple, label: "Diet Plan" },
    { id: "workout", icon: Dumbbell, label: "Workout Plan" },
    { id: "hydration", icon: [Droplet, Moon], label: "Hydration & Sleep" },
    { id: "motivation", icon: Award, label: "Motivation" },
    { id: "recovery", icon: RefreshCw, label: "Recovery" },
  ];

  return (
    <div className="w-20 md:w-64 bg-white shadow">
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold hidden md:block">FitTracker</h1>
        <h1 className="text-xl font-bold md:hidden">FT</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </nav>
    </div>
  );
}
