import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Send, CheckCircle, AlertCircle, Twitter, Loader } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { isDark } = useTheme();
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Submitting form to Supabase:', formData);
      
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        }]);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to save message: ${error.message}`);
      }

      // Success - Reset form
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. I'll get back to you within 24 hours."
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      toast({
        title: "Failed to Send Message",
        description: `${errorMessage}. Please try again or contact me directly.`,
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
    <section 
      id="contact" 
      className={`py-20 backdrop-blur-sm ${isDark ? 'bg-gray-900/30' : 'bg-white/30'}`} 
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 
            id="contact-heading" 
            className={`text-4xl md:text-5xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Let's Connect
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
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
                Fill out this form to send me a message. All fields are required.
              </p>

              <div>
                <label 
                  htmlFor="name" 
                  className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Name <span aria-label="required">*</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : isDark 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Your name" 
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div>
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Email <span aria-label="required">*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : isDark 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="your.email@example.com" 
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label 
                  htmlFor="message" 
                  className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Message <span aria-label="required">*</span>
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  disabled={isSubmitting}
                  rows={5} 
                  maxLength={1000}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.message 
                      ? 'border-red-500 focus:ring-red-500' 
                      : isDark 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Tell me about your project or idea..." 
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error message-count' : 'message-count'}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message && (
                    <p id="message-error" className="text-sm text-red-500" role="alert">
                      {errors.message}
                    </p>
                  )}
                  <p 
                    id="message-count" 
                    className={`text-sm ml-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`} 
                    aria-live="polite"
                  >
                    {formData.message.length}/1000
                  </p>
                </div>
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
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
              <p id="submit-button-description" className="sr-only">
                {isSubmitting ? 'Message is being sent' : 'Click to send your message'}
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
