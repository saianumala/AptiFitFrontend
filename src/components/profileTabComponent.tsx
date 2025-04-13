import { ProfileForm } from "./profileForm";
// import { useAuth } from "@/customHooks/useAuth";
import {
  userPreferencesState,
  userState,
  bodyMetricsState,
} from "@/recoilStore/recoilAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";

export default function ProfileTab() {
  // const { user } = useAuth();
  const [preferences, setPreferences] = useRecoilState(userPreferencesState);
  const [bodyMetrics, setBodyMetrics] = useRecoilState(bodyMetricsState);
  const currentUser = useRecoilValue(userState);
  console.log(bodyMetrics);
  // Initialize state when user data is available
  useEffect(() => {
    if (currentUser?.userPreferences) {
      setPreferences(currentUser.userPreferences);
    }
    if (currentUser?.bodyMetrics) {
      setBodyMetrics(currentUser.bodyMetrics);
      console.log(bodyMetrics);
    }
  }, [currentUser]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Profile & Settings</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-4">Personal Information</h3>
          <ProfileForm initialData={preferences!} loading={false} />
        </div>

        <div>
          <h3 className="font-semibold mb-4">Body Metrics History</h3>
          {bodyMetrics && bodyMetrics.length > 0 ? (
            <div className="space-y-4">
              {bodyMetrics.map((metric, index) =>
                metric ? (
                  <div key={index} className="p-4 border rounded-lg">
                    <p>BMI: {metric.bmi}</p>
                    <p>Body Fat: {metric.bodyFatPercentage}%</p>
                    <p>Muscle Mass: {metric.muscleMass}kg</p>
                    <p className="text-sm text-gray-500">
                      {new Date(metric.createdAt || "").toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p>No body metrics recorded yet</p>
                )
              )}
            </div>
          ) : (
            <p>No body metrics recorded yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
