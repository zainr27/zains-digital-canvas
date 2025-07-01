
import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, X, Github } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import LazyImage from './ui/LazyImage';

const projects = [
  {
    title: 'dGEVNet',
    description: 'Advanced deep learning architecture combining statistical modeling with neural networks for extreme weather prediction using generalized extreme value distributions.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    tech: ['PyTorch', 'Python', 'MATLAB', 'Docker', 'Statistical Modeling'],
    github: 'https://github.com/zainr27/dGEVNet',
    demo: 'https://dossgollin-lab.github.io/',
    details: 'Developed an innovative neural network architecture that integrates Generalized Extreme Value (GEV) statistics with deep learning for improved extreme weather event prediction. The model achieves superior performance in predicting rare climate events by leveraging both the representational power of neural networks and the theoretical foundations of extreme value theory.',
    impact: '15% accuracy improvement over existing methods, published research findings'
  },
  {
    title: 'Booie',
    description: 'AI-powered social media content optimization platform that analyzes trends and maximizes engagement through intelligent content suggestions.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    tech: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'Machine Learning'],
    github: 'https://github.com/zainr27/Booie-',
    demo: 'https://github.com/zainr27/Booie-',
    details: 'Full-stack social media optimization platform that leverages machine learning algorithms to analyze social media trends, optimize posting schedules, and generate content suggestions. Features real-time analytics, automated content scoring, and personalized recommendations to maximize user engagement across multiple social platforms.',
    impact: 'Increased user engagement by 40%, attracted 1000+ active users'
  },
  {
    title: 'QuikFlip Platform',
    description: 'Comprehensive real estate investment analysis platform featuring AI-driven market predictions, property valuation, and investment opportunity identification.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
    tech: ['React', 'TypeScript', 'PostgreSQL', 'Google Cloud Platform', 'TensorFlow', 'Financial Modeling'],
    github: 'https://github.com/zainr27/myquikflip',
    demo: 'https://www.myquikflip.com/',
    details: 'Co-founded and architected a comprehensive real estate investment platform that combines market data analysis, predictive modeling, and financial calculations. The platform provides investors with detailed property valuations, market trend analysis, ROI calculations, and automated deal sourcing. Features include advanced filtering, comparative market analysis, and investment portfolio tracking.',
    impact: 'Secured $30K in funding, onboarded 500+ real estate professionals'
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
                    ? 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-700/50' 
                    : 'bg-white/40 border-gray-200/50 hover:bg-white/60'
                } shadow-lg hover:shadow-xl focus-within:ring-2 focus-within:ring-indigo-500`}
                whileHover={{ y: -8 }}
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
