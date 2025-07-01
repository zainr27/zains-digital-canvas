
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import { useTheme } from '../contexts/ThemeContext';

const Index = () => {
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      
      <motion.div style={{ y }} className="relative">
        <Hero />
      </motion.div>
      
      <div className="space-y-0">
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </div>
      
      <footer className={`py-8 border-t backdrop-blur-md ${isDark ? 'border-gray-800/50 bg-gray-900/80' : 'border-gray-200/50 bg-white/80'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className={`text-center md:text-left mb-4 md:mb-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>© 2025 Zain Rahman. All rights reserved.</p>
              <p className="text-sm mt-1">Rice University • Computer Science + Business</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/zainr27"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                aria-label="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://linkedin.com/in/zainrahman27"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://x.com/bitacolyte"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
