import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
const Contact = () => {
  const {
    isDark
  } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setIsSubmitting(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return <section id="contact" className={`py-20 backdrop-blur-sm ${isDark ? 'bg-gray-900/30' : 'bg-white/30'}`}>
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial={{
        opacity: 0,
        y: 50
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8
      }} className="max-w-4xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Let's Connect
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={isInView ? {
            opacity: 1,
            x: 0
          } : {}} transition={{
            duration: 0.8,
            delay: 0.2
          }} className={`p-6 rounded-lg backdrop-blur-md border ${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/40 border-gray-200/50'}`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Get in Touch
              </h3>
              
              <p className={`mb-8 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm always interested in new opportunities, collaborations, and innovative projects. 
                Let's discuss how we can work together to create something amazing.
              </p>
              
              <div className="space-y-4">
                <motion.a href="mailto:zain@example.com" whileHover={{
                x: 8
              }} className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <Mail className="text-indigo-600" size={24} />
                  <span>zur1@rice.edu</span>
                </motion.a>
                
                <motion.a href="tel:+1234567890" whileHover={{
                x: 8
              }} className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <Phone className="text-indigo-600" size={24} />
                  <span>+1 (234) 567-8900</span>
                </motion.a>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} animate={isInView ? {
            opacity: 1,
            x: 0
          } : {}} transition={{
            duration: 0.8,
            delay: 0.4
          }} className={`p-6 rounded-lg backdrop-blur-md border ${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/40 border-gray-200/50'}`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name
                  </label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} placeholder="Your name" />
                </div>
                
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} placeholder="your.email@example.com" />
                </div>
                
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message
                  </label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} placeholder="Tell me about your project or idea..." />
                </div>
                
                <motion.button type="submit" disabled={isSubmitting} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? <>
                      <motion.div animate={{
                    rotate: 360
                  }} transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                      <span>Sending...</span>
                    </> : <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default Contact;