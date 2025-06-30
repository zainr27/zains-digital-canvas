
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
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
      
      <footer className={`py-8 text-center border-t backdrop-blur-md ${
        isDark ? 'border-gray-800/50 text-gray-400 bg-gray-900/80' : 'border-gray-200/50 text-gray-600 bg-white/80'
      }`}>
        <div className="container mx-auto px-4">
          <p>&copy; 2024 Zain Rahman. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
