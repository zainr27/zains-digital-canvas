import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/use-toast';
import { validateContactForm, FormData, FormErrors } from '../utils/contactFormValidation';
import { generateMailtoUrl, openMailtoLink } from '../utils/mailtoUtils';
import ContactFormField from './ContactFormField';
import ContactTextareaField from './ContactTextareaField';

const ContactForm = () => {
  const { isDark } = useTheme();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Generating mailto URL with form data:', formData);
      
      // Replace with your actual email address
      const mailtoUrl = generateMailtoUrl(formData, 'zur1@rice.edu');
      
      const success = openMailtoLink(mailtoUrl);
      
      if (success) {
        // Success - Reset form
        setFormData({ name: '', company: '', email: '', message: '' });
        setErrors({});
        
        toast({
          title: "Email Client Opened!",
          description: "Your email client should open with the message pre-filled. Please send the email to complete your message."
        });
      } else {
        throw new Error('Failed to open email client');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      toast({
        title: "Unable to Open Email Client",
        description: "Please email me directly at zur1@rice.edu or try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`p-8 rounded-2xl backdrop-blur-md border shadow-xl ${
        isDark 
          ? 'bg-gray-800/40 border-gray-700/50' 
          : 'bg-white/40 border-gray-200/50'
      }`}
      role="main" 
      aria-labelledby="contact-form-heading"
    >
      <h3 id="contact-form-heading" className="sr-only">
        Contact Form
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-describedby="form-description">
        <p id="form-description" className="sr-only">
          Fill out this form to send me a message. Name, email, and message are required fields. This will open your email client.
        </p>

        <ContactFormField
          id="name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          error={errors.name}
          placeholder="Your name"
        />

        <ContactFormField
          id="company"
          name="company"
          label="Company"
          value={formData.company}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="Your company (optional)"
        />

        <ContactFormField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          error={errors.email}
          placeholder="your.email@example.com"
        />

        <ContactTextareaField
          id="message"
          name="message"
          label="Message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          error={errors.message}
          placeholder="Tell me about your project or idea..."
          rows={5}
          maxLength={1000}
        />

        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
          <Mail className="inline w-4 h-4 mr-2" />
          This will open your email client with a pre-filled message
        </div>
        
        <motion.button 
          type="submit" 
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" 
          aria-describedby="submit-button-description"
        >
          {isSubmitting ? (
            <>
              <Loader className="animate-spin" size={18} aria-hidden="true" />
              <span>Opening Email...</span>
            </>
          ) : (
            <>
              <Mail size={18} aria-hidden="true" />
              <span>Open Email Client</span>
            </>
          )}
        </motion.button>
        <p id="submit-button-description" className="sr-only">
          {isSubmitting ? 'Email client is opening' : 'Click to open your email client with pre-filled message'}
        </p>
      </form>
    </motion.div>
  );
};

export default ContactForm;
