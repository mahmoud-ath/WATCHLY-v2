import React from 'react';
import { FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TermsPage: React.FC = () => {
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
                <FileText className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
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
              Welcome to Watchly! These Terms of Service ("Terms") govern your access to and use of Watchly's 
              website and services. By accessing or using Watchly, you agree to be bound by these Terms. If you 
              do not agree to these Terms, please do not use our service.
            </p>
          </div>

          {/* Acceptance of Terms */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className={`w-6 h-6 ${themeClasses.text}`} />
              <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              By creating an account, accessing our website, or using any of our services, you acknowledge 
              that you have read, understood, and agree to be bound by these Terms. If you are using Watchly 
              on behalf of an organization, you represent that you have the authority to bind that organization 
              to these Terms.
            </p>
          </div>

          {/* Use of Service */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className={`w-6 h-6 ${themeClasses.text}`} />
              <h2 className="text-2xl font-bold text-white">2. Use of Service</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Permitted Use</h3>
                <p className="text-slate-300 mb-2">You may use Watchly to:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <span className="text-slate-300">Discover and explore movies and TV shows</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <span className="text-slate-300">Receive AI-powered recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <span className="text-slate-300">Create and manage your personal watchlist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <span className="text-slate-300">Participate in our quiz game features</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Prohibited Use</h3>
                <p className="text-slate-300 mb-2">You agree NOT to:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <span className="text-slate-300">Use automated tools to scrape or extract data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <span className="text-slate-300">Attempt to bypass any security features</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <span className="text-slate-300">Abuse or overload our API services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <span className="text-slate-300">Use the service for any illegal or unauthorized purpose</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <span className="text-slate-300">Violate any applicable laws or regulations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                All content on Watchly, including but not limited to text, graphics, logos, and software, is 
                the property of Watchly or its content suppliers and is protected by copyright laws.
              </p>
              <p>
                Movie and TV show data, including posters, descriptions, and ratings, are provided by TMDB 
                (The Movie Database) and are subject to their terms of use.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">4. Disclaimer of Warranties</h2>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>
                Watchly is provided "as is" and "as available" without warranties of any kind, either express 
                or implied. We do not guarantee that:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                  <span>The service will be uninterrupted or error-free</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                  <span>All content will be accurate or up-to-date</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                  <span>Recommendations will always match your preferences</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                  <span>The service will meet your specific requirements</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p className="text-slate-300 leading-relaxed">
              To the maximum extent permitted by law, Watchly shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages resulting from your use or inability to use the service. 
              This includes, but is not limited to, damages for loss of data, loss of profits, or service interruptions.
            </p>
          </div>

          {/* Third-Party Content */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-4">6. Third-Party Content and Services</h2>
            <p className="text-slate-300 leading-relaxed">
              Watchly integrates with third-party services including TMDB and Google Gemini AI. We are not 
              responsible for the content, policies, or practices of these third-party services. Your use of 
              these services is subject to their respective terms and conditions.
            </p>
          </div>

          {/* User Data */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-4">7. User Data</h2>
            <p className="text-slate-300 leading-relaxed">
              You are responsible for maintaining the confidentiality of any data stored locally in your browser. 
              We recommend regularly backing up your watchlist and preferences. Watchly is not responsible for 
              data loss due to browser issues, cache clearing, or device changes.
            </p>
          </div>

          {/* Modifications */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-4">8. Modifications to Service and Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              We reserve the right to modify or discontinue Watchly at any time without notice. We may also 
              update these Terms periodically. Continued use of the service after changes constitutes acceptance 
              of the modified Terms.
            </p>
          </div>

          {/* Termination */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
            <p className="text-slate-300 leading-relaxed">
              We may terminate or suspend your access to Watchly immediately, without prior notice, if you 
              breach these Terms. Upon termination, your right to use the service will immediately cease.
            </p>
          </div>

          {/* Governing Law */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law</h2>
            <p className="text-slate-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard 
              to conflict of law provisions.
            </p>
          </div>

          {/* Contact */}
          <div className={`bg-gradient-to-r ${themeClasses.bg} rounded-xl p-8 border ${themeClasses.border}`}>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Questions About These Terms?
            </h2>
            <p className="text-slate-300 text-center mb-6">
              If you have any questions about these Terms of Service, please reach out to us.
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

export default TermsPage;
