
import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

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
      const targets = { experience: 5, projects: 15, languages: 8 };
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
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            About Me
          </h2>
          
          <p className={`text-lg md:text-xl mb-12 leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Houston-based CS + Business student at Rice University, passionate about building 
            AI-driven solutions that create measurable impact. As a co-founder and AI architect, 
            I bridge the gap between cutting-edge technology and real-world applications, 
            turning complex problems into elegant, scalable solutions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { label: 'Years Coding', value: counts.experience, suffix: '+' },
              { label: 'Projects Shipped', value: counts.projects, suffix: '+' },
              { label: 'Technologies', value: counts.languages, suffix: '+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`p-6 rounded-lg ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } shadow-lg`}
              >
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className={`text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>GPA: 3.85 • Expected Graduation: 2027 • Languages: English, Urdu, Spanish</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
