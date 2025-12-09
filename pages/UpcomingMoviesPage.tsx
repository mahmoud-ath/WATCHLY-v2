import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchUpcomingMoviesWithPage, convertTMDBMovieToMovie } from '../services/tmdbService';
import { Movie, LoadingState } from '../types';
import LoadingGrid from '../components/common/LoadingGrid';
import ErrorMessage from '../components/common/ErrorMessage';
import MoviesGrid from '../components/layout/MoviesGrid';
import { ArrowLeft, Calendar } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/ui/pagination';

const UpcomingMoviesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [totalPages, setTotalPages] = useState(1);
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    loadUpcomingMovies(currentPage);
  }, [currentPage]);

  const loadUpcomingMovies = async (page: number) => {
    setStatus(LoadingState.LOADING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    try {
      const { results, total_pages } = await fetchUpcomingMoviesWithPage(page);
      const convertedMovies = results.map(m => convertTMDBMovieToMovie(m));
      setMovies(convertedMovies);
      setTotalPages(Math.min(total_pages, 500));
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error('Error loading upcoming movies:', error);
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

    if (showEllipsisStart) {
      pages.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

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

    if (showEllipsisEnd) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

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

  if (status === LoadingState.LOADING) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <LoadingGrid count={20} />
      </main>
    );
  }

  if (status === LoadingState.ERROR) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <ErrorMessage message="Failed to load upcoming movies. Please try again." />
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
  <Calendar className="w-8 h-8 text-cyan-500" />
  <span>Upcoming Movies</span>
</h1>
          <p className="text-slate-400 mt-2">
            Movies coming soon · Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>

      {/* Movies Grid */}
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
    </main>
  );
};

export default UpcomingMoviesPage;
