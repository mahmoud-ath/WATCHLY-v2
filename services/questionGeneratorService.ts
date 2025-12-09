import { 
  fetchTrending, 
  fetchMovieDetails, 
  fetchMovieCredits,
  TMDBMovie,
  TMDBTVShow
} from './tmdbService';

export type QuestionType = 
  | 'release-year' 
  | 'actor-movie' 
  | 'genre' 
  | 'rating' 
  | 'poster'
  | 'director';

export interface GameQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  movieId: string;
  movieTitle: string;
  imageUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  metadata: {
    explanation?: string;
    funFact?: string;
  };
}

interface MovieCredits {
  cast: Array<{ id: number; name: string; character: string; order: number }>;
  crew: Array<{ id: number; name: string; job: string; department: string }>;
}

// Fetch 100 trending movies/TV shows (5 pages × 20 items)
export const fetchTrendingContent = async (): Promise<Array<TMDBMovie | TMDBTVShow>> => {
  const allContent: Array<TMDBMovie | TMDBTVShow> = [];
  
  // Fetch 5 pages to get 100 items
  for (let page = 1; page <= 5; page++) {
    const movies = await fetchTrending('movie', 'week', page);
    allContent.push(...movies);
  }
  
  return allContent.slice(0, 100); // Ensure exactly 100
};

