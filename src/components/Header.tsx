
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Github, Linkedin, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const estDate = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(now);
      setCurrentDate(estDate);
    };

    updateDate();
    const interval = setInterval(updateDate, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navigationItems = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 ${
        isDark 
          ? 'bg-gray-900/60 border-gray-800/50' 
          : 'bg-white/60 border-gray-200/50'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Date Display */}
          <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {currentDate}
          </div>
          
          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex flex-1 justify-center max-w-2xl mx-8">
            <div className="flex space-x-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ y: -2 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors px-3 py-2 ${
                    isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 w-auto min-w-fit">
            {/* Desktop Social Links */}
            <div className="hidden md:flex items-center space-x-1">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/zainr27"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/in/zrah/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://x.com/bitacolyte"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Twitter size={18} />
              </motion.a>
            </div>
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-full backdrop-blur-md border transition-colors ${
                isDark 
                  ? 'bg-gray-800/60 border-gray-700/50 text-white' 
                  : 'bg-gray-100/60 border-gray-200/50 text-gray-600'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2.5 rounded-full backdrop-blur-md border transition-colors ${
                isDark 
                  ? 'bg-gray-800/60 border-gray-700/50 text-white' 
                  : 'bg-gray-100/60 border-gray-200/50 text-gray-600'
              }`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden mt-4 pt-4 border-t ${
                isDark ? 'border-gray-700/50' : 'border-gray-200/50'
              }`}
            >
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item}
                    whileHover={{ x: 4 }}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-left text-sm font-medium transition-colors ${
                      isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
                
                {/* Mobile Social Links */}
                <div className="flex items-center space-x-4 pt-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://github.com/zainr27"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-colors ${
                      isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://www.linkedin.com/in/zrah/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-colors ${
                      isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://x.com/bitacolyte"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-colors ${
                      isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Twitter size={20} />
                  </motion.a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
