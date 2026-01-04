import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useWatchlist } from '../contexts/WatchlistContext';
import { useTheme } from '../contexts/ThemeContext';
import { fetchTVDetails } from '../services/tmdbService';
import { extractIdFromSlug, createMovieSlug } from '../lib/utils';
import { LoadingState } from '../types';
import { Tv } from 'lucide-react';
import { HeroSection } from '../components/movieDetails/HeroSection';
import { SynopsisSection } from '../components/movieDetails/SynopsisSection';
import { CastCrewCard } from '../components/movieDetails/CastCrewCard';
import { DetailsCard } from '../components/movieDetails/DetailsCard';
import { QuickStatsCard } from '../components/movieDetails/QuickStatsCard';
import { WatchOptions } from '../components/movieDetails/WatchOptions';
import { SimilarMoviesGrid } from '../components/movieDetails/SimilarMoviesGrid';
import { TrailerModal } from '../components/movieDetails/TrailerModal';

interface TVSeriesDetails {
  id: number;
  title: string;
  year: number;
  rating: number;
  overview: string;
  runtime: string;
  genres: string[];
  director: string;
  cast: string[];
  releaseDate: string;
  budget: string;
  revenue: string;
  status: string;
  posterUrl: string;
  backdropUrl: string;
  trailers: { key: string; name: string; type: string }[];
  similar: any[];
  watchProviders: any;
  productionCompanies: { name: string; logo_path: string | null }[];
  mediaType: 'tv';
  numberOfSeasons: number;
  numberOfEpisodes: number;
  episodeRuntime: string;
}

const getPosterUrl = (path: string, size = 'w500') => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder-poster.jpg';
};

const getBackdropUrl = (path: string, size = 'original') => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder-backdrop.jpg';
};

const TVSeriesDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { themeClasses } = useTheme();
  const [details, setDetails] = useState<TVSeriesDetails | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [playingTrailer, setPlayingTrailer] = useState(false);

  // Extract ID from slug
  const id = slug ? extractIdFromSlug(slug).toString() : '';

  useEffect(() => {
    if (!id || id === '0') {
      navigate('/404', { replace: true });
      return;
    }
    loadTVSeriesDetails(id);
  }, [id, navigate]);

  const handleToggleWatchlist = () => {
    if (!details || !id) return;
    
    toggleWatchlist({
      id: `tv-${id}`,
      title: details.title,
      posterUrl: details.posterUrl,
      rating: details.rating,
      year: details.year,
      genres: details.genres,
      addedAt: new Date().toISOString(),
    });
  };

  const loadTVSeriesDetails = async (tvId: string) => {
    setStatus(LoadingState.LOADING);
    try {
      const numericId = parseInt(tvId);

      const data = await fetchTVDetails(numericId);
      setDetails({
        id: numericId,
        title: data.details.name,
        year: new Date(data.details.first_air_date).getFullYear(),
        rating: Math.round(data.details.vote_average * 10) / 10,
        overview: data.details.overview,
        runtime: data.details.episode_run_time.length > 0 ? `${data.details.episode_run_time[0]}m per episode` : 'N/A',
        genres: data.details.genres.map(g => g.name),
        director: data.details.created_by && data.details.created_by.length > 0 
          ? data.details.created_by.map(c => c.name).join(', ') 
          : 'Unknown',
        cast: data.credits.cast.slice(0, 10).map(c => c.name),
        releaseDate: data.details.first_air_date,
        budget: 'N/A',
        revenue: 'N/A',
        status: data.details.status || 'Series',
        posterUrl: getPosterUrl(data.details.poster_path, 'original'),
        backdropUrl: getBackdropUrl(data.details.backdrop_path, 'original'),
        trailers: data.videos,
        similar: data.similar,
        watchProviders: data.watchProviders,
        productionCompanies: data.details.production_companies || [],
        mediaType: 'tv',
        numberOfSeasons: data.details.number_of_seasons || 0,
        numberOfEpisodes: data.details.number_of_episodes || 0,
        episodeRuntime: data.details.episode_run_time.length > 0 ? `${data.details.episode_run_time[0]}m` : 'N/A',
      });
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error('Error loading TV series details:', error);
      setStatus(LoadingState.ERROR);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSimilarClick = (tvId: number, mediaType: string, title: string) => {
    const slug = createMovieSlug(title, tvId);
    navigate(`/tv/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleShare = () => {
    if (details) {
      const slug = createMovieSlug(details.title, details.id);
      const url = `${window.location.origin}/tv/${slug}`;
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  if (status === LoadingState.LOADING) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 ${themeClasses.border.replace('border-', 'border-t-2 border-b-2 border-')} mx-auto mb-4`}></div>
          <p className="text-slate-400 text-lg">Loading TV series details...</p>
        </div>
      </div>
    );
  }

  if (status === LoadingState.ERROR || !details) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tv className="w-10 h-10 text-rose-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Failed to load TV series details</h3>
          <p className="text-slate-400 mb-6">Please check your connection and try again.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleBack}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all duration-300 font-medium"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className={`px-6 py-2.5 ${themeClasses.button} text-white rounded-lg transition-all duration-300 font-medium`}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const mainTrailer = details.trailers.find(t => t.type === 'Trailer') || details.trailers[0];
  const usProviders = details.watchProviders?.US;
  const tvIsInWatchlist = id ? isInWatchlist(`tv-${id}`) : false;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <HeroSection
        backdropUrl={details.backdropUrl}
        posterUrl={details.posterUrl}
        title={details.title}
        year={details.year}
        rating={details.rating}
        runtime={details.runtime}
        genres={details.genres}
        mediaType={details.mediaType}
        status={details.status}
        isInWatchlist={tvIsInWatchlist}
        mainTrailer={mainTrailer}
        onBack={handleBack}
        onToggleWatchlist={handleToggleWatchlist}
        onShare={handleShare}
        onPlayTrailer={() => setPlayingTrailer(true)}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-16 relative z-20">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl md:rounded-2xl border border-slate-800/50 shadow-2xl overflow-hidden">
          {/* Content Area */}
          <div className="p-4 md:p-8 space-y-8 md:space-y-12">
            {/* Synopsis */}
            <SynopsisSection overview={details.overview} />

            {/* TV Series Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                <p className="text-slate-400 text-sm mb-1">Seasons</p>
                <p className="text-2xl font-bold text-white">{details.numberOfSeasons}</p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                <p className="text-slate-400 text-sm mb-1">Episodes</p>
                <p className="text-2xl font-bold text-white">{details.numberOfEpisodes}</p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                <p className="text-slate-400 text-sm mb-1">Episode Length</p>
                <p className="text-2xl font-bold text-white">{details.episodeRuntime}</p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                <p className="text-slate-400 text-sm mb-1">Status</p>
                <p className="text-lg font-bold text-emerald-400">{details.status}</p>
              </div>
            </section>

            {/* Details Grid */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <CastCrewCard director={details.director} cast={details.cast} />
                <DetailsCard
                  releaseDate={details.releaseDate}
                  runtime={details.runtime}
                  budget={details.budget}
                  revenue={details.revenue}
                />
                <QuickStatsCard
                  rating={details.rating}
                  genresCount={details.genres.length}
                  castCount={details.cast.length}
                />
              </div>
            </section>

            {/* Watch Options */}
            <WatchOptions watchProviders={usProviders} />

            {/* Similar TV Series */}
            <SimilarMoviesGrid
              similar={details.similar}
              mediaType={details.mediaType}
              onMovieClick={handleSimilarClick}
            />
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={playingTrailer}
        trailer={mainTrailer}
        onClose={() => setPlayingTrailer(false)}
      />
    </div>
  );
};

export default TVSeriesDetailsPage;
