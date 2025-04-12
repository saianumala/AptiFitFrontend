import { Question } from "@/utils/typesInterface";
import { SkipForward } from "lucide-react";
import { NumberWithUnitInput } from "./numberUnitInputSelectionComponent";
import { CalendarInput } from "./calendarInputComponent";
import { TextInput } from "./textInputComponent";
import { RadioInput } from "./radioInputGroup";

interface FormQuestionProps {
  question: Question;
  onSkip: () => void;
  value: any;
  onChange: (value: any) => void;
  touched: boolean;
  onTouch: () => void;
}

// Form Question Component
export const FormQuestion: React.FC<FormQuestionProps> = ({
  question,
  onSkip,
  value,
  onChange,
  touched,
  onTouch,
}) => {
  // Determine if the field has an error
  const hasError =
    question.required &&
    touched &&
    (value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0));

  const handleFocus = () => {
    if (!touched) {
      onTouch();
    }
  };

  // Handlers for different input types
  const handleNumberChange = (newValue: string, unit: string) => {
    onChange({ value: newValue, unit });
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {question.title}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        {!question.required && (
          <button
            onClick={onSkip}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <span className="mr-1">Skip</span>
            <SkipForward size={16} />
          </button>
        )}
      </div>

      {question.description && (
        <p className="text-gray-600 mb-4 text-sm">{question.description}</p>
      )}

      <div onFocus={handleFocus}>
        {question.inputType === "radio" && (
          <RadioInput
            options={question.options}
            selection={question.selection}
            value={value || (question.selection === "multi" ? [] : "")}
            onChange={onChange}
            hasError={hasError}
            disabled={question.isDisabled}
          />
        )}

        {/* {question.inputType === "calendar" && (
          <CalendarInput
            value={value || ""}
            onChange={onChange}
            hasError={hasError}
          />
        )} */}

        {question.inputType === "number" && (
          <NumberWithUnitInput
            options={question.options}
            value={value?.value || ""}
            unit={value?.unit || question.options[0]}
            onChange={handleNumberChange}
            hasError={hasError}
            isDisabled={question.isDisabled}
          />
        )}

        {question.inputType === "text" && (
          <TextInput
            value={value || ""}
            onChange={onChange}
            hasError={hasError}
            placeholder="Enter details here..."
            isDisabled={question.isDisabled}
          />
        )}
      </div>

      {!question.required && (
        <div className="mt-4 text-xs text-gray-400 italic">
          This question is optional. You can skip if you prefer not to answer.
        </div>
      )}
    </div>
  );
};
