import React from 'react';
import { Movie } from '../../types';
import MovieCard from '../MovieCard';
import { Shuffle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface RecommendationGridProps {
  movies: Movie[];
  onShuffle: () => void;
  isShuffling: boolean;
}

const RecommendationGrid: React.FC<RecommendationGridProps> = ({ 
  movies, 
  onShuffle, 
  isShuffling 
}) => {
  const { themeClasses } = useTheme();
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Your Recommendations
          </h2>
          <p className="text-slate-400 mt-1">
            {movies.length} personalized picks for you
          </p>
        </div>
        
        {/* Shuffle Button */}
        <button
          onClick={onShuffle}
          disabled={isShuffling}
          className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${themeClasses.button} hover:opacity-90 text-white font-semibold rounded-lg transition-all shadow-lg ${themeClasses.glow} hover:shadow-xl ${themeClasses.glowHover} disabled:opacity-50 disabled:cursor-not-allowed group`}
        >
          <Shuffle className={`w-5 h-5 ${isShuffling ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          <span>{isShuffling ? 'Shuffling...' : 'Shuffle'}</span>
        </button>
      </div>

      {/* Grid */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
            <Shuffle className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-slate-400 text-lg">No recommendations found</p>
          <p className="text-slate-500 text-sm mt-2">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationGrid;
