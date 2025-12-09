import React from 'react';
import { Movie } from '../../types';
import MovieCard from '../MovieCard';

interface MoviesGridProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

const MoviesGrid: React.FC<MoviesGridProps> = ({ movies, onMovieClick }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        No movies found. Try a different search!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onClick={onMovieClick} 
        />
      ))}
    </div>
  );
};

export default MoviesGrid;
