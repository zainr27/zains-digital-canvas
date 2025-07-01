
import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const experiences = [
  {
    title: 'AI Architect Intern',
    company: 'U.S. Department of Treasury',
    location: 'Washington, DC',
    period: 'June 2025 – Present',
    description: 'Engineered multi-tenant SaaS compliance platform hosted on Azure Government.',
    details: [
      'Engineered multi-tenant SaaS compliance platform hosted on Azure Government using Azure Foundry',
      'Implemented private vector databases per tenant for isolated embeddings',
      'Developed AI modules automating SSP drafting and recommendation compliant with FedRAMP and CMMC'
    ],
    tech: ['Azure', 'Python', 'Vector Databases', 'FedRAMP']
  },
  {
    title: 'Undergraduate Research Assistant',
    company: 'Rice Civil and Environmental Engineering',
    location: 'Houston, TX',
    period: 'Sep 2024 - Present',
    description: 'Only undergraduate in team of 8 selected to be part of NSF-Funded Research Lab.',
    details: [
      'Only undergraduate in team of 8 selected to be part of NSF-Funded Research Lab',
      'Built and trained LSTM and dGEVnet models utilizing PyTorch to enhance hydrologic forecasts',
      'Integrated GIS datasets to map regional patterns; reduced preprocessing time by 30%',
      'Led model validation and achieved a 15% improvement in accuracy on out-of-sample precipitation events'
    ],
    tech: ['PyTorch', 'LSTM', 'GIS', 'Python']
  },
  {
    title: 'Co-Founder and Founding Software Engineer',
    company: 'QuikFlip',
    location: 'Houston, TX',
    period: 'Jul 2024 - Mar 2025',
    description: 'Built full-stack crypto payments app using React, AWS Lambda, and S3.',
    details: [
      'Built full-stack crypto payments app using React, AWS Lambda, and S3; developed backend conversion logic',
      'Set up CI/CD deployment pipeline via AWS CodePipeline and CloudWatch for automatic monitoring',
      'Wrote Postman test suites for API endpoints; ensured response latency stayed under 200ms',
      'Raised $30,000 pre-seed from Jefferson Foundation to scale MVP to market and YC Top 10%'
    ],
    tech: ['React', 'AWS Lambda', 'S3', 'CodePipeline']
  }
];

const Experience = () => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="experience" className={`py-20 backdrop-blur-sm ${
      isDark ? 'bg-gray-800/20' : 'bg-gray-100/20'
    }`}>
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Work Experience & Research
          </h2>
          
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`p-6 rounded-lg border backdrop-blur-md transition-all duration-300 cursor-pointer ${
                  isDark 
                    ? 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-700/50' 
                    : 'bg-white/40 border-gray-200/50 hover:bg-white/60'
                } ${expandedIndex === index ? 'shadow-xl' : 'shadow-lg'}`}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                whileHover={{ y: -4 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`text-xl font-bold mb-1 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {exp.title}
                    </h3>
                    <p className="text-indigo-600 font-semibold">{exp.company}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {exp.location} • {exp.period}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                  </motion.div>
                </div>
                
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {exp.description}
                </p>
                
                <motion.div
                  initial={false}
                  animate={{ height: expandedIndex === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <ul className={`mb-4 space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {exp.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-indigo-600 mr-2">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full dark:bg-indigo-900 dark:text-indigo-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
