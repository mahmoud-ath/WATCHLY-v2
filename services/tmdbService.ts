// TMDB API Service
// Handles all interactions with The Movie Database API

const TMDB_API_KEY = (import.meta as any).env?.VITE_TMDB_API_KEY || process.env.TMDB_API_KEY || 'f019ed831cd1750a37b16a2ce48d4c23';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// TMDB Types
export interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type?: string;
  popularity: number;
}

export interface TMDBTVShow {
  id: number;
  name: string;
  first_air_date: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type?: string;
  popularity: number;
}

interface TMDBMovieDetails {
  id: number;
  title: string;
  release_date: string;
  genres: { id: number; name: string }[];
  vote_average: number;
  overview: string;
  runtime: number | null;
  poster_path: string | null;
  backdrop_path: string | null;
  tagline: string;
  budget: number;
  revenue: number;
  status: string;
  production_companies: { id: number; name: string; logo_path: string | null }[];
}

interface TMDBTVDetails {
  id: number;
  name: string;
  first_air_date: string;
  genres: { id: number; name: string }[];
  vote_average: number;
  overview: string;
  episode_run_time: number[];
  poster_path: string | null;
  backdrop_path: string | null;
  tagline: string;
}

export interface TMDBCredits {
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
  }>;
  crew: Array<{
    id: number;
    name: string;
    job: string;
    department: string;
  }>;
}

interface TMDBVideos {
  results: Array<{
    id: string;
    key: string;
    site: string;
    type: string;
    name: string;
  }>;
}

// Cache for API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    ...params,
  });
  
  const url = `${BASE_URL}${endpoint}?${queryParams}`;
  const cacheKey = url;

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    // Store in cache
    cache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  } catch (error) {
    console.error('TMDB API fetch error:', error);
    throw new Error('Failed to fetch data from TMDB');
  }
}

// Helper to convert minutes to "Xh Ym" format
function formatRuntime(minutes: number | null): string {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

// Helper to get director from crew
function getDirector(crew: TMDBCredits['crew']): string {
  const director = crew.find(person => person.job === 'Director');
  return director?.name || 'Unknown';
}

// Helper to extract dominant color from poster (simplified)
function getPosterColor(posterPath: string | null): string {
  // Generate a color based on hash or use a default palette
  const colors = ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#6c5b7b', '#c94b4b', '#4ecdc4'];
  const index = posterPath ? Math.abs(posterPath.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % colors.length : 0;
  return colors[index];
}

export function getPosterUrl(path: string | null, size: 'w185' | 'w342' | 'w500' | 'original' = 'w500'): string {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Poster';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: 'w780' | 'w1280' | 'original' = 'w1280'): string {
  if (!path) return 'https://via.placeholder.com/1280x720?text=No+Backdrop';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

// Fetch trending content (generic - supports 'movie' or 'tv')
export async function fetchTrending(mediaType: 'movie' | 'tv' = 'movie', timeWindow: 'day' | 'week' = 'week', page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBMovie[] | TMDBTVShow[] }>(`/trending/${mediaType}/${timeWindow}`, { page: page.toString() });
  return data.results;
}

// Fetch trending movies
export async function fetchTrendingMovies(timeWindow: 'day' | 'week' = 'week', page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBMovie[] }>(`/trending/movie/${timeWindow}`, { page: page.toString() });
  return data.results;
}

// Fetch trending movies with pagination data
export async function fetchTrendingMoviesWithPage(timeWindow: 'day' | 'week' = 'week', page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBMovie[]; total_pages: number; total_results: number }>(`/trending/movie/${timeWindow}`, { page: page.toString() });
  return data;
}

// Fetch trending TV shows
export async function fetchTrendingTV(timeWindow: 'day' | 'week' = 'week', page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBTVShow[] }>(`/trending/tv/${timeWindow}`, { page: page.toString() });
  return data.results;
}

// Fetch popular movies
export async function fetchPopularMovies(page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBMovie[] }>('/movie/popular', { page: page.toString() });
  return data.results;
}

// Fetch popular TV shows
export async function fetchPopularTV(page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBTVShow[] }>('/tv/popular', { page: page.toString() });
  return data.results;
}

// Fetch top rated movies
export async function fetchTopRatedMovies(page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBMovie[] }>('/movie/top_rated', { page: page.toString() });
  return data.results;
}

// Fetch top rated movies with pagination data
export async function fetchTopRatedMoviesWithPage(page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBMovie[]; total_pages: number; total_results: number }>('/movie/top_rated', { page: page.toString() });
  return data;
}

// Fetch top rated TV shows
export async function fetchTopRatedTV(page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBTVShow[] }>('/tv/top_rated', { page: page.toString() });
  return data.results;
}

// Fetch top rated TV shows with pagination data
export async function fetchTopRatedTVWithPage(page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBTVShow[]; total_pages: number; total_results: number }>('/tv/top_rated', { page: page.toString() });
  return data;
}

