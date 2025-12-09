import React from 'react';
import { Film, Github, Twitter, Heart, Mail, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { themeClasses } = useTheme();

  return (
    <footer className="relative w-full bg-slate-900/50 border-t border-slate-800 backdrop-blur-md mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`relative ${themeClasses.button} p-2.5 rounded-xl shadow-lg`}>
                  <Film className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Watchly
                </h2>
                <p className="text-xs text-slate-400">AI-Powered Discovery</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Your ultimate destination for discovering movies and TV shows powered by AI recommendations.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@watchly.app"
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`text-slate-400 ${themeClasses.textHover} transition-colors text-sm`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className={`text-slate-400 ${themeClasses.textHover} transition-colors text-sm`}>
                  Recommendations
                </Link>
              </li>
              <li>
                <Link to="/watchlist" className={`text-slate-400 ${themeClasses.textHover} transition-colors text-sm`}>
                  My Watchlist
                </Link>
              </li>
              <li>
                <Link to="/play-game" className={`text-slate-400 ${themeClasses.textHover} transition-colors text-sm`}>
                  Play Quiz Game
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className={`text-slate-400 ${themeClasses.textHover} transition-colors text-sm`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className={`text-slate-400 ${themeClasses.textHover} transition-colors text-sm`}>
                  API Documentation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className={`text-slate-400 ${themeClasses.textHover} transition-colors text-sm`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className={`text-slate-400 ${themeClasses.textHover} transition-colors text-sm`}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Support</h3>
            <p className="text-sm text-slate-400">
              Love Watchly? Support us to keep the project running!
            </p>
            <a
              href="https://ko-fi.com/mahmoudapp"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 ${themeClasses.button} text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105`}
            >
              <Coffee className="w-4 h-4" />
              Buy Me a Coffee
            </a>
            <p className="text-xs text-slate-500">
              Powered by TMDB API & Google Gemini AI
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © {currentYear} Watchly. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
              <span>by the Watchly Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
