import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Scale,
  HeartPulse,
  Activity,
} from "lucide-react";
import React from "react";

interface MetricSummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend?: "up" | "down" | "neutral";
}

export const MetricSummaryCard: React.FC<MetricSummaryCardProps> = ({
  icon,
  title,
  value,
  trend,
}) => {
  const trendColors = {
    up: "text-red-500",
    down: "text-green-500",
    neutral: "text-gray-500",
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-white p-2 rounded-full mr-3">{icon}</div>
          <h4 className="font-medium">{title}</h4>
        </div>
        {trend && (
          <div className={`flex items-center ${trendColors[trend]}`}>
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4" />
            ) : trend === "down" ? (
              <TrendingDown className="h-4 w-4" />
            ) : null}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};