// Fetch upcoming movies
export async function fetchUpcomingMovies(page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBMovie[] }>('/movie/upcoming', { page: page.toString() });
  return data.results;
}

// Fetch upcoming movies with pagination data
export async function fetchUpcomingMoviesWithPage(page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBMovie[]; total_pages: number; total_results: number }>('/movie/upcoming', { page: page.toString() });
  return data;
}

// TMDB Genres
export const TMDB_GENRES = {
  movie: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ],
  tv: [
    { id: 10759, name: 'Action & Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 10762, name: 'Kids' },
    { id: 9648, name: 'Mystery' },
    { id: 10763, name: 'News' },
    { id: 10764, name: 'Reality' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' },
    { id: 10768, name: 'War & Politics' },
    { id: 37, name: 'Western' },
  ],
};

// Discover movies with filters
export async function discoverMovies(filters: {
  genres?: number[];
  yearFrom?: number;
  yearTo?: number;
  minRating?: number;
  sortBy?: string;
  page?: number;
}) {
  const params: Record<string, string> = {
    page: filters.page?.toString() || '1',
    sort_by: filters.sortBy || 'popularity.desc',
    'vote_count.gte': '100', // Ensure movies have enough votes
  };

  if (filters.genres && filters.genres.length > 0) {
    params.with_genres = filters.genres.join(',');
  }
  if (filters.yearFrom) {
    params['primary_release_date.gte'] = `${filters.yearFrom}-01-01`;
  }
  if (filters.yearTo) {
    params['primary_release_date.lte'] = `${filters.yearTo}-12-31`;
  }
  if (filters.minRating) {
    params['vote_average.gte'] = filters.minRating.toString();
  }

  const data = await fetchFromTMDB<{ results: TMDBMovie[]; total_pages: number; total_results: number }>('/discover/movie', params);
  return data;
}

// Discover TV shows with filters
export async function discoverTV(filters: {
  genres?: number[];
  yearFrom?: number;
  yearTo?: number;
  minRating?: number;
  sortBy?: string;
  page?: number;
}) {
  const params: Record<string, string> = {
    page: filters.page?.toString() || '1',
    sort_by: filters.sortBy || 'popularity.desc',
    'vote_count.gte': '100',
  };

  if (filters.genres && filters.genres.length > 0) {
    params.with_genres = filters.genres.join(',');
  }
  if (filters.yearFrom) {
    params['first_air_date.gte'] = `${filters.yearFrom}-01-01`;
  }
  if (filters.yearTo) {
    params['first_air_date.lte'] = `${filters.yearTo}-12-31`;
  }
  if (filters.minRating) {
    params['vote_average.gte'] = filters.minRating.toString();
  }

  const data = await fetchFromTMDB<{ results: TMDBTVShow[]; total_pages: number; total_results: number }>('/discover/tv', params);
  return data;
}

// Fetch movie recommendations
export async function fetchMovieRecommendations(movieId: number, page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBMovie[] }>(`/movie/${movieId}/recommendations`, { page: page.toString() });
  return data.results;
}

// Fetch TV recommendations
export async function fetchTVRecommendations(tvId: number, page: number = 1) {
  const data = await fetchFromTMDB<{ results: TMDBTVShow[] }>(`/tv/${tvId}/recommendations`, { page: page.toString() });
  return data.results;
}

// Search movies and TV shows
export async function searchMulti(query: string, page: number = 1) {
  if (!query.trim()) return [];
  const data = await fetchFromTMDB<{ results: Array<TMDBMovie | TMDBTVShow & { media_type: string }> }>('/search/multi', {
    query: encodeURIComponent(query),
    page: page.toString(),
  });
  return data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');
}

// Fetch movie credits
export async function fetchMovieCredits(movieId: number) {
  return await fetchFromTMDB<TMDBCredits>(`/movie/${movieId}/credits`);
}

// Fetch movie details
export async function fetchMovieDetails(movieId: number) {
  const [details, credits, videos, similar, watchProviders] = await Promise.all([
    fetchFromTMDB<TMDBMovieDetails>(`/movie/${movieId}`),
    fetchMovieCredits(movieId),
    fetchFromTMDB<TMDBVideos>(`/movie/${movieId}/videos`),
    fetchFromTMDB<{ results: TMDBMovie[] }>(`/movie/${movieId}/similar`),
    fetchFromTMDB<any>(`/movie/${movieId}/watch/providers`),
  ]);

  return {
    details,
    credits,
    videos: videos.results.filter(v => v.site === 'YouTube'),
    similar: similar.results,
    watchProviders: watchProviders.results,
  };
}

