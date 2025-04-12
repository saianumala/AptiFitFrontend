// src/components/common/FormInputs.tsx
import { LucideIcon } from "lucide-react";
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface TextInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
  icon?: LucideIcon;
}

export function TextInput({
  label,
  name,
  register,
  error,
  placeholder,
  required = false,
  icon: Icon,
}: TextInputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-gray-400" />
          </div>
        )}
        <input
          type="text"
          id={name}
          className={`block w-full ${Icon ? "pl-10" : "pl-3"} py-2 border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          placeholder={placeholder}
          {...register(name, { required: required && `${label} is required` })}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}

interface NumberInputProps extends Omit<TextInputProps, "icon"> {
  min?: number;
  max?: number;
  step?: number;
  icon?: LucideIcon;
}

export function NumberInput({
  label,
  name,
  register,
  error,
  min,
  max,
  step,
  required = false,
  icon: Icon,
}: NumberInputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-gray-400" />
          </div>
        )}
        <input
          type="number"
          id={name}
          min={min}
          max={max}
          step={step}
          className={`block w-full ${Icon ? "pl-10" : "pl-3"} py-2 border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          {...register(name, {
            required: required && `${label} is required`,
            min: min
              ? { value: min, message: `Must be at least ${min}` }
              : undefined,
            max: max
              ? { value: max, message: `Must be at most ${max}` }
              : undefined,
          })}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}

interface SelectInputProps extends Omit<TextInputProps, "icon"> {
  options: { value: string; label: string }[];
}

export function SelectInput({
  label,
  name,
  register,
  error,
  options,
  required = false,
}: SelectInputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        className={`block w-full py-2 px-3 border ${
          error ? "border-red-300" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        {...register(name, { required: required && `${label} is required` })}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
