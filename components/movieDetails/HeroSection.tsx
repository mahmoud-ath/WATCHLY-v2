import React from 'react';
import { ArrowLeft, Play, Star, Bookmark, BookmarkPlus, Share2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeroSectionProps {
  backdropUrl: string;
  posterUrl: string;
  title: string;
  year: number;
  rating: number;
  runtime: string;
  genres: string[];
  mediaType: 'movie' | 'tv';
  status: string;
  isInWatchlist: boolean;
  mainTrailer?: { key: string; name: string; type: string };
  onBack: () => void;
  onToggleWatchlist: () => void;
  onShare: () => void;
  onPlayTrailer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  backdropUrl,
  posterUrl,
  title,
  year,
  rating,
  runtime,
  genres,
  mediaType,
  status,
  isInWatchlist,
  mainTrailer,
  onBack,
  onToggleWatchlist,
  onShare,
  onPlayTrailer,
}) => {
  const { themeClasses } = useTheme();
  
  return (
    <div className="relative h-[60vh] md:h-[85vh] min-h-[500px] md:min-h-[600px] max-h-[800px]">
      {/* Backdrop Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={backdropUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 z-20 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-slate-900/70 hover:bg-slate-800 text-white rounded-xl transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-slate-800/30 text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-medium">Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleWatchlist}
            className={`p-2 md:p-2.5 rounded-xl backdrop-blur-md transition-all duration-300 ${isInWatchlist ? `${themeClasses.button}/90` : 'bg-slate-900/70 hover:bg-slate-800'}`}
          >
            <Bookmark className={`w-4 h-4 md:w-5 md:h-5 ${isInWatchlist ? 'fill-white text-white' : 'text-white'}`} />
          </button>
          <button
            onClick={onShare}
            className="p-2 md:p-2.5 bg-slate-900/70 hover:bg-slate-800 text-white rounded-xl transition-all duration-300 backdrop-blur-md"
          >
            <Share2 className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-8 md:pb-16">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8 w-full items-start">
          {/* Poster */}
          <div className="relative w-32 md:w-48 lg:w-72 flex-shrink-0">
            <img
              src={posterUrl}
              alt={title}
              className="w-full rounded-xl md:rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1 space-y-3 md:space-y-6">
            {/* Title and Year */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 leading-tight">
                {title}
                <span className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-normal text-slate-400 ml-2 md:ml-4">
                  ({year})
                </span>
              </h1>
              
              {/* Tagline / Status */}
              <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4 flex-wrap">
                <span className="px-2 md:px-3 py-1 bg-slate-800/50 rounded-full text-xs md:text-sm text-slate-300 backdrop-blur-sm">
                  {mediaType === 'tv' ? 'TV Series' : status}
                </span>
                <span className="text-slate-400 hidden sm:inline">•</span>
                <span className="text-slate-300 text-xs md:text-sm">{runtime}</span>
              </div>
            </div>

            {/* Rating and Genres */}
            <div className="flex flex-wrap items-center gap-3 md:gap-6">
              {/* Rating Badge */}
              <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 bg-slate-900/70 rounded-xl backdrop-blur-md">
                <Star className="w-4 h-4 md:w-6 md:h-6 text-yellow-500 fill-yellow-500" />
                <div>
                  <p className="text-lg md:text-2xl font-bold text-white">{rating}/10</p>
                  <p className="text-[10px] md:text-xs text-slate-400">TMDB Score</p>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="px-2 md:px-3 py-1 md:py-1.5 bg-slate-800/50 rounded-lg text-xs md:text-sm text-slate-300 backdrop-blur-sm border border-slate-700/50"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 pt-1 md:pt-2">
              {mainTrailer && (
                <button
                  onClick={onPlayTrailer}
                  className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3.5 ${themeClasses.button} text-white rounded-xl transition-all duration-300 font-semibold shadow-lg group text-sm md:text-base`}
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                  <span>Watch Trailer</span>
                </button>
              )}

              <button
                onClick={onToggleWatchlist}
                className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl transition-all duration-300 font-semibold text-sm md:text-base ${
                  isInWatchlist 
                    ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                    : 'bg-slate-800/50 hover:bg-slate-800 text-white backdrop-blur-sm'
                }`}
              >
                {isInWatchlist ? (
                  <>
                    <Bookmark className="w-4 h-4 md:w-5 md:h-5 fill-white" />
                    <span className="hidden sm:inline">In Watchlist</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">Add to Watchlist</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  );
};
