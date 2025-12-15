import React, { useEffect, useState } from 'react';
import { Movie, MovieDetails } from '../types';
import { fetchMovieDetails } from '../services/movieService';
import { XIcon, StarIcon, ClockIcon, FilmIcon } from './Icons';

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ movie, onClose }) => {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(movie.id); // Changed from movie.title to movie.id
        if (isMounted) setDetails(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadDetails();
    return () => { isMounted = false; };
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors"
        >
          <XIcon className="w-6 h-6" />
        </button>

        {/* Left Side: "Poster" / Visual */}
        <div className="w-full md:w-1/3 h-64 md:h-auto relative bg-slate-800 shrink-0">
          {/* Movie Poster or Gradient Fallback */}
          {(details?.posterUrl || movie.posterUrl) ? (
            <img 
              src={details?.posterUrl || movie.posterUrl} 
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div 
              className="absolute inset-0"
              style={{ 
                background: `linear-gradient(to bottom right, ${movie.posterColor || details?.posterColor || '#4f46e5'}, #0f172a)` 
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <FilmIcon className="w-32 h-32 text-white" />
              </div>
            </div>
          )}
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-900 to-transparent md:hidden">
            <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="hidden md:block mb-6">
            <h2 className="text-4xl font-bold text-white mb-2">{movie.title}</h2>
            <div className="flex flex-wrap items-center gap-4 text-slate-400">
               <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-semibold border border-indigo-500/30">
                 {movie.genre.join(', ')}
               </span>
               <div className="flex items-center text-yellow-400 font-medium">
                 <StarIcon className="w-4 h-4 mr-1" fill="currentColor"/> {movie.rating}
               </div>
               <div className="flex items-center">
                 <ClockIcon className="w-4 h-4 mr-1"/> {movie.duration}
               </div>
               <span>{movie.year}</span>
            </div>
          </div>

          {loading ? (
             <div className="space-y-4 animate-pulse">
               <div className="h-4 bg-slate-700 rounded w-3/4"></div>
               <div className="h-4 bg-slate-700 rounded w-full"></div>
               <div className="h-4 bg-slate-700 rounded w-5/6"></div>
               <div className="h-32 bg-slate-700 rounded mt-8"></div>
             </div>
          ) : details ? (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Plot</h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {details.fullPlot}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Cast</h3>
                   <ul className="space-y-2">
                     {details.cast.slice(0, 5).map((actor, idx) => (
                       <li key={idx} className="text-slate-200 border-b border-slate-800 pb-1 last:border-0">{actor}</li>
                     ))}
                   </ul>
                </div>
                <div>
                   <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Trivia</h3>
                   <ul className="space-y-2">
                     {details.trivia.slice(0, 3).map((item, idx) => (
                       <li key={idx} className="text-slate-300 text-sm italic">"{item}"</li>
                     ))}
                   </ul>
                </div>
              </div>

              {details.similarMovies.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">If you liked this</h3>
                  <div className="flex flex-wrap gap-2">
                    {details.similarMovies.map((sim, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700 transition-colors">
                        {sim}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trailers Section */}
              {details.trailers && details.trailers.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Trailers</h3>
                  <div className="space-y-2">
                    {details.trailers.slice(0, 2).map((trailer, idx) => (
                      <a 
                        key={idx}
                        href={`https://www.youtube.com/watch?v=${trailer.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-red-900/30 rounded-lg transition-colors group"
                      >
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-colors">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-200 font-medium">{trailer.name}</p>
                          <p className="text-slate-500 text-xs">{trailer.type}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
             <div className="text-red-400">Failed to load details.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
