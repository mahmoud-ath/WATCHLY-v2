import React from 'react';
import { LoadingState } from '../../types';
import LoadingGrid from '../common/LoadingGrid';
import ErrorMessage from '../common/ErrorMessage';
import ResultsHeader from './ResultsHeader';
import MoviesGrid from './MoviesGrid';
import { Movie } from '../../types';

interface ResultsSectionProps {
  status: LoadingState;
  movies: Movie[];
  query: string;
  onMovieClick?: (movie: Movie) => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  status, 
  movies, 
  query, 
  onMovieClick 
}) => {
  // Loading state with skeleton
  if (status === LoadingState.LOADING) {
    return <LoadingGrid count={8} />;
  }

  // Error state
  if (status === LoadingState.ERROR) {
    return <ErrorMessage message="Something went wrong. Please try again." />;
  }

  // Idle state - don't show anything
  if (status === LoadingState.IDLE) {
    return null;
  }

  // Success state with no results
  if (status === LoadingState.SUCCESS && movies.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
          <svg 
            className="w-8 h-8 text-slate-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <p className="text-slate-400 text-lg">No movies found for "{query}"</p>
        <p className="text-slate-500 text-sm mt-2">Try a different search term</p>
      </div>
    );
  }

  // Success state with results
  if (status === LoadingState.SUCCESS && movies.length > 0) {
    return (
      <div className="space-y-8">
        <ResultsHeader 
          query={query} 
          totalResults={movies.length}
        />
        <MoviesGrid movies={movies} onMovieClick={onMovieClick} />
      </div>
    );
  }

  return null;
};

export default ResultsSection;
