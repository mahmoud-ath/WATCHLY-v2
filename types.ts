export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  director: string;
  duration: string;
  shortDescription: string;
  matchReason?: string; // Why Gemini recommended this
  posterColor?: string; // Fallback gradient/color
  posterUrl?: string; // TMDB poster image URL
  backdropUrl?: string; // TMDB backdrop image URL
}

export interface MovieDetails extends Movie {
  cast: string[];
  fullPlot: string;
  trivia: string[];
  similarMovies: string[];
  trailers?: Array<{
    key: string;
    name: string;
    type: string;
  }>;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface SearchState {
  query: string;
  results: Movie[];
  status: LoadingState;
  error?: string;
}
