import React from 'react';
import { Play, Star } from 'lucide-react';
import { getPosterUrl } from '../../services/tmdbService';

interface SimilarMovie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
}

interface SimilarMoviesGridProps {
  similar: SimilarMovie[];
  mediaType: 'movie' | 'tv';
  onMovieClick: (movieId: number, mediaType: string, title: string) => void;
}

export const SimilarMoviesGrid: React.FC<SimilarMoviesGridProps> = ({ 
  similar, 
  mediaType,
  onMovieClick 
}) => {
  if (similar.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-1 md:w-1.5 h-6 md:h-8 bg-indigo-500 rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-bold text-white">You May Also Like</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
        {similar.slice(0, 12).map((item) => (
          <button
            key={item.id}
            onClick={() => onMovieClick(item.id, mediaType, item.title || item.name || '')}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-slate-800/30 border border-slate-800/50 hover:border-slate-700 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative aspect-[2/3] overflow-hidden">
              <img
                src={getPosterUrl(item.poster_path)}
                alt={item.title || item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Play Icon on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="p-2 md:p-3">
              <p className="text-xs md:text-sm font-medium text-white text-left line-clamp-2 mb-1">
                {item.title || item.name}
              </p>
              <div className="flex items-center gap-1 md:gap-2">
                <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-[10px] md:text-xs text-slate-400">
                  {Math.round((item.vote_average || 0) * 10) / 10}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
