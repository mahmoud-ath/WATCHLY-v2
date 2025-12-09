import React, { useState, useEffect } from 'react';
import { discoverMovies, discoverTV, convertTMDBMovieToMovie, convertTMDBTVToMovie } from '../services/tmdbService';
import { Movie, LoadingState } from '../types';
import FilterPanel, { FilterState } from '../components/recommendations/FilterPanel';
import RecommendationGrid from '../components/recommendations/RecommendationGrid';
import LoadingGrid from '../components/common/LoadingGrid';
import ErrorMessage from '../components/common/ErrorMessage';

const RecommendationsPage: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const [filters, setFilters] = useState<FilterState>({
    contentType: 'movie',
    genres: [],
    yearFrom: currentYear - 5,
    yearTo: currentYear,
    minRating: 6.0,
  });

  const [allResults, setAllResults] = useState<Movie[]>([]);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Load initial recommendations on mount
  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    setStatus(LoadingState.LOADING);
    try {
      const fetchFunction = filters.contentType === 'movie' ? discoverMovies : discoverTV;
      
      const { results } = await fetchFunction({
        genres: filters.genres.length > 0 ? filters.genres : undefined,
        yearFrom: filters.yearFrom,
        yearTo: filters.yearTo,
        minRating: filters.minRating,
        sortBy: 'popularity.desc',
        page: currentPage,
      });

      const convertedResults = filters.contentType === 'movie'
        ? results.map(m => convertTMDBMovieToMovie(m))
        : results.map(s => convertTMDBTVToMovie(s));

      setAllResults(convertedResults);
      setDisplayedMovies(getRandomMovies(convertedResults, 5));
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      setStatus(LoadingState.ERROR);
    }
  };

  const getRandomMovies = (movies: Movie[], count: number): Movie[] => {
    const shuffled = [...movies].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, movies.length));
  };

  const handleShuffle = async () => {
    setIsShuffling(true);

    // If we have enough cached results, use them
    if (allResults.length >= 10) {
      // Find movies not currently displayed
      const notDisplayed = allResults.filter(
        movie => !displayedMovies.some(dm => dm.id === movie.id)
      );

      if (notDisplayed.length >= 5) {
        setDisplayedMovies(getRandomMovies(notDisplayed, 5));
      } else {
        // Mix displayed and not displayed
        setDisplayedMovies(getRandomMovies(allResults, 5));
      }
      
      setTimeout(() => setIsShuffling(false), 500);
    } else {
      // Fetch next page
      try {
        const nextPage = currentPage + 1;
        const fetchFunction = filters.contentType === 'movie' ? discoverMovies : discoverTV;
        
        const { results } = await fetchFunction({
          genres: filters.genres.length > 0 ? filters.genres : undefined,
          yearFrom: filters.yearFrom,
          yearTo: filters.yearTo,
          minRating: filters.minRating,
          sortBy: 'popularity.desc',
          page: nextPage,
        });

        const convertedResults = filters.contentType === 'movie'
          ? results.map(m => convertTMDBMovieToMovie(m))
          : results.map(s => convertTMDBTVToMovie(s));

        const newAllResults = [...allResults, ...convertedResults];
        setAllResults(newAllResults);
        setDisplayedMovies(getRandomMovies(convertedResults, 5));
        setCurrentPage(nextPage);
      } catch (error) {
        console.error('Error fetching more results:', error);
      }
      
      setIsShuffling(false);
    }
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    setAllResults([]);
    loadRecommendations();
  };

  if (status === LoadingState.LOADING && displayedMovies.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="space-y-8">
          <div className="bg-slate-900/50 rounded-xl h-24 animate-pulse" />
          <LoadingGrid count={5} />
        </div>
      </main>
    );
  }

  if (status === LoadingState.ERROR) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <ErrorMessage message="Failed to load recommendations. Please try again." />
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <div className="space-y-8">
        {/* Filter Panel - Horizontal */}
        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          onApply={handleApplyFilters}
        />

        {/* Recommendations Grid */}
        <RecommendationGrid
          movies={displayedMovies}
          onShuffle={handleShuffle}
          isShuffling={isShuffling}
        />
      </div>
    </main>
  );
};

export default RecommendationsPage;
