
import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, X, Github } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import LazyImage from './ui/LazyImage';

const projects = [
  {
    title: 'dGEVNet',
    description: 'Advanced deep learning architecture for spatiotemporal rainfall forecasting using Generalized Extreme Value distributions to predict nonstationary weather patterns.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    tech: ['PyTorch', 'NumPy', 'GIS', 'Matplotlib', 'Statistical Modeling'],
    github: 'https://github.com/zainr27/dGEVNet',
    demo: 'https://dossgollin-lab.github.io/',
    details: 'Developed a cutting-edge deep learning architecture that predicts nonstationary rainfall patterns using GEV distributions. The model incorporates spatial Laplacian smoothness regularization to enforce geographic continuity in predictions. Successfully integrated geospatial datasets with automated preprocessing pipelines, achieving a 30% reduction in runtime while maintaining high prediction accuracy for extreme weather events.',
    impact: '30% runtime reduction, enhanced extreme weather prediction accuracy'
  },
  {
    title: 'Booie',
    description: 'Full-stack Income Share Agreement (ISA) financing platform providing personalized education financing with comprehensive student onboarding and repayment modeling.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Framer Motion', 'TanStack Query'],
    github: 'https://github.com/zainr27/Booie-',
    demo: 'https://github.com/zainr27/Booie-',
    details: 'Built a comprehensive ISA financing platform featuring personalized repayment modeling and streamlined student onboarding. Implemented secure authentication, multi-step onboarding workflows, and financial data intake systems using Supabase. Designed and deployed a robust 12-table PostgreSQL schema handling user profiles, applications, and document workflows. Enhanced security with edge functions, Row-Level Security (RLS), and comprehensive audit logging for session management and data compliance.',
    impact: 'Streamlined education financing, secure multi-step onboarding system'
  },
  {
    title: 'QuikFlip Platform',
    description: 'Full-stack crypto payments application for SMBs, featuring automated conversion logic and enterprise-grade deployment infrastructure.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
    tech: ['React', 'AWS Lambda', 'AWS S3', 'AWS CodePipeline', 'CloudWatch', 'Postman'],
    github: 'https://github.com/zainr27/myquikflip',
    demo: 'https://www.myquikflip.com/',
    details: 'Co-founded and architected a full-stack crypto payments application for real estate transactions using React frontend with AWS Lambda and S3 backend infrastructure. Developed sophisticated backend conversion logic and established comprehensive CI/CD deployment pipeline via AWS CodePipeline with CloudWatch monitoring. Created extensive Postman test suites for all API endpoints, maintaining sub-200ms response latency. Successfully raised $30,000 pre-seed funding from Jefferson Foundation and achieved YC Top 10% recognition.',
    impact: 'Raised $30K pre-seed funding, YC Top 10%, sub-200ms API response times'
  }
];

const Projects = () => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent, project: typeof projects[0]) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedProject(project);
    }
  };

  const handleModalKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSelectedProject(null);
    }
  };

  return (
    <section 
      id="projects" 
      className={`py-20 backdrop-blur-sm ${isDark ? 'bg-gray-900/30' : 'bg-white/30'}`}
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 
            id="projects-heading"
            className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Featured Projects
          </h2>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-label="Featured projects"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 backdrop-blur-md border ${
                  isDark 
                    ? 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-700/50 shadow-lg hover:shadow-indigo-500/25 hover:shadow-2xl' 
                    : 'bg-white/40 border-gray-200/50 hover:bg-white/60 shadow-lg hover:shadow-indigo-400/30 hover:shadow-2xl'
                } shadow-lg focus-within:ring-2 focus-within:ring-indigo-500`}
                style={{
                  boxShadow: isDark 
                    ? '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(99, 102, 241, 0.1)'
                    : '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(99, 102, 241, 0.1)'
                }}
                whileHover={{ 
                  y: -8,
                  boxShadow: isDark 
                    ? '0 25px 50px -12px rgba(99, 102, 241, 0.25), 0 0 0 1px rgba(99, 102, 241, 0.2)'
                    : '0 25px 50px -12px rgba(99, 102, 241, 0.25), 0 0 0 1px rgba(99, 102, 241, 0.2)'
                }}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => handleKeyDown(e, project)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title} project`}
              >
                <div className="relative overflow-hidden">
                  <LazyImage
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                    isDark ? 'bg-indigo-400/10' : 'bg-indigo-500/10'
                  }`} />
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  
                  <p className={`mb-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2" aria-label={`Technologies used in ${project.title}`}>
                    {project.tech.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded dark:bg-indigo-900 dark:text-indigo-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded dark:bg-gray-700 dark:text-gray-300">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
            onKeyDown={handleModalKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`max-w-2xl w-full rounded-lg overflow-hidden backdrop-blur-md border ${
                isDark 
                  ? 'bg-gray-800/90 border-gray-700/50' 
                  : 'bg-white/90 border-gray-200/50'
              }`}
              style={{
                boxShadow: isDark
                  ? '0 25px 50px -12px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.3)'
                  : '0 25px 50px -12px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <LazyImage
                  src={selectedProject.image}
                  alt={`${selectedProject.title} project detailed screenshot`}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Close project details modal"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="p-6">
                <h3 
                  id="modal-title"
                  className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  {selectedProject.title}
                </h3>
                
                <div id="modal-description">
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {selectedProject.details}
                  </p>
                  
                  <p className={`mb-6 text-sm font-semibold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    Impact: {selectedProject.impact}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6" aria-label="All technologies used">
                  {selectedProject.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded dark:bg-indigo-900 dark:text-indigo-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    aria-label={`View ${selectedProject.title} source code on GitHub`}
                  >
                    <Github size={16} aria-hidden="true" />
                    GitHub
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label={`View ${selectedProject.title} live demo`}
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
