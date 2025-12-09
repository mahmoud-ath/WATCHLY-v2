import { GameQuestion } from './questionGeneratorService';

const CACHE_KEY = 'watchly-quiz-questions';
const CACHE_EXPIRY_KEY = 'watchly-quiz-expiry';
const CACHE_VERSION_KEY = 'watchly-quiz-version';
const CURRENT_VERSION = '1.0';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export const getCachedQuestions = (): GameQuestion[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    const version = localStorage.getItem(CACHE_VERSION_KEY);
    
    // Check if cache exists and is valid
    if (!cached || !expiry || version !== CURRENT_VERSION) {
      clearCache();
      return null;
    }
    
    // Check if cache expired
    if (Date.now() > parseInt(expiry)) {
      clearCache();
      return null;
    }
    
    const questions = JSON.parse(cached);
    console.log(`Loaded ${questions.length} questions from cache`);
    return questions;
  } catch (error) {
    console.error('Failed to load cached questions:', error);
    clearCache();
    return null;
  }
};

export const cacheQuestions = (questions: GameQuestion[]) => {
  try {
    const expiryTime = Date.now() + CACHE_DURATION;
    localStorage.setItem(CACHE_KEY, JSON.stringify(questions));
    localStorage.setItem(CACHE_EXPIRY_KEY, expiryTime.toString());
    localStorage.setItem(CACHE_VERSION_KEY, CURRENT_VERSION);
    
    // Calculate storage size
    const sizeKB = (JSON.stringify(questions).length / 1024).toFixed(2);
    console.log(`Cached ${questions.length} questions (${sizeKB} KB)`);
    console.log(`Cache expires in 7 days`);
  } catch (error) {
    console.error('Failed to cache questions:', error);
    // If storage quota exceeded, clear cache
    clearCache();
  }
};

export const clearCache = () => {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_EXPIRY_KEY);
  localStorage.removeItem(CACHE_VERSION_KEY);
  console.log('Cache cleared');
};

export const isCacheValid = (): boolean => {
  const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);
  const version = localStorage.getItem(CACHE_VERSION_KEY);
  
  if (!expiry || version !== CURRENT_VERSION) return false;
  return Date.now() <= parseInt(expiry);
};

// Get N random questions for a game
export const getRandomQuestions = (count: number = 10): GameQuestion[] => {
  const allQuestions = getCachedQuestions();
  
  if (!allQuestions || allQuestions.length === 0) {
    throw new Error('No questions available. Please build question bank first.');
  }
  
  // Shuffle and take first N
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, allQuestions.length));
};

// Get cache info
export const getCacheInfo = () => {
  const questions = getCachedQuestions();
  const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);
  
  if (!questions || !expiry) {
    return {
      isValid: false,
      questionCount: 0,
      expiresIn: 0,
      sizeKB: 0
    };
  }
  
  const expiryTime = parseInt(expiry);
  const now = Date.now();
  const expiresIn = Math.max(0, Math.floor((expiryTime - now) / (24 * 60 * 60 * 1000))); // days
  const sizeKB = parseFloat((JSON.stringify(questions).length / 1024).toFixed(2));
  
  return {
    isValid: true,
    questionCount: questions.length,
    expiresIn,
    sizeKB
  };
};
