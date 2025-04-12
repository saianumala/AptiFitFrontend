import { AlertCircle } from "lucide-react";

interface NumberWithUnitInputProps {
  options: string[];
  value: string;
  unit: string;
  onChange: (value: string, unit: string) => void;
  hasError: boolean;
  isDisabled?: any;
}

// Number Input with Unit Selection
export const NumberWithUnitInput: React.FC<NumberWithUnitInputProps> = ({
  options,
  value,
  unit,
  onChange,
  isDisabled,
  hasError,
}) => {
  return (
    <div>
      <div className="flex">
        <input
          type="number"
          className={`w-full px-4 py-3 rounded-l-md border ${
            hasError ? "border-red-500 bg-red-50" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={value}
          onChange={(e) => onChange(e.target.value, unit)}
          placeholder="Enter value"
          disabled={isDisabled}
        />
        <div className="relative">
          <select
            className={`h-full px-4 py-3 rounded-r-md border border-l-0 ${
              hasError
                ? "border-red-500 bg-red-50"
                : "border-gray-300 bg-gray-50"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={unit}
            onChange={(e) => onChange(value, e.target.value)}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {hasError && (
        <div className="text-red-500 text-xs mt-1 flex items-center">
          <AlertCircle size={12} className="mr-1" />
          This field is required
        </div>
      )}
    </div>
  );
};
