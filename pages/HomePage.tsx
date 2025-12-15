import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/movieService';
import { 
  fetchTrending,
  fetchTopRatedMovies, 
  fetchTopRatedTV, 
  fetchUpcomingMovies,
  convertTMDBMovieToMovie,
  convertTMDBTVToMovie
} from '../services/tmdbService';
import { Movie, LoadingState } from '../types';
import SearchSection from '../components/layout/SearchSection';
import ResultsSection from '../components/layout/ResultsSection';
import ContentCarousel from '../components/layout/ContentCarousel';
import LoadingGrid from '../components/common/LoadingGrid';
import HeroSection from '../components/home/HeroSection';
import FeatureCards from '../components/home/FeatureCards';
import { Flame, Film, Trophy, Calendar } from 'lucide-react';

const HomePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchStatus, setSearchStatus] = useState<LoadingState>(LoadingState.IDLE);

  // Carousel states
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [topRatedTV, setTopRatedTV] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [carouselsLoading, setCarouselsLoading] = useState(true);

  // Load all carousels on mount
  useEffect(() => {
    loadCarousels();
  }, []);

  const loadCarousels = async () => {
    setCarouselsLoading(true);
    try {
      const [trending, topMovies, topTV, upcoming] = await Promise.all([
        fetchTrending('movie'),
        fetchTopRatedMovies(),
        fetchTopRatedTV(),
        fetchUpcomingMovies(),
      ]);
      
      setTrendingMovies(trending.map(m => convertTMDBMovieToMovie(m)));
      setTopRatedMovies(topMovies.map(m => convertTMDBMovieToMovie(m)));
      setTopRatedTV(topTV.map(s => convertTMDBTVToMovie(s)));
      setUpcomingMovies(upcoming.map(m => convertTMDBMovieToMovie(m)));
    } catch (error) {
      console.error('Error loading carousels:', error);
    } finally {
      setCarouselsLoading(false);
    }
  };

  // Debounced search function
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchStatus(LoadingState.IDLE);
      return;
    }

    const debounceTimer = setTimeout(() => {
      handleSearch(query);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setSearchStatus(LoadingState.LOADING);
    try {
      const results = await fetchMovies(searchQuery);
      setSearchResults(results);
      setSearchStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error('Search error:', error);
      setSearchStatus(LoadingState.ERROR);
    }
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
    }
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    // If query is cleared, reset search results
    if (!newQuery.trim()) {
      setSearchResults([]);
      setSearchStatus(LoadingState.IDLE);
    }
  };

  // Show search results if there's a query, otherwise show carousels
  const showSearchResults = query.trim().length > 0;

  return (
    <main className="max-w-7xl mx-auto px-3 md:px-4 sm:px-6 lg:px-8 pt-0">
      {/* Hero Section - Only show when NOT searching */}
      {!showSearchResults && !carouselsLoading && (
        <HeroSection />
      )}

      {/* Search Section */}
      <SearchSection
        query={query}
        onQueryChange={handleQueryChange}
        onSubmit={onSearchSubmit}
        status={searchStatus}
      />

      {/* Search Results Section - Only show when searching */}
      {showSearchResults && (
        <section className="mt-8">
          <ResultsSection
            status={searchStatus}
            movies={searchResults}
            query={query}
          />
        </section>
      )}

     

      {/* Carousels Section - Only show when NOT searching */}
      {!showSearchResults && (
        <>
          {carouselsLoading ? (
            <div className="mt-16 space-y-16">
              <LoadingGrid count={10} />
              <LoadingGrid count={10} />
              <LoadingGrid count={10} />
              <LoadingGrid count={10} />
            </div>
          ) : (
            <div className="mt-16 space-y-16">
              {/* Trending Now */}
              {trendingMovies.length > 0 && (
                <ContentCarousel
                  title="Trending Now"
                  description="Discover what's popular today"
                  movies={trendingMovies}
                  viewAllRoute="/trending"
                  icon={<Flame className="w-6 h-6 text-orange-500" />}
                />
              )}

              {/* Top Rated Movies */}
              {topRatedMovies.length > 0 && (
                <ContentCarousel
                  title="Top Rated Movies"
                  description="Critically acclaimed cinema"
                  movies={topRatedMovies}
                  viewAllRoute="/top-rated-movies"
                  icon={<Film className="w-6 h-6 text-indigo-500" />}
                />
              )}
 {/* Feature Cards - Only show when NOT searching */}
      {!showSearchResults && !carouselsLoading && (
        <FeatureCards />
      )}
              {/* Top Rated TV Series */}
              {topRatedTV.length > 0 && (
                <ContentCarousel
                  title="Top Rated TV Series"
                  description="Must-watch television"
                  movies={topRatedTV}
                  viewAllRoute="/top-rated-tv"
                  icon={<Trophy className="w-6 h-6 text-yellow-500" />}
                />
              )}

              {/* Upcoming Movies */}
              {upcomingMovies.length > 0 && (
                <ContentCarousel
                  title="Upcoming Movies"
                  description="Coming soon to theaters"
                  movies={upcomingMovies}
                  viewAllRoute="/upcoming-movies"
                  icon={<Calendar className="w-6 h-6 text-cyan-500" />}
                />
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default HomePage;
