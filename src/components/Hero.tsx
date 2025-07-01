
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Calendar, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const { isDark } = useTheme();

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/ZainT25 copy.pdf';
    link.download = 'Zain_Rahman_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLetsTalk = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenToWork = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen sm:h-[85vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-16 pb-8 sm:pb-0">
      {/* Rice University background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/0e0050e0-21a0-404c-b4d5-8b3a3cf0e8b8.png')`
        }}
      />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/80 via-indigo-600/80 to-purple-700/80" />
      
      {/* Animated particles - reduced for mobile performance */}
      <div className="absolute inset-0 hidden sm:block">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 leading-tight"
        >
          Zain Rahman
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl mb-6 sm:mb-7 text-gray-100 px-2 sm:px-0"
        >
          Rising Junior at Rice University majoring in Computer Science 
        </motion.p>

        {/* Open to Work - More Prominent and Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(34, 197, 94, 0.6)',
                '0 0 0 15px rgba(34, 197, 94, 0)',
                '0 0 0 0 rgba(34, 197, 94, 0)'
              ]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block rounded-xl sm:rounded-2xl"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 15px 35px rgba(34, 197, 94, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenToWork}
              className="relative bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 text-base sm:text-lg md:text-xl border border-green-300/20 min-h-[48px] touch-manipulation"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="flex-shrink-0"
              >
                <Sparkles size={20} className="sm:w-6 sm:h-6" />
              </motion.div>
              <span className="text-center leading-tight">
                <span className="block sm:inline">OPEN to Work</span>
                <span className="block sm:inline sm:ml-2">- Summer 2026</span>
              </span>
              <Calendar size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
              
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl sm:rounded-2xl opacity-50" />
            </motion.button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex flex-col w-full max-w-sm sm:max-w-none sm:flex-row gap-3 sm:gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleResumeDownload}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg min-h-[48px] touch-manipulation"
            >
              <Download size={20} />
              Download Resume
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLetsTalk}
              className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-white hover:text-gray-900 transition-colors text-base sm:text-lg min-h-[48px] touch-manipulation"
            >
              Let's Talk
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
