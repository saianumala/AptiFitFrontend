import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft, Send, AlertCircle } from "lucide-react";
import { FormValues, Question } from "@/utils/typesInterface";
import { FormStep } from "./formStepComponent";
import { StepIndicator } from "./stepIndicatorComponent";
import { WelcomeScreen } from "./welcomeScreenComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import { showWelcomeSlide } from "@/recoilStore/recoilAtoms";
import { useAuth } from "@/customHooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "@/utils/questions";

// Main form component
function FitnessQuestionnaireForm() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [skippedQuestions, setSkippedQuestions] = useState<Set<string>>(
    new Set()
  );
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [attemptedNextWithErrors, setAttemptedNextWithErrors] =
    useState<boolean>(false);
  const showWelcome = useRecoilValue(showWelcomeSlide);
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated && user) {
      if (!user.firstLogin) {
        navigate("/");
        return;
      }
    } else if (!isAuthenticated) {
      // navigate("/landing");
      return;
    }
  }, [isAuthenticated, loading]);

  const stepTitles: string[] = [
    "Basic Information",
    "Body Measurements",
    "Activity & Goals",
    "Health Metrics",
    "Coaching Preferences",
  ];

  // Get dynamic questions based on form values (especially gender)
  const dynamicQuestions = React.useMemo(
    () => getQuestions(formValues),
    [formValues.gender]
  );
  console.log(dynamicQuestions);
  // Group questions into steps
  const questionsPerStep = 4;

  const questionGroups: Question[][] = React.useMemo(() => {
    return Array.from(
      { length: Math.ceil(dynamicQuestions.length / questionsPerStep) },
      (_, i) =>
        dynamicQuestions.slice(i * questionsPerStep, (i + 1) * questionsPerStep)
    );
  }, [dynamicQuestions]);

  const totalSteps = questionGroups.length;

  const validateCurrentStep = (): boolean => {
    const currentQuestions = questionGroups[currentStep];

    // Mark all required fields as touched
    const newTouchedFields = new Set(touchedFields);
    currentQuestions.forEach((question) => {
      if (question.required) {
        newTouchedFields.add(question.key);
      }
    });
    setTouchedFields(newTouchedFields);

    // Check if any required field is empty
    const hasErrors = currentQuestions.some((question) => {
      if (!question.required || skippedQuestions.has(question.key)) {
        return false;
      }

      const value = formValues[question.key];
      return (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      );
    });

    return !hasErrors;
  };

  const nextStep = (): void => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
        setAttemptedNextWithErrors(false);
      }
    } else {
      setAttemptedNextWithErrors(true);
      // Scroll to the first error
      const errorElement = document.querySelector(".text-red-500");
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const prevStep = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
      setAttemptedNextWithErrors(false);
    }
  };

  const handleSkipQuestion = (questionIndex: number): void => {
    const questionKey = questionGroups[currentStep][questionIndex].key;
    const updatedSkippedQuestions = new Set(skippedQuestions);
    updatedSkippedQuestions.add(questionKey);
    setSkippedQuestions(updatedSkippedQuestions);

    // Clear the value for the skipped question
    const updatedFormValues = { ...formValues };
    delete updatedFormValues[questionKey];
    setFormValues(updatedFormValues);
  };

  const handleValueChange = (key: string, value: any): void => {
    setFormValues({
      ...formValues,
      [key]: value,
    });

    // If a value is provided for a previously skipped question, remove it from skipped
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      skippedQuestions.has(key)
    ) {
      const updatedSkippedQuestions = new Set(skippedQuestions);
      updatedSkippedQuestions.delete(key);
      setSkippedQuestions(updatedSkippedQuestions);
    }
  };

  const handleTouchField = (key: string): void => {
    const updatedTouchedFields = new Set(touchedFields);
    updatedTouchedFields.add(key);
    setTouchedFields(updatedTouchedFields);
  };

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      // In a real app, you would collect all the form data here
      // and filter out skipped questions
      const finalFormData: any = Object.fromEntries(
        Object.entries(formValues).filter(([key]) => !skippedQuestions.has(key))
      );

      console.log(finalFormData);
      const transformedFormData = {
        gender: finalFormData.gender,

        age: {
          value: Number(finalFormData?.age?.value),
          unit: finalFormData?.age?.unit,
        },

        height: {
          value: Number(finalFormData?.height?.value),
          unit: finalFormData?.height?.unit,
        },

        weight: {
          value: Number(finalFormData?.weight?.value),
          unit: finalFormData?.weight?.unit,
        },

        activityLevel: finalFormData.activityLevel.split(" ")[0].toLowerCase(),
        preferredWorkoutType:
          finalFormData.preferredWorkoutType.split(" ")[0].toLowerCase() ||
          "strength",
        healthGoalFocus: finalFormData.healthGoalFocus,
        dietaryRestrictions: finalFormData.dietaryRestrictions || null,

        waistCircumference: finalFormData.waistCircumference
          ? {
              value: Number(finalFormData.waistCircumference.value) || null,
              unit: finalFormData.waistCircumference.unit,
            }
          : null,

        waterIntake: Number(finalFormData?.waterIntake?.value),
        neckCircumference: finalFormData.neckCircumference
          ? {
              value: Number(finalFormData.neckCircumference.value),

              unit: finalFormData.neckCircumference.unit,
            }
          : null,
        stepsDaily: finalFormData.stepsDaily
          ? Number(finalFormData.stepsDaily.value)
          : null,
        hip: finalFormData.hip
          ? {
              value: Number(finalFormData.hip?.value),
              unit: finalFormData.hip.unit,
            }
          : null,
        heartRate: finalFormData.heartRate
          ? Number(finalFormData.heartRate.value)
          : null,

        caloriesBurned: finalFormData.caloriesBurned
          ? Number(finalFormData.caloriesBurned.value)
          : null,

        sleepDuration: finalFormData.sleepDuration
          ? Number(finalFormData.sleepDuration.value)
          : null,

        coachingIntensity:
          finalFormData.coachingIntensity.split(" ")[0].toLowerCase() ||
          "balanced",
        motivationStyle:
          finalFormData.motivationStyle.split(" ")[0].toLowerCase() ||
          "supportive",
        cuisine: finalFormData.cuisine || null,

        notificationFrequency: finalFormData.notificationFrequency
          ? {
              value: Number(finalFormData.notificationFrequency.value),
              unit: finalFormData.notificationFrequency.unit,
            }
          : { value: 30, unit: "min" },
      };

      console.log("Form submitted with data:", finalFormData);
      setLoading(true);
      const preferencesResponseData = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/user/preferences/create`,
        {
          method: "POST",
          credentials: "include",

          body: JSON.stringify({
            userPreferences: transformedFormData,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!preferencesResponseData.ok) {
        setError(true);
        setLoading(false);
        const err = await preferencesResponseData.json();
        console.log(err);
        throw new Error("Failed to save preferences");
      }

      // Reset form or redirect
      // setCurrentStep(0);
      setSkippedQuestions(new Set());
      // setFormValues({});
      // setTouchedFields(new Set());
      // setAttemptedNextWithErrors(false);
      setLoading(false);
      setError(false);
      navigate("/");
    } else {
      setAttemptedNextWithErrors(true);
      // Scroll to the first error
      const errorElement = document.querySelector(".text-red-500");
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      {isLoading ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-700">
            Please wait while we create your profile...
          </h2>
          <p className="mt-2 text-gray-500">This may take a few seconds.</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-600">
          <h2 className="text-2xl font-semibold">
            Oops! Something went wrong.
          </h2>
          <p className="mt-2">Please try again later.</p>
        </div>
      ) : showWelcome ? (
        <WelcomeScreen />
      ) : (
        <>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Personalized Fitness Profile
            </h1>
            <p className="text-gray-600 mt-2">
              Complete this questionnaire to receive a customized workout and
              nutrition plan
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Fields marked with <span className="text-red-500">*</span> are
              required
            </p>
          </div>

          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          {attemptedNextWithErrors && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start">
                <AlertCircle className="text-red-500 mr-3 mt-0.5" size={18} />
                <div>
                  <p className="text-red-700 font-medium">
                    Please complete all required fields
                  </p>
                  <p className="text-red-600 text-sm">
                    All required fields must be filled before proceeding to the
                    next step.
                  </p>
                </div>
              </div>
            </div>
          )}

          {questionGroups.map((questions, index) => (
            <FormStep
              key={index}
              questions={questions}
              stepTitle={stepTitles[index]}
              isActive={currentStep === index}
              onSkipQuestion={handleSkipQuestion}
              values={formValues}
              onChange={handleValueChange}
              touchedFields={touchedFields}
              onTouchField={handleTouchField}
            />
          ))}

          <div className="mt-8 flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-md flex items-center gap-2 ${
                currentStep === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {currentStep < totalSteps - 1 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition duration-200"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700 transition duration-200"
              >
                Create My Plan
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            Step {currentStep + 1} of {totalSteps} •{" "}
            {Math.round(((currentStep + 1) / totalSteps) * 100)}% complete
          </div>
        </>
      )}
    </div>
  );
}

export default FitnessQuestionnaireForm;
