import {
  // bodyMetricsSelector,
  userPreferencesSelector,
} from "@/recoilStore/recoilAtoms";
import DashboardCard from "../cardComponent";
import MetricsOverview from "../metricsOverviewComponent";
import { useRecoilValue } from "recoil";
import { Activity, Dumbbell, Target, Droplet, Moon } from "lucide-react";

export default function HomeTab() {
  const preferences = useRecoilValue(userPreferencesSelector);
  // const metrics = useRecoilValue(bodyMetricsSelector);
  // const latestMetrics = metrics ? metrics[metrics.length - 1] : null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <MetricsOverview />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <DashboardCard
          title="Activity Level"
          value={preferences?.activityLevel}
          Icon={Activity}
        />

        <DashboardCard
          title="Workout Preference"
          value={preferences?.preferredWorkoutType}
          Icon={Dumbbell}
        />

        <DashboardCard
          title="Health Goal"
          value={preferences?.healthGoalFocus}
          Icon={Target}
        />

        <DashboardCard
          title="Water Intake"
          value={`${preferences?.waterIntake} litres/day`}
          Icon={Droplet}
        />

        <DashboardCard
          title="Coaching Style"
          value={preferences?.coachingIntensity}
          Icon={Target}
        />

        <DashboardCard title="Sleep Target" value="7-9 hours" Icon={Moon} />
      </div>
    </div>
  );
}
