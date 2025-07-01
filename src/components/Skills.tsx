
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
      { name: 'Spring Boot', level: 75 },
      { name: 'Express.js', level: 80 }
    ]
  },
  {
    title: 'AI Technologies',
    skills: [
      { name: 'Azure AI Foundry', level: 90 },
      { name: 'LLMs & Fine-tuning', level: 85 },
      { name: 'AI Agents & Workflows', level: 85 },
      { name: 'MCP Servers', level: 80 },
      { name: 'Vector Databases', level: 85 },
      { name: 'RAG Systems', level: 80 }
    ]
  },
  {
    title: 'Soft Skills',
    skills: [
      { name: 'Leadership', level: 90 },
      { name: 'Problem Solving', level: 95 },
      { name: 'Communication', level: 85 },
      { name: 'Team Collaboration', level: 90 },
      { name: 'Project Management', level: 80 },
      { name: 'Critical Thinking', level: 85 }
    ]
  }
];

const Skills = () => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="skills" className={`py-12 sm:py-16 md:py-20 backdrop-blur-sm ${
      isDark ? 'bg-gray-800/20' : 'bg-gray-100/20'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Skills & Expertise
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                className={`p-4 sm:p-6 rounded-lg backdrop-blur-md border ${
                  isDark 
                    ? 'bg-gray-800/40 border-gray-700/50' 
                    : 'bg-white/40 border-gray-200/50'
                } shadow-lg`}
              >
                <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {category.title}
                </h3>
                
                <div className="space-y-3 sm:space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1 sm:mb-2">
                        <span className={`text-xs sm:text-sm font-medium ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {skill.name}
                        </span>
                        <span className={`text-xs sm:text-sm font-medium ${
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
