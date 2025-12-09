import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Home, Bookmark, Gamepad2, Sparkles, Coffee, Share2, Palette, Check, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';
import { ColorTheme } from '../../types/theme';

const Header: React.FC = () => {
  const location = useLocation();
  const { colorTheme, setColorTheme, themeClasses } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  const themes: { value: ColorTheme; label: string; color: string; textColor: string }[] = [
    { value: 'purple', label: 'Purple', color: 'bg-indigo-600', textColor: 'text-indigo-400' },
    { value: 'green', label: 'Green', color: 'bg-emerald-600', textColor: 'text-emerald-400' },
    { value: 'orange', label: 'Orange', color: 'bg-orange-600', textColor: 'text-orange-400' },
  ];

  const handleThemeChange = (theme: ColorTheme) => {
    setColorTheme(theme);
    setShowThemeMenu(false);
    toast.success(`Switched to ${theme.charAt(0).toUpperCase() + theme.slice(1)} theme`);
  };

  return (
    <header className="relative w-full border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className={`relative ${themeClasses.button} p-2 md:p-2.5 rounded-xl shadow-lg`}>
            <Film className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Watchly AI
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isActive('/') ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/recommendations" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isActive('/recommendations') ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Recommendations</span>
          </Link>
          
          <Link 
            to="/watchlist" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isActive('/watchlist') ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Watchlist</span>
          </Link>
          
          <Link 
            to="/play-game" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isActive('/play-game') ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Play Game</span>
          </Link>

          {/* Theme Dropdown */}
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Change theme"
            >
              <Palette className="w-5 h-5" />
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Color Theme
                  </div>
                  {themes.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => handleThemeChange(theme.value)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        colorTheme === theme.value
                          ? 'bg-slate-800 text-white'
                          : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                      <span className="flex-1 text-left text-sm font-medium">{theme.label}</span>
                      {colorTheme === theme.value && (
                        <Check className="w-4 h-4 text-green-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Share Button */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.origin);
              toast.success('Link copied to clipboard!', {
                duration: 3000,
              });
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors group"
            aria-label="Share app"
          >
            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Donate Button */}
          <a
            href="https://ko-fi.com/mahmoudapp"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 ${themeClasses.button} text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105`}
          >
            <Coffee className="w-4 h-4" />
            <span className="hidden sm:inline">Donate</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Share Button */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.origin);
              toast.success('Link copied!', { duration: 2000 });
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Share app"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 shadow-2xl z-50 animate-in slide-in-from-top duration-200"
        >
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {/* Mobile Navigation Links */}
            <Link 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive('/') 
                  ? `${themeClasses.bg} text-white` 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/recommendations" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive('/recommendations') 
                  ? `${themeClasses.bg} text-white` 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>Recommendations</span>
            </Link>
            
            <Link 
              to="/watchlist" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive('/watchlist') 
                  ? `${themeClasses.bg} text-white` 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <span>Watchlist</span>
            </Link>
            
            <Link 
              to="/play-game" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive('/play-game') 
                  ? `${themeClasses.bg} text-white` 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Play Game</span>
            </Link>

            {/* Theme Selection */}
            <div className="pt-2 mt-2 border-t border-slate-800">
              <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Color Theme
              </div>
              <div className="space-y-1">
                {themes.map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => handleThemeChange(theme.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      colorTheme === theme.value
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full ${theme.color}`} />
                    <span className="flex-1 text-left text-base font-medium">{theme.label}</span>
                    {colorTheme === theme.value && (
                      <Check className="w-5 h-5 text-green-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Donate Button */}
            <div className="pt-2 mt-2 border-t border-slate-800">
              <a
                href="https://ko-fi.com/mahmoudapp"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full px-4 py-3 ${themeClasses.button} text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl`}
              >
                <Coffee className="w-5 h-5" />
                <span>Support with a Donation</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
