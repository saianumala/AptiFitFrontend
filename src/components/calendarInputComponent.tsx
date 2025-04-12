import { AlertCircle, Calendar } from "lucide-react";

// Calendar Input Component
interface CalendarInputProps {
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
}

export const CalendarInput: React.FC<CalendarInputProps> = ({
  value,
  onChange,
  hasError,
}) => {
  return (
    <div className="relative">
      <input
        type="date"
        className={`w-full px-4 py-3 rounded-md border ${
          hasError ? "border-red-500 bg-red-50" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Calendar
        className="absolute right-3 top-3 text-gray-400 pointer-events-none"
        size={20}
      />
      {hasError && (
        <div className="text-red-500 text-xs mt-1 flex items-center">
          <AlertCircle size={12} className="mr-1" />
          This field is required
        </div>
      )}
    </div>
  );
};
