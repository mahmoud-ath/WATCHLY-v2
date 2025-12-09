import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Home, Search, ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { themeClasses } = useTheme();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className={`relative ${themeClasses.button} p-8 rounded-3xl shadow-2xl animate-bounce`}>
              <Film className="w-20 h-20 text-white" />
            </div>
          </div>
          
          {/* 404 Text */}
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 mt-8 mb-4">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-xl text-slate-400 max-w-md mx-auto">
            Oops! The page you're looking for seems to have gone off-screen. 
            Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg group w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className={`flex items-center gap-3 px-6 py-3.5 ${themeClasses.button} text-white rounded-xl transition-all duration-300 font-semibold shadow-lg group w-full sm:w-auto`}
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Go Home</span>
          </button>

          <button
            onClick={() => navigate('/recommendations')}
            className="flex items-center gap-3 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg group w-full sm:w-auto"
          >
            <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Discover Movies</span>
          </button>
        </div>

        {/* Suggestions */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-500 mb-4">You might be interested in:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/trending')}
              className={`px-4 py-2 bg-slate-800/50 hover:bg-slate-800 ${themeClasses.textHover} text-slate-400 rounded-lg text-sm transition-colors`}
            >
              Trending Now
            </button>
            <button
              onClick={() => navigate('/top-rated-movies')}
              className={`px-4 py-2 bg-slate-800/50 hover:bg-slate-800 ${themeClasses.textHover} text-slate-400 rounded-lg text-sm transition-colors`}
            >
              Top Rated Movies
            </button>
            <button
              onClick={() => navigate('/watchlist')}
              className={`px-4 py-2 bg-slate-800/50 hover:bg-slate-800 ${themeClasses.textHover} text-slate-400 rounded-lg text-sm transition-colors`}
            >
              My Watchlist
            </button>
            <button
              onClick={() => navigate('/play-game')}
              className={`px-4 py-2 bg-slate-800/50 hover:bg-slate-800 ${themeClasses.textHover} text-slate-400 rounded-lg text-sm transition-colors`}
            >
              Play Quiz Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
