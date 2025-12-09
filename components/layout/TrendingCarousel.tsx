import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import MovieCard from '../MovieCard';
import { ArrowRight } from 'lucide-react';

interface TrendingCarouselProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

const TrendingCarousel: React.FC<TrendingCarouselProps> = ({
  movies,
  onMovieClick,
}) => {
  const navigate = useNavigate();
  const { themeClasses } = useTheme();
  const displayMovies = movies.slice(0, 10);

  const handleViewAll = () => {
    navigate('/trending');
  };

  return (
    <div className="space-y-6">
      {/* Header with View All button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Trending Now</h2>
          <p className="text-slate-400 mt-1 text-sm md:text-base">Discover what's popular today</p>
        </div>
        <button
          onClick={handleViewAll}
          className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 ${themeClasses.button} text-white rounded-lg transition-colors font-medium text-sm md:text-base`}
        >
          <span className="hidden sm:inline">View All</span>
          <span className="sm:hidden">All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Carousel */}
      <div className="relative px-8 md:px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {displayMovies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <div className="p-1">
                  <MovieCard movie={movie} onClick={() => onMovieClick?.(movie)} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-6 h-8 w-8 md:h-10 md:w-10" />
          <CarouselNext className="-right-4 md:-right-6 h-8 w-8 md:h-10 md:w-10" />
        </Carousel>
      </div>
    </div>
  );
};

export default TrendingCarousel;
