import React from 'react';
import { Code, Book, Key, Terminal } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ApiDocPage: React.FC = () => {
  const { themeClasses } = useTheme();
  
  return (
    <main className="min-h-screen bg-slate-950 pt-10 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className={`absolute inset-0 ${themeClasses.button.split(' ')[0]} rounded-2xl blur-2xl opacity-50`} />
              <div className={`relative ${themeClasses.button.split(' ')[0]} p-4 rounded-2xl shadow-lg`}>
                <Code className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            API Documentation
          </h1>
          <p className="text-xl text-slate-400">
            Technical details about the APIs powering Watchly
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Overview */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Book className={`w-6 h-6 ${themeClasses.text}`} />
              <h2 className="text-2xl font-bold text-white">Overview</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Watchly integrates with multiple external APIs to provide a comprehensive movie and TV show 
              discovery experience. This documentation outlines the primary services we use and how they 
              work together.
            </p>
          </div>

          {/* TMDB API */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className={`w-6 h-6 ${themeClasses.text}`} />
              <h2 className="text-2xl font-bold text-white">The Movie Database (TMDB) API</h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-300">
                TMDB provides the foundation for all movie and TV show data, including:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                  <span className="text-slate-300">Movie and TV show metadata (titles, descriptions, release dates)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                  <span className="text-slate-300">High-quality poster and backdrop images</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                  <span className="text-slate-300">Ratings, genres, and cast information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                  <span className="text-slate-300">Trending, top-rated, and upcoming content</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                  <span className="text-slate-300">Video trailers and similar content recommendations</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-400 mb-2">API Base URL:</p>
                <code className={`${themeClasses.text} text-sm`}>https://api.themoviedb.org/3/</code>
              </div>

              <div className="mt-4">
                <p className="text-slate-300 mb-2">Key Endpoints Used:</p>
                <ul className="space-y-2 ml-4">
                  <li className="text-sm font-mono text-slate-400">
                    <span className="text-green-400">GET</span> /movie/popular
                  </li>
                  <li className="text-sm font-mono text-slate-400">
                    <span className="text-green-400">GET</span> /movie/top_rated
                  </li>
                  <li className="text-sm font-mono text-slate-400">
                    <span className="text-green-400">GET</span> /movie/upcoming
                  </li>
                  <li className="text-sm font-mono text-slate-400">
                    <span className="text-green-400">GET</span> /trending/all/week
                  </li>
                  <li className="text-sm font-mono text-slate-400">
                    <span className="text-green-400">GET</span> /movie/{'{movie_id}'}
                  </li>
                  <li className="text-sm font-mono text-slate-400">
                    <span className="text-green-400">GET</span> /search/movie
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Gemini AI */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Key className={`w-6 h-6 ${themeClasses.text}`} />
              <h2 className="text-2xl font-bold text-white">Google Gemini AI API</h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-300">
                Google's Gemini AI powers our intelligent recommendation system, providing:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                  <span className="text-slate-300">Context-aware movie recommendations based on user preferences</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                  <span className="text-slate-300">Natural language understanding for quiz-based discovery</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                  <span className="text-slate-300">Personalized match reasoning for each recommendation</span>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-400 mb-2">Model Used:</p>
                <code className={`${themeClasses.text} text-sm`}>gemini-1.5-flash</code>
              </div>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-4">Rate Limits & Best Practices</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                To ensure optimal performance and reliability:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                  <span>TMDB API: Free tier allows 40 requests per 10 seconds</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                  <span>Results are cached to minimize API calls</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                  <span>Images are served through TMDB's CDN for optimal performance</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Get Started */}
          <div className={`bg-gradient-to-r ${themeClasses.bg} rounded-xl p-8 border ${themeClasses.border}`}>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Want to Build with These APIs?
            </h2>
            <p className="text-slate-300 text-center mb-6">
              Both TMDB and Google Gemini offer free tiers to get started with your own projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.themoviedb.org/settings/api"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors border border-slate-600"
              >
                Get TMDB API Key
              </a>
              <a
                href="https://ai.google.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 ${themeClasses.button} text-white font-semibold rounded-lg transition-all shadow-lg ${themeClasses.glow} hover:shadow-xl ${themeClasses.glowHover}`}
              >
                Try Gemini AI
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ApiDocPage;
