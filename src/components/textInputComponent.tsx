import { AlertCircle } from "lucide-react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError: boolean;
  isDisabled?: any;
}

// Text Input Component
export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "Enter details here...",
  hasError,
  isDisabled,
}) => {
  return (
    <div className="relative">
      <textarea
        className={`w-full px-4 py-3 rounded-md border ${
          hasError ? "border-red-500 bg-red-50" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-20`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={isDisabled}
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
