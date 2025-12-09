interface GameStats {
  gamesPlayed: number;
  totalScore: number;
  highScore: number;
  correctAnswers: number;
  totalQuestions: number;
  winRate: number;
  averageScore: number;
  lastPlayed: string;
}

const STATS_KEY = 'watchly-quiz-stats';

export const getStats = (): GameStats => {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (!stored) {
      return getDefaultStats();
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load stats:', error);
    return getDefaultStats();
  }
};

const getDefaultStats = (): GameStats => ({
  gamesPlayed: 0,
  totalScore: 0,
  highScore: 0,
  correctAnswers: 0,
  totalQuestions: 0,
  winRate: 0,
  averageScore: 0,
  lastPlayed: new Date().toISOString(),
});

export const saveGameStats = (score: number, correct: number, total: number) => {
  try {
    const stats = getStats();
    
    const newStats: GameStats = {
      gamesPlayed: stats.gamesPlayed + 1,
      totalScore: stats.totalScore + score,
      highScore: Math.max(stats.highScore, score),
      correctAnswers: stats.correctAnswers + correct,
      totalQuestions: stats.totalQuestions + total,
      winRate: ((stats.correctAnswers + correct) / (stats.totalQuestions + total)) * 100,
      averageScore: Math.floor((stats.totalScore + score) / (stats.gamesPlayed + 1)),
      lastPlayed: new Date().toISOString(),
    };
    
    localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
    console.log('Stats saved:', newStats);
  } catch (error) {
    console.error('Failed to save stats:', error);
  }
};

export const resetStats = () => {
  localStorage.removeItem(STATS_KEY);
  console.log('Stats reset');
};
