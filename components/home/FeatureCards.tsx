import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Gamepad2, Bookmark, TrendingUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const FeatureCards: React.FC = () => {
  const { themeClasses } = useTheme();
  
  const features = [
    {
      title: 'Recommendations',
      description: 'Get personalized movie suggestions ',
      icon: <Sparkles className="w-8 h-8" />,
      link: '/recommendations',
      color: 'indigo',
      iconBg: themeClasses.button
    },
    {
      title: 'Movie Quiz Game',
      description: 'Test your movie knowledge with fun quizzes',
      icon: <Gamepad2 className="w-8 h-8" />,
      link: '/play-game',
      color: 'pink',
      iconBg: 'bg-pink-600'
    },
    {
      title: 'My Watchlist',
      description: 'Save and organize movies you want to watch',
      icon: <Bookmark className="w-8 h-8" />,
      link: '/watchlist',
      color: 'cyan',
      iconBg: 'bg-cyan-600'
    },
    // {
    //   title: 'Trending Now',
    //   description: 'Discover what everyone is watching today',
    //   icon: <TrendingUp className="w-8 h-8" />,
    //   link: '/trending',
    //   color: 'orange',
    //   iconBg: 'bg-orange-600'
    // }
  ];

  return (
    <section className="py-0 sm:py-0">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Explore More
        </h2>
        <p className="text-slate-400 text-lg">
          Discover all the features Watchly has to offer
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.link}
            className="group relative overflow-hidden rounded-2xl border-2 border-slate-800 hover:border-slate-700 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="p-6 sm:p-8">
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl ${feature.iconBg} mb-4`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-slate-200">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Arrow */}
              <div className="mt-4 flex items-center text-slate-400 group-hover:text-white transition-colors">
                <span className="text-sm font-medium">Explore</span>
                <svg 
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Animated background */}
            <div className="absolute inset-0 bg-slate-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
