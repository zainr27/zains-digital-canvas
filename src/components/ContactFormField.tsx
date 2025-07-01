
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ContactFormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  type?: string;
}

const ContactFormField = ({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  placeholder,
  type = 'text'
}: ContactFormFieldProps) => {
  const { isDark } = useTheme();

  return (
    <div>
      <label 
        htmlFor={id} 
        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
      >
        {label} {required && <span aria-label="required">*</span>}
      </label>
      <input 
        type={type} 
        id={id} 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required} 
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : isDark 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
        }`}
        placeholder={placeholder} 
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default ContactFormField;
