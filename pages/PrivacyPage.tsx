import React from 'react';
import { Shield, Eye, Lock, Database } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const PrivacyPage: React.FC = () => {
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
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-400">
            Last updated: December 9, 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <p className="text-slate-300 leading-relaxed">
              At Watchly, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, and protect your information when you use our service. By using Watchly, you agree 
              to the collection and use of information in accordance with this policy.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Database className={`w-6 h-6 ${themeClasses.text}`} />
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Local Storage Data</h3>
                <p className="text-slate-300">
                  Watchly stores your preferences and watchlist data locally in your browser using localStorage. 
                  This includes:
                </p>
                <ul className="space-y-2 ml-4 mt-2">
                  <li className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                    <span className="text-slate-300">Your watchlist of saved movies and TV shows</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                    <span className="text-slate-300">Quiz game responses and preferences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                    <span className="text-slate-300">User interface preferences</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Usage Data</h3>
                <p className="text-slate-300">
                  We may collect anonymous usage statistics to improve our service, including:
                </p>
                <ul className="space-y-2 ml-4 mt-2">
                  <li className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                    <span className="text-slate-300">Pages visited and features used</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                    <span className="text-slate-300">Browser type and device information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                    <span className="text-slate-300">Search queries and recommendation interactions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Eye className={`w-6 h-6 ${themeClasses.text}`} />
              <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
            </div>
            <p className="text-slate-300 mb-4">We use the collected information for the following purposes:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                <span className="text-slate-300">
                  <strong className="text-white">Personalization:</strong> To provide tailored movie and TV show 
                  recommendations based on your preferences
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                <span className="text-slate-300">
                  <strong className="text-white">Service Improvement:</strong> To analyze usage patterns and 
                  improve our features and user experience
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                <span className="text-slate-300">
                  <strong className="text-white">Functionality:</strong> To maintain your watchlist and 
                  preferences across sessions
                </span>
              </li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Lock className={`w-6 h-6 ${themeClasses.text}`} />
              <h2 className="text-2xl font-bold text-white">Data Security</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Your data security is important to us. Since Watchly stores most data locally in your browser, 
              you maintain control over your information. We do not transmit your personal viewing preferences 
              or watchlist to external servers. However, please note that no method of transmission over the 
              internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          {/* Third-Party Services */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
            <p className="text-slate-300 mb-4">
              Watchly integrates with the following third-party services:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                <span className="text-slate-300">
                  <strong className="text-white">TMDB (The Movie Database):</strong> For movie and TV show data. 
                  Please review <a href="https://www.themoviedb.org/privacy-policy" target="_blank" rel="noopener noreferrer" className={`${themeClasses.text} ${themeClasses.textHover} underline`}>TMDB's Privacy Policy</a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                <span className="text-slate-300">
                  <strong className="text-white">Google Gemini AI:</strong> For generating personalized recommendations. 
                  Review <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={`${themeClasses.text} ${themeClasses.textHover} underline`}>Google's Privacy Policy</a>
                </span>
              </li>
            </ul>
          </div>

          {/* Your Rights */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
            <p className="text-slate-300 mb-4">You have the right to:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                <span className="text-slate-300">Clear your watchlist and preferences at any time</span>
              </li>
              <li className="flex items-start gap-3">
                <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                <span className="text-slate-300">Delete your browser's localStorage data</span>
              </li>
              <li className="flex items-start gap-3">
                <div className={`w-2 h-2 ${themeClasses.button.split(' ')[0]} rounded-full mt-2`} />
                <span className="text-slate-300">Use Watchly without saving any data (incognito/private mode)</span>
              </li>
            </ul>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
            <p className="text-slate-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date. You are advised to 
              review this Privacy Policy periodically for any changes.
            </p>
          </div>

          {/* Contact */}
          <div className={`bg-gradient-to-r ${themeClasses.bg} rounded-xl p-8 border ${themeClasses.border}`}>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Questions About Privacy?
            </h2>
            <p className="text-slate-300 text-center mb-6">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
            <div className="flex justify-center">
              <a
                href="mailto:contact@watchly.app"
                className={`px-8 py-3 ${themeClasses.button} text-white font-semibold rounded-lg transition-all shadow-lg ${themeClasses.glow} hover:shadow-xl ${themeClasses.glowHover} hover:scale-105`}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPage;
