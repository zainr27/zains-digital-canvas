
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript/TypeScript', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'C++', level: 80 },
      { name: 'R', level: 75 },
      { name: 'MATLAB', level: 70 }
    ]
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'React/Next.js', level: 90 },
      { name: 'TensorFlow/PyTorch', level: 85 },
      { name: 'Node.js', level: 85 },
      { name: 'Django/Flask', level: 80 },
      { name: 'Spring Boot', level: 75 }
    ]
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'AWS/GCP', level: 85 },
      { name: 'Docker/Kubernetes', level: 80 },
      { name: 'Git/GitHub', level: 95 },
      { name: 'PostgreSQL/MongoDB', level: 85 },
      { name: 'Linux/Unix', level: 80 }
    ]
  },
  {
    title: 'Soft Skills',
    skills: [
      { name: 'Leadership', level: 90 },
      { name: 'Problem Solving', level: 95 },
      { name: 'Communication', level: 85 },
      { name: 'Team Collaboration', level: 90 },
      { name: 'Project Management', level: 80 }
    ]
  }
];

const Skills = () => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="skills" className={`py-20 backdrop-blur-sm ${
      isDark ? 'bg-gray-800/20' : 'bg-gray-100/20'
    }`}>
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Skills & Expertise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                className={`p-6 rounded-lg backdrop-blur-md border ${
                  isDark 
                    ? 'bg-gray-800/40 border-gray-700/50' 
                    : 'bg-white/40 border-gray-200/50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className={`text-sm font-medium ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {skill.name}
                        </span>
                        <span className={`text-sm font-medium ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className={`h-2 rounded-full ${
                        isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                          className="h-full bg-gradient-to-r from-teal-400 to-indigo-600 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
