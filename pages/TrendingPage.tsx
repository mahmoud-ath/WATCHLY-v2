import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchTrendingMoviesWithPage, convertTMDBMovieToMovie } from '../services/tmdbService';
import { Movie, LoadingState } from '../types';
import MoviesGrid from '../components/layout/MoviesGrid';
import LoadingGrid from '../components/common/LoadingGrid';
import ErrorMessage from '../components/common/ErrorMessage';
import { ArrowLeft ,Flame} from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/ui/pagination';

const TrendingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState<LoadingState>(LoadingState.LOADING);
  const [totalPages, setTotalPages] = useState(1);
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    loadTrendingMovies(currentPage);
  }, [currentPage]);

  const loadTrendingMovies = async (page: number) => {
    setStatus(LoadingState.LOADING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    try {
      const { results, total_pages } = await fetchTrendingMoviesWithPage('week', page);
      const convertedMovies = results.map(m => convertTMDBMovieToMovie(m));
      setMovies(convertedMovies);
      setTotalPages(Math.min(total_pages, 500)); // TMDB limits to 500 pages
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error('Failed to load trending movies:', error);
      setStatus(LoadingState.ERROR);
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const handleBack = () => {
    navigate('/');
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    // Always show first page
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => handlePageChange(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if needed
    if (showEllipsisStart) {
      pages.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis if needed
    if (showEllipsisEnd) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      {/* Header with Back Button */}
      <div className="mb-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>
        
        <div className="space-y-2">
          
         <h1 className="text-4xl font-bold text-white flex items-center gap-3">
  <Flame className="w-8 h-8 text-orange-500" />
  Trending Movies
</h1>
          <p className="text-slate-400 text-lg">
            Discover the most popular movies right now · Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>

      {/* Content */}
      {status === LoadingState.LOADING && <LoadingGrid count={20} />}
      
      {status === LoadingState.ERROR && <ErrorMessage message="Failed to load trending movies. Please try again." />}
      
      {status === LoadingState.SUCCESS && movies.length > 0 && (
        <div className="space-y-8">
          <MoviesGrid movies={movies} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 mb-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  
                  {renderPageNumbers()}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}

      {status === LoadingState.SUCCESS && movies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No trending movies available.</p>
        </div>
      )}
    </main>
  );
};

export default TrendingPage;
