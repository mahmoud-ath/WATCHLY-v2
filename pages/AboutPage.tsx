import React from 'react';
import { Film, Sparkles, Users, Target } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AboutPage: React.FC = () => {
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
                <Film className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Watchly
          </h1>
          <p className="text-xl text-slate-400">
            Your AI-powered movie and TV show discovery companion
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Mission Section */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Target className={`w-6 h-6 ${themeClasses.text}`} />
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              At Watchly, we believe that finding your next favorite movie or TV show shouldn't be a chore. 
              Our mission is to revolutionize content discovery by combining the power of artificial intelligence 
              with intuitive design, helping you discover content that truly resonates with your tastes.
            </p>
          </div>

          {/* What We Do */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className={`w-6 h-6 ${themeClasses.text}`} />
              <h2 className="text-2xl font-bold text-white">What We Do</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              Watchly leverages cutting-edge AI technology to provide personalized recommendations tailored to your 
              preferences. Whether you're in the mood for a thrilling action movie, a heartwarming drama, or a 
              mind-bending sci-fi series, we've got you covered.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                <span className="text-slate-300">
                  <strong className="text-white">AI-Powered Recommendations:</strong> Get personalized suggestions 
                  based on your viewing history and preferences
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                <span className="text-slate-300">
                  <strong className="text-white">Interactive Quiz Game:</strong> Discover movies through fun, 
                  engaging quizzes that learn your taste
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                <span className="text-slate-300">
                  <strong className="text-white">Curated Collections:</strong> Explore trending, top-rated, 
                  and upcoming releases all in one place
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                <span className="text-slate-300">
                  <strong className="text-white">Personal Watchlist:</strong> Save and organize movies you want 
                  to watch later
                </span>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Users className={`w-6 h-6 ${themeClasses.text}`} />
              <h2 className="text-2xl font-bold text-white">Powered By</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Google Gemini AI</h3>
                <p className="text-slate-300">
                  Our recommendation engine is powered by Google's advanced Gemini AI, ensuring intelligent 
                  and context-aware suggestions that understand nuanced preferences.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">TMDB API</h3>
                <p className="text-slate-300">
                  We source our comprehensive movie and TV show database from The Movie Database (TMDB), 
                  providing you with accurate information, ratings, and beautiful imagery.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className={`bg-gradient-to-r ${themeClasses.bg} rounded-xl p-8 border ${themeClasses.border}`}>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Ready to Discover Your Next Favorite?
            </h2>
            <p className="text-slate-300 text-center mb-6">
              Join thousands of movie enthusiasts who trust Watchly for their entertainment recommendations.
            </p>
            <div className="flex justify-center">
              <a
                href="/"
                className={`px-8 py-3 ${themeClasses.button} text-white font-semibold rounded-lg transition-all shadow-lg ${themeClasses.glow} hover:shadow-xl ${themeClasses.glowHover} hover:scale-105`}
              >
                Start Exploring
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
