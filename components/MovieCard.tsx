import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';
import { StarIcon, ClockIcon } from './Icons';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { createMovieSlug } from '../lib/utils';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const navigate = useNavigate();
  const { themeClasses } = useTheme();
  
  // Check if movie is in watchlist
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  
  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setIsInWatchlist(watchlist.some((m: Movie) => m.id === movie.id));
  }, [movie.id]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onClick) {
      onClick(movie);
    } else {
      // Navigate to details page with slug
      const slug = createMovieSlug(movie.title, parseInt(movie.id));
      navigate(`/movie/${slug}`);
    }
  };
  
  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    if (isInWatchlist) {
      // Remove from watchlist
      const updatedWatchlist = watchlist.filter((m: any) => m.id !== movie.id);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      setIsInWatchlist(false);
    } else {
      // Add to watchlist - transform Movie to WatchlistItem format
      const watchlistItem = {
        id: movie.id,
        title: movie.title,
        posterUrl: movie.posterUrl || '',
        rating: movie.rating,
        year: movie.year,
        genres: movie.genre, // Transform 'genre' to 'genres'
        addedAt: new Date().toISOString(),
      };
      watchlist.push(watchlistItem);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      setIsInWatchlist(true);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${themeClasses.glowHover} bg-slate-800 border border-slate-700`}
    >
      {/* Watchlist Button */}
      <button
        onClick={handleWatchlistClick}
        className={`absolute top-1.5 md:top-2 right-1.5 md:right-2 z-10 p-1.5 md:p-2 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 ${themeClasses.button.replace('bg-', 'hover:bg-').replace('hover:bg-', 'hover:bg-')} ${themeClasses.borderHover} transition-all duration-300 hover:scale-110 group/btn`}
        aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        {isInWatchlist ? (
          <BookmarkCheck className={`w-3.5 h-3.5 md:w-4 md:h-4 ${themeClasses.text} group-hover/btn:text-white transition-colors`} />
        ) : (
          <Bookmark className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-300 group-hover/btn:text-white transition-colors" />
        )}
      </button>
      
      <div className="aspect-[2/3] w-full relative overflow-hidden">
        {/* Movie Poster from TMDB or Gradient Fallback */}
        {movie.posterUrl ? (
          <img 
            src={movie.posterUrl} 
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div 
            className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            style={{ 
              background: `linear-gradient(to bottom right, ${movie.posterColor || '#334155'}, #0f172a)` 
            }}
          />
        )}
        
        {/* Content Overlay */}
        <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-end bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
             <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                <span className="px-1.5 md:px-2 py-0.5 rounded text-[9px] md:text-[10px] font-bold bg-indigo-500 text-white uppercase tracking-wider">
                  {movie.genre[0]}
                </span>
                <div className="flex items-center text-yellow-400 text-[10px] md:text-xs font-medium">
                  <StarIcon className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1" fill="currentColor" />
                  {movie.rating}
                </div>
             </div>
             
             <h3 className="text-sm md:text-xl font-bold text-white leading-tight mb-1 group-hover:text-indigo-300 transition-colors line-clamp-2">
               {movie.title}
             </h3>
             
             <div className="flex items-center text-slate-400 text-[10px] md:text-sm mb-1.5 md:mb-3">
               <span>{movie.year}</span>
               <span className="mx-1 md:mx-2">•</span>
               <div className="flex items-center">
                 <ClockIcon className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1" />
                 {movie.duration}
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
