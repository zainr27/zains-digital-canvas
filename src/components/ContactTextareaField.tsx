
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ContactTextareaFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}

const ContactTextareaField = ({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  placeholder,
  rows = 5,
  maxLength = 1000
}: ContactTextareaFieldProps) => {
  const { isDark } = useTheme();

  return (
    <div>
      <label 
        htmlFor={id} 
        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
      >
        {label} {required && <span aria-label="required">*</span>}
      </label>
      <textarea 
        id={id} 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required} 
        disabled={disabled}
        rows={rows} 
        maxLength={maxLength}
        className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : isDark 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
        }`}
        placeholder={placeholder} 
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error ${id}-count` : `${id}-count`}
      />
      <div className="flex justify-between items-center mt-1">
        {error && (
          <p id={`${id}-error`} className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        <p 
          id={`${id}-count`} 
          className={`text-sm ml-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`} 
          aria-live="polite"
        >
          {value.length}/{maxLength}
        </p>
      </div>
    </div>
  );
};

export default ContactTextareaField;
