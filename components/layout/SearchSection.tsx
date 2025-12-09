import React from 'react';
import { SearchIcon } from '../Icons';
import { LoadingState } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface SearchSectionProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  status: LoadingState;
}

const SearchSection: React.FC<SearchSectionProps> = ({ 
  query, 
  onQueryChange, 
  onSubmit, 
  status 
}) => {
  const { themeClasses } = useTheme();
  return (
    <div className="max-w-3xl mx-auto mb-8 md:mb-16 text-center px-2">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-white tracking-tight">
        Find your next favorite movie.
      </h2>
      <p className="text-slate-400 text-base md:text-lg mb-6 md:mb-8">
        Powered by TMDB. Search for movies, TV shows, or trending content.
      </p>
      
      <form onSubmit={onSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
          <SearchIcon className={`h-4 w-4 md:h-5 md:w-5 text-slate-500 group-focus-within:${themeClasses.text} transition-colors`} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search movies or TV shows..."
          className="block w-full pl-10 md:pl-11 pr-20 md:pr-4 py-3 md:py-4 bg-slate-900 border border-slate-700 rounded-xl md:rounded-2xl text-sm md:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-xl"
        />
        <button 
          type="submit"
          disabled={status === LoadingState.LOADING}
          className={`absolute right-1.5 md:right-2 top-1.5 md:top-2 bottom-1.5 md:bottom-2 px-4 md:px-6 ${themeClasses.button} text-white font-medium rounded-lg md:rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base`}
        >
          <span className="hidden sm:inline">{status === LoadingState.LOADING ? 'Searching...' : 'Search'}</span>
          <SearchIcon className="sm:hidden h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default SearchSection;