// Generate 6 questions per movie = 600 total questions
export const buildQuestionBank = async (): Promise<GameQuestion[]> => {
  const questions: GameQuestion[] = [];
  
  console.log('Fetching 100 trending movies...');
  const trendingContent = await fetchTrendingContent();
  
  console.log('Generating questions...');
  
  // Process in batches to avoid overwhelming the browser
  for (let i = 0; i < trendingContent.length; i += 10) {
    const batch = trendingContent.slice(i, i + 10);
    
    // Fetch details for batch
    const batchPromises = batch.map(async (item) => {
      try {
        const [details, credits] = await Promise.all([
          fetchMovieDetails(item.id),
          fetchMovieCredits(item.id)
        ]);
        
        return { item, details, credits };
      } catch (error) {
        console.warn(`Failed to fetch data for movie ${item.id}:`, error);
        return null;
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    
    // Generate questions for each movie in batch
    batchResults.forEach((result) => {
      if (!result) return;
      
      const { item, details, credits } = result;
      
      // Generate 6 different question types
      questions.push(
        generateYearQuestion(item, trendingContent),
        generateActorQuestion(item, credits, trendingContent),
        generateGenreQuestion(item, trendingContent),
        generateRatingQuestion(item, trendingContent),
        generatePosterQuestion(item, trendingContent),
        generateDirectorQuestion(item, credits, trendingContent)
      );
    });
    
    console.log(`Progress: ${Math.min(i + 10, 100)}/100 movies processed`);
  }
  
  console.log(`Generated ${questions.length} questions!`);
  return questions;
};

// 1. Release Year Question
const generateYearQuestion = (
  movie: TMDBMovie | TMDBTVShow,
  allMovies: Array<TMDBMovie | TMDBTVShow>
): GameQuestion => {
  const releaseDate = 'release_date' in movie ? movie.release_date : movie.first_air_date;
  const correctYear = new Date(releaseDate).getFullYear();
  const title = 'title' in movie ? movie.title : movie.name;
  
  // Generate wrong years (±1-5 years)
  const wrongYears = new Set<number>();
  while (wrongYears.size < 3) {
    const offset = Math.floor(Math.random() * 10) - 5;
    const wrongYear = correctYear + offset;
    if (wrongYear !== correctYear && wrongYear >= 1950 && wrongYear <= new Date().getFullYear()) {
      wrongYears.add(wrongYear);
    }
  }
  
  const options = shuffleArray([
    correctYear.toString(),
    ...Array.from(wrongYears).map(y => y.toString())
  ]);
  
  return {
    id: `year-${movie.id}-${Date.now()}`,
    type: 'release-year',
    question: `When was "${title}" released?`,
    options,
    correctAnswer: correctYear.toString(),
    movieId: movie.id.toString(),
    movieTitle: title,
    imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
    difficulty: calculateDifficulty(movie),
    metadata: {
      explanation: `"${title}" was released in ${correctYear}.`
    }
  };
};

// 2. Actor Question
const generateActorQuestion = (
  movie: TMDBMovie | TMDBTVShow,
  credits: MovieCredits,
  allMovies: Array<TMDBMovie | TMDBTVShow>
): GameQuestion => {
  const title = 'title' in movie ? movie.title : movie.name;
  const leadActor = credits.cast[0];
  
  if (!leadActor) {
    // Fallback if no cast data
    return generateGenreQuestion(movie, allMovies);
  }
  
  // Get random actors from other movies
  const otherActors = new Set<string>();
  const fakeActors = [
    'Tom Hanks', 'Leonardo DiCaprio', 'Meryl Streep', 'Denzel Washington',
    'Brad Pitt', 'Scarlett Johansson', 'Morgan Freeman', 'Robert De Niro',
    'Al Pacino', 'Christian Bale', 'Jennifer Lawrence', 'Tom Cruise',
    'Matt Damon', 'Sandra Bullock', 'Will Smith', 'Angelina Jolie'
  ].filter(name => name !== leadActor.name);
  
  const shuffled = shuffleArray(fakeActors);
  for (let i = 0; i < 3 && otherActors.size < 3; i++) {
    otherActors.add(shuffled[i]);
  }
  
  const options = shuffleArray([
    leadActor.name,
    ...Array.from(otherActors)
  ]);
  
  return {
    id: `actor-${movie.id}-${Date.now()}`,
    type: 'actor-movie',
    question: `Who is the lead actor in "${title}"?`,
    options,
    correctAnswer: leadActor.name,
    movieId: movie.id.toString(),
    movieTitle: title,
    imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
    difficulty: 'medium',
    metadata: {
      explanation: `${leadActor.name} plays ${leadActor.character} in "${title}".`
    }
  };
};

// 3. Genre Question
const generateGenreQuestion = (
  movie: TMDBMovie | TMDBTVShow,
  allMovies: Array<TMDBMovie | TMDBTVShow>
): GameQuestion => {
  const title = 'title' in movie ? movie.title : movie.name;
  
  const genreMap: { [key: number]: string } = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
    80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
    14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
    9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction',
    10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
  };
  
  const correctGenre = genreMap[movie.genre_ids[0]] || 'Drama';
  
  // Get wrong genres
  const wrongGenres = new Set<string>();
  const allGenres = Object.values(genreMap);
  while (wrongGenres.size < 3) {
    const randomGenre = allGenres[Math.floor(Math.random() * allGenres.length)];
    if (randomGenre !== correctGenre) {
      wrongGenres.add(randomGenre);
    }
  }
  
  const options = shuffleArray([
    correctGenre,
    ...Array.from(wrongGenres)
  ]);
  
  return {
    id: `genre-${movie.id}-${Date.now()}`,
    type: 'genre',
    question: `What genre is "${title}"?`,
    options,
    correctAnswer: correctGenre,
    movieId: movie.id.toString(),
    movieTitle: title,
    imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
    difficulty: 'easy',
    metadata: {
      explanation: `"${title}" is primarily a ${correctGenre} film.`
    }
  };
};

// 4. Rating Question (True/False style)
const generateRatingQuestion = (
  movie: TMDBMovie | TMDBTVShow,
  allMovies: Array<TMDBMovie | TMDBTVShow>
): GameQuestion => {
  const title = 'title' in movie ? movie.title : movie.name;
  const rating = movie.vote_average;
  const threshold = 7.5;
  
  const isHighRated = rating >= threshold;
  const question = `Is "${title}" rated ${threshold} or higher on TMDB?`;
  
  return {
    id: `rating-${movie.id}-${Date.now()}`,
    type: 'rating',
    question,
    options: ['Yes', 'No'],
    correctAnswer: isHighRated ? 'Yes' : 'No',
    movieId: movie.id.toString(),
    movieTitle: title,
    imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
    difficulty: 'medium',
    metadata: {
      explanation: `"${title}" has a rating of ${rating.toFixed(1)} on TMDB.`
    }
  };
};

// 5. Poster Identification
const generatePosterQuestion = (
  movie: TMDBMovie | TMDBTVShow,
  allMovies: Array<TMDBMovie | TMDBTVShow>
): GameQuestion => {
  const title = 'title' in movie ? movie.title : movie.name;
  
  // Get 3 random other movie titles
  const wrongTitles = new Set<string>();
  const shuffledMovies = shuffleArray([...allMovies]);
  
  for (const otherMovie of shuffledMovies) {
    if (wrongTitles.size >= 3) break;
    const otherTitle = 'title' in otherMovie ? otherMovie.title : otherMovie.name;
    if (otherTitle !== title && otherMovie.id !== movie.id) {
      wrongTitles.add(otherTitle);
    }
  }
  
  const options = shuffleArray([
    title,
    ...Array.from(wrongTitles)
  ]);
  
  return {
    id: `poster-${movie.id}-${Date.now()}`,
    type: 'poster',
    question: 'Identify the movie from this poster:',
    options,
    correctAnswer: title,
    movieId: movie.id.toString(),
    movieTitle: title,
    imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
    difficulty: calculateDifficulty(movie),
    metadata: {
      explanation: `This is the poster for "${title}".`
    }
  };
};

// 6. Director Question
const generateDirectorQuestion = (
  movie: TMDBMovie | TMDBTVShow,
  credits: MovieCredits,
  allMovies: Array<TMDBMovie | TMDBTVShow>
): GameQuestion => {
  const title = 'title' in movie ? movie.title : movie.name;
  const director = credits.crew.find(c => c.job === 'Director');
  
  if (!director) {
    // Fallback to genre question if no director
    return generateGenreQuestion(movie, allMovies);
  }
  
  // Generate fake directors
  const fakeDirectors = [
    'Christopher Nolan', 'Martin Scorsese', 'Quentin Tarantino',
    'Steven Spielberg', 'Denis Villeneuve', 'James Cameron',
    'Ridley Scott', 'Peter Jackson', 'David Fincher',
    'Greta Gerwig', 'Jordan Peele', 'Wes Anderson'
  ].filter(name => name !== director.name);
  
  const wrongDirectors = shuffleArray(fakeDirectors).slice(0, 3);
  
  const options = shuffleArray([
    director.name,
    ...wrongDirectors
  ]);
  
  return {
    id: `director-${movie.id}-${Date.now()}`,
    type: 'director',
    question: `Who directed "${title}"?`,
    options,
    correctAnswer: director.name,
    movieId: movie.id.toString(),
    movieTitle: title,
    imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
    difficulty: 'hard',
    metadata: {
      explanation: `"${title}" was directed by ${director.name}.`
    }
  };
};

// Utility Functions
const calculateDifficulty = (movie: TMDBMovie | TMDBTVShow): 'easy' | 'medium' | 'hard' => {
  if (movie.popularity > 100) return 'easy';
  if (movie.popularity > 50) return 'medium';
  return 'hard';
};

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
