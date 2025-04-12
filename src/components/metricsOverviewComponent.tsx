import { bodyMetricsSelector } from "@/recoilStore/recoilAtoms";
import { useRecoilValue } from "recoil";

export default function MetricsOverview() {
  const metrics = useRecoilValue(bodyMetricsSelector);
  const { bmi, bodyFatPercentage, tdee } = metrics?.[metrics.length - 1] || {
    bmi: 0,
    bodyFat: 0,
    tdee: 0,
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-1">BMI</h3>
        <p className="text-2xl font-bold">{bmi?.toFixed(1) || "--"}</p>
        <p className="text-sm text-gray-600">
          {bmi
            ? bmi < 18.5
              ? "Underweight"
              : bmi < 25
              ? "Normal"
              : bmi < 30
              ? "Overweight"
              : "Obese"
            : "No data"}
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-1">Body Fat</h3>
        <p className="text-2xl font-bold">
          {bodyFatPercentage ? `${bodyFatPercentage.toFixed(1)}%` : "--"}
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-1">Daily Energy</h3>
        <p className="text-2xl font-bold">
          {tdee ? `${Math.round(tdee)} kcal` : "--"}
        </p>
      </div>
    </div>
  );
}
