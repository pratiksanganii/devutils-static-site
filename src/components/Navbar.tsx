import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, Terminal } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: '/tools', label: 'Tools' },
    { to: '/about', label: 'About' },
  ];

  const activeClassName = "text-blue-600 dark:text-blue-400 font-semibold";
  const inactiveClassName = "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors duration-150";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-lg">
              <Terminal className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>DevTools</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
