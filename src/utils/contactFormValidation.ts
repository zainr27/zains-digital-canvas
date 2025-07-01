
export interface FormData {
  name: string;
  company: string;
  email: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

export const validateContactForm = (formData: FormData): FormErrors => {
  const newErrors: FormErrors = {};
  
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    newErrors.name = 'Name must be at least 2 characters long';
  }

  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    newErrors.email = 'Please enter a valid email address';
  }

  if (!formData.message.trim()) {
    newErrors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    newErrors.message = 'Message must be at least 10 characters long';
  } else if (formData.message.trim().length > 1000) {
    newErrors.message = 'Message must be less than 1000 characters';
  }

  return newErrors;
};
