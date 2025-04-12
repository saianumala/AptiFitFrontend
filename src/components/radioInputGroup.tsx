import { SelectionType } from "@/utils/typesInterface";
import { AlertCircle } from "lucide-react";

interface RadioInputProps {
  options: string[];
  selection: SelectionType;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  hasError: boolean;
  disabled: any;
}

// Radio Input Group
export const RadioInput: React.FC<RadioInputProps> = ({
  options,
  selection,
  value,
  onChange,
  hasError,
  disabled,
}) => {
  const handleChange = (option: string) => {
    if (selection === "multi") {
      const selectedArray = value as string[];
      if (selectedArray.includes(option)) {
        onChange(selectedArray.filter((item) => item !== option));
      } else {
        onChange([...selectedArray, option]);
      }
    } else {
      onChange(option);
    }
  };

  return (
    <div>
      <div
        className={`space-y-3 ${
          hasError ? "p-3 border border-red-300 bg-red-50 rounded-md" : ""
        }`}
      >
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type={selection === "multi" ? "checkbox" : "radio"}
              id={`option-${option.replace(/\s+/g, "-").toLowerCase()}`}
              checked={
                selection === "multi"
                  ? (value as string[]).includes(option)
                  : value === option
              }
              disabled={disabled}
              onChange={() => handleChange(option)}
              className={`w-5 h-5 ${
                selection === "multi"
                  ? "rounded text-blue-600 focus:ring-blue-500"
                  : "rounded-full text-blue-600 focus:ring-blue-500"
              }`}
            />
            <label
              htmlFor={`option-${option.replace(/\s+/g, "-").toLowerCase()}`}
              className="ml-3 text-gray-700"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      {hasError && (
        <div className="text-red-500 text-xs mt-1 flex items-center">
          <AlertCircle size={12} className="mr-1" />
          Please select an option
        </div>
      )}
    </div>
  );
};
