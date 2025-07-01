
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ContactForm from './ContactForm';

const Contact = () => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
          
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
