
import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import LazyImage from './ui/LazyImage';

const About = () => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const [counts, setCounts] = useState({
    experience: 0,
    projects: 0,
    languages: 0,
  });

  useEffect(() => {
    if (isInView) {
      const targets = { experience: 2, projects: 7, languages: 15 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounts({
          experience: Math.floor(targets.experience * progress),
          projects: Math.floor(targets.projects * progress),
          languages: Math.floor(targets.languages * progress),
        });
        
        if (step >= steps) {
          clearInterval(timer);
          setCounts(targets);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section 
      id="about" 
      className={`py-12 sm:py-16 md:py-20 backdrop-blur-sm ${isDark ? 'bg-gray-900/30' : 'bg-white/30'}`}
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 
            id="about-heading"
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            About Me
          </h2>
          
          {/* Professional Headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-indigo-600 shadow-xl">
              <LazyImage
                src="/lovable-uploads/1e158626-7ba5-4d11-8ce7-e647c3c6c77e.png"
                alt="Zain Rahman - Professional headshot of a young computer science student at Rice University"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <p className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 leading-relaxed px-2 sm:px-0 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Hey! My name is Zain Rahman. I'm an ambitious and dedicated Computer Science student at Rice University. 
            I am passionate about the intriate dynamics of Software Engineering, Quantum Computing, and Artificial Intelligence.
            My goal is to help bridge the gap between cutting-edge technology and real-world applications, 
            turning complex problems into elegant, scalable solutions.
          </p>
          
          <div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12"
            role="list"
            aria-label="Professional statistics"
          >
            {[
              { label: 'Years Coding', value: counts.experience, suffix: '+' },
              { label: 'MVP Shipped', value: counts.projects, suffix: '+' },
              { label: 'Technologies', value: counts.languages, suffix: '+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`p-4 sm:p-6 rounded-lg backdrop-blur-md border ${
                  isDark 
                    ? 'bg-gray-800/40 border-gray-700/50' 
                    : 'bg-white/40 border-gray-200/50'
                } shadow-lg`}
                role="listitem"
              >
                <div 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-2"
                  aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
                >
                  {stat.value}{stat.suffix}
                </div>
                <div className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`p-4 sm:p-6 rounded-lg backdrop-blur-md border ${
              isDark 
                ? 'bg-gray-800/30 border-gray-700/30' 
                : 'bg-white/30 border-gray-200/30'
            } shadow-lg max-w-2xl mx-auto`}
          >
            <div className={`text-lg sm:text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              🎓 Rice University • Computer Science + Business Double Major
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                GPA:
              </span>
              <span className="text-xl sm:text-2xl font-bold text-indigo-600">
                3.85
              </span>
            </div>
            <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Expected Graduation: 2027 • Languages: English, Urdu, Spanish
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
