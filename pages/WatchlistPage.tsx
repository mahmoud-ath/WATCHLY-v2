import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../contexts/WatchlistContext';
import { useTheme } from '../contexts/ThemeContext';
import { Bookmark, Trash2, Calendar, Filter, Star } from 'lucide-react';
import { createMovieSlug } from '../lib/utils';

const WatchlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();
  const { themeClasses } = useTheme();
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'rating'>('recent');

  const sortedWatchlist = [...watchlist].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
      default:
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    }
  });

  const handleRemove = (movieId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromWatchlist(movieId);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      clearWatchlist();
    }
  };

  const handleMovieClick = (movieId: string, title: string) => {
    const slug = createMovieSlug(title, parseInt(movieId));
    navigate(`/movie/${slug}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 ${themeClasses.bg} rounded-xl`}>
                <Bookmark className={`w-8 h-8 ${themeClasses.text}`} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">My Watchlist</h1>
                <p className="text-slate-400 mt-1">
                  {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved
                </p>
              </div>
            </div>

            {watchlist.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {/* Sort Options */}
          {watchlist.length > 0 && (
            <div className="flex items-center gap-4 bg-slate-900/50 rounded-xl p-4 border border-slate-800">
              <Filter className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400 text-sm font-medium">Sort by:</span>
              <div className="flex gap-2">
                {[
                  { value: 'recent', label: 'Recently Added' },
                  { value: 'title', label: 'Title' },
                  { value: 'rating', label: 'Rating' },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      sortBy === option.value
                        ? `${themeClasses.button} text-white`
                        : 'bg-slate-800/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6">
              <Bookmark className="w-12 h-12 text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your watchlist is empty</h2>
            <p className="text-slate-400 mb-8 max-w-md">
              Start adding movies and TV shows you want to watch. They'll appear here.
            </p>
            <a
              href="/"
              className={`px-6 py-3 ${themeClasses.button} text-white rounded-lg transition-colors font-medium`}
            >
              Discover Movies
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sortedWatchlist.map((movie) => (
              <div key={movie.id} className="relative group">
                <button
                  onClick={() => handleMovieClick(movie.id, movie.title)}
                  className="w-full text-left"
                >
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-slate-900/90 backdrop-blur-sm rounded-lg">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-semibold text-white">{movie.rating}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{movie.year}</span>
                      {movie.genres && movie.genres.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{movie.genres[0]}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>Added {new Date(movie.addedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </button>

                {/* Remove Button */}
                <button
                  onClick={(e) => handleRemove(movie.id, e)}
                  className="absolute top-2 right-2 z-10 p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                  title="Remove from watchlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default WatchlistPage;
