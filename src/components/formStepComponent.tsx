import { SelectionType } from "@/utils/typesInterface";
import { FormQuestion } from "./questionFormComponent";

type InputType = "radio" | "calendar" | "number" | "text";

interface Question {
  key: string;
  title: string;
  description: string;
  inputType: InputType;
  options: string[];
  selection: SelectionType;
  required: boolean;
  isDisabled?: boolean;
}

// Values stored for each question
interface FormValues {
  [key: string]: string | string[] | number | Date | null;
}

interface FormStepProps {
  questions: Question[];
  isActive: boolean;
  stepTitle: string;
  onSkipQuestion: (index: number) => void;
  values: FormValues;
  onChange: (key: string, value: any) => void;
  touchedFields: Set<string>;
  onTouchField: (key: string) => void;
}

// Form step container
export const FormStep: React.FC<FormStepProps> = ({
  questions,
  isActive,
  stepTitle,
  onSkipQuestion,
  values,
  onChange,
  touchedFields,
  onTouchField,
}) => {
  if (!isActive) return null;
  console.log(questions);
  return (
    <div className="transition-all duration-300 ease-in-out">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">{stepTitle}</h2>
        <div className="h-1 w-20 bg-blue-500 mt-2"></div>
      </div>

      {questions.map(
        (question, index) =>
          !question.isDisabled && (
            <FormQuestion
              key={question.key}
              question={question}
              onSkip={() => onSkipQuestion(index)}
              value={values[question.key]}
              onChange={(value) => onChange(question.key, value)}
              touched={touchedFields.has(question.key)}
              onTouch={() => onTouchField(question.key)}
            />
          )
      )}
    </div>
  );
};