// Fetch TV show details
export async function fetchTVDetails(tvId: number) {
  const [details, credits, videos, similar, watchProviders] = await Promise.all([
    fetchFromTMDB<TMDBTVDetails>(`/tv/${tvId}`),
    fetchFromTMDB<TMDBCredits>(`/tv/${tvId}/credits`),
    fetchFromTMDB<TMDBVideos>(`/tv/${tvId}/videos`),
    fetchFromTMDB<{ results: TMDBTVShow[] }>(`/tv/${tvId}/similar`),
    fetchFromTMDB<any>(`/tv/${tvId}/watch/providers`),
  ]);

  return {
    details,
    credits,
    videos: videos.results.filter(v => v.site === 'YouTube'),
    similar: similar.results,
    watchProviders: watchProviders.results,
  };
}

// Convert TMDB movie to our Movie type
export function convertTMDBMovieToMovie(tmdbMovie: TMDBMovie, credits?: TMDBCredits): import('../types').Movie {
  return {
    id: tmdbMovie.id.toString(),
    title: tmdbMovie.title,
    year: new Date(tmdbMovie.release_date || '').getFullYear() || 0,
    genre: [], // Will be filled from details if needed
    rating: Math.round(tmdbMovie.vote_average * 10) / 10,
    director: credits ? getDirector(credits.crew) : 'Unknown',
    duration: 'N/A', // Not available in list endpoint
    shortDescription: tmdbMovie.overview || 'No description available',
    posterColor: getPosterColor(tmdbMovie.poster_path),
    posterUrl: getPosterUrl(tmdbMovie.poster_path),
    backdropUrl: getBackdropUrl(tmdbMovie.backdrop_path),
  };
}

// Convert TMDB TV show to our Movie type (treating as Movie for compatibility)
export function convertTMDBTVToMovie(tmdbTV: TMDBTVShow, credits?: TMDBCredits): import('../types').Movie {
  return {
    id: `tv-${tmdbTV.id}`,
    title: tmdbTV.name,
    year: new Date(tmdbTV.first_air_date || '').getFullYear() || 0,
    genre: [],
    rating: Math.round(tmdbTV.vote_average * 10) / 10,
    director: 'Various',
    duration: 'Series',
    shortDescription: tmdbTV.overview || 'No description available',
    posterColor: getPosterColor(tmdbTV.poster_path),
    posterUrl: getPosterUrl(tmdbTV.poster_path),
    backdropUrl: getBackdropUrl(tmdbTV.backdrop_path),
  };
}

// Convert detailed movie data to MovieDetails type
export function convertToMovieDetails(
  details: TMDBMovieDetails,
  credits: TMDBCredits,
  videos: TMDBVideos['results'],
  similar: TMDBMovie[]
): import('../types').MovieDetails {
  return {
    id: details.id.toString(),
    title: details.title,
    year: new Date(details.release_date || '').getFullYear() || 0,
    genre: details.genres.map(g => g.name),
    rating: Math.round(details.vote_average * 10) / 10,
    director: getDirector(credits.crew),
    duration: formatRuntime(details.runtime),
    shortDescription: details.tagline || details.overview.substring(0, 150) + '...',
    fullPlot: details.overview,
    cast: credits.cast.slice(0, 10).map(actor => actor.name),
    trivia: videos.length > 0 ? videos.map(v => `Trailer: ${v.name}`) : ['Watch this amazing film!'],
    similarMovies: similar.slice(0, 6).map(m => m.title),
    posterColor: getPosterColor(details.poster_path),
    posterUrl: getPosterUrl(details.poster_path, 'original'),
    backdropUrl: getBackdropUrl(details.backdrop_path, 'original'),
    trailers: videos.map(v => ({
      key: v.key,
      name: v.name,
      type: v.type,
    })),
  };
}

// Convert TV details to MovieDetails type
export function convertTVToMovieDetails(
  details: TMDBTVDetails,
  credits: TMDBCredits,
  videos: TMDBVideos['results'],
  similar: TMDBTVShow[]
): import('../types').MovieDetails {
  return {
    id: `tv-${details.id}`,
    title: details.name,
    year: new Date(details.first_air_date || '').getFullYear() || 0,
    genre: details.genres.map(g => g.name),
    rating: Math.round(details.vote_average * 10) / 10,
    director: 'Various',
    duration: details.episode_run_time.length > 0 ? `${details.episode_run_time[0]}m per episode` : 'N/A',
    shortDescription: details.tagline || details.overview.substring(0, 150) + '...',
    fullPlot: details.overview,
    cast: credits.cast.slice(0, 10).map(actor => actor.name),
    trivia: videos.length > 0 ? videos.map(v => `Trailer: ${v.name}`) : ['Binge-worthy series!'],
    similarMovies: similar.slice(0, 6).map(s => s.name),
    posterColor: getPosterColor(details.poster_path),
    posterUrl: getPosterUrl(details.poster_path, 'original'),
    backdropUrl: getBackdropUrl(details.backdrop_path, 'original'),
    trailers: videos.map(v => ({
      key: v.key,
      name: v.name,
      type: v.type,
    })),
  };
}
