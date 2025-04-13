export default function ProgressBar({
  percentage,
  color = "bg-blue-500",
}: {
  percentage: string;
  color: string;
}) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className={`${color} h-3 rounded-full`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
