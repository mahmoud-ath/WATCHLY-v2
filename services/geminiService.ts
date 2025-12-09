// Movie Service - Now powered by TMDB API
// This file replaces Gemini AI with real movie data from The Movie Database

import { Movie, MovieDetails } from "../types";
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  searchMulti,
  fetchMovieDetails as fetchTMDBMovieDetails,
  fetchTVDetails,
  convertTMDBMovieToMovie,
  convertTMDBTVToMovie,
  convertToMovieDetails,
  convertTVToMovieDetails,
} from "./tmdbService";

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const isTrending = query.toLowerCase() === "trending" || query === "";
    
    if (isTrending) {
      // Fetch trending movies
      const movies = await fetchTrendingMovies('week', 1);
      return movies.slice(0, 12).map(movie => convertTMDBMovieToMovie(movie));
    } else {
      // Search for movies/TV shows
      const results = await searchMulti(query, 1);
      return results.slice(0, 12).map(item => {
        if ('title' in item) {
          return convertTMDBMovieToMovie(item);
        } else {
          return convertTMDBTVToMovie(item);
        }
      });
    }
  } catch (error) {
    console.error("TMDB fetchMovies error:", error);
    throw new Error("Failed to fetch movies. Please try again.");
  }
};

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
  try {
    // Check if it's a TV show (starts with 'tv-')
    const isTVShow = movieId.startsWith('tv-');
    const numericId = isTVShow ? parseInt(movieId.replace('tv-', '')) : parseInt(movieId);

    if (isTVShow) {
      const { details, credits, videos, similar } = await fetchTVDetails(numericId);
      return convertTVToMovieDetails(details, credits, videos, similar);
    } else {
      const { details, credits, videos, similar } = await fetchTMDBMovieDetails(numericId);
      return convertToMovieDetails(details, credits, videos, similar);
    }
  } catch (error) {
    console.error("TMDB fetchMovieDetails error:", error);
    throw new Error("Failed to load movie details.");
  }
};

// New functions for additional features
export const fetchTrending = async (type: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
  try {
    if (type === 'movie') {
      const movies = await fetchTrendingMovies('week', 1);
      return movies.slice(0, 12).map(movie => convertTMDBMovieToMovie(movie));
    } else {
      const { fetchTrendingTV } = await import('./tmdbService');
      const shows = await fetchTrendingTV('week', 1);
      return shows.slice(0, 12).map(show => convertTMDBTVToMovie(show));
    }
  } catch (error) {
    console.error("TMDB fetchTrending error:", error);
    throw new Error("Failed to fetch trending content.");
  }
};

export const fetchPopular = async (type: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
  try {
    if (type === 'movie') {
      const movies = await fetchPopularMovies(1);
      return movies.slice(0, 12).map(movie => convertTMDBMovieToMovie(movie));
    } else {
      const { fetchPopularTV } = await import('./tmdbService');
      const shows = await fetchPopularTV(1);
      return shows.slice(0, 12).map(show => convertTMDBTVToMovie(show));
    }
  } catch (error) {
    console.error("TMDB fetchPopular error:", error);
    throw new Error("Failed to fetch popular content.");
  }
};
