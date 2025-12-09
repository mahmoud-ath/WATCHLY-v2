import React, { useState, useEffect } from 'react';
import { Gamepad2, Play, Trophy, RotateCcw, Loader2, Download, Check, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { buildQuestionBank, GameQuestion } from '../services/questionGeneratorService';
import { 
  getCachedQuestions, 
  cacheQuestions, 
  getRandomQuestions,
  getCacheInfo 
} from '../services/questionCacheService';
import { getStats, saveGameStats } from '../services/statsService';
import toast from 'react-hot-toast';

type GameStatus = 'idle' | 'loading' | 'playing' | 'finished';

const PlayGamePage: React.FC = () => {
  const { themeClasses } = useTheme();
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const stats = getStats();
  const cacheInfo = getCacheInfo();

  // Check cache on mount
  useEffect(() => {
    const cached = getCachedQuestions();
    if (!cached || cached.length === 0) {
      setGameStatus('idle');
    }
  }, []);

  const buildQuestions = async () => {
    setGameStatus('loading');
    setLoadingProgress(0);
    
    try {
      toast.loading('Fetching trending movies...', { id: 'build' });
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 10, 90));
      }, 500);
      
      const newQuestions = await buildQuestionBank();
      
      clearInterval(progressInterval);
      setLoadingProgress(100);
      
      cacheQuestions(newQuestions);
      toast.success(`Generated ${newQuestions.length} questions!`, { id: 'build' });
      
      setGameStatus('idle');
    } catch (error) {
      console.error('Failed to build questions:', error);
      toast.error('Failed to load questions. Please try again.', { id: 'build' });
      setGameStatus('idle');
    }
  };

  const startGame = () => {
    try {
      const gameQuestions = getRandomQuestions(10);
      setQuestions(gameQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setCorrectAnswers(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setGameStatus('playing');
    } catch (error) {
      toast.error('No questions available. Please build question bank first.');
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    // Calculate points based on difficulty
    const points = isCorrect ? getDifficultyPoints(currentQuestion.difficulty) : 0;
    
    setScore(score + points);
    setCorrectAnswers(correctAnswers + (isCorrect ? 1 : 0));
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex >= questions.length) {
      // Game finished
      saveGameStats(score, correctAnswers, questions.length);
      setGameStatus('finished');
    } else {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetGame = () => {
    setGameStatus('idle');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getDifficultyPoints = (difficulty: string): number => {
    switch (difficulty) {
      case 'easy': return 10;
      case 'medium': return 20;
      case 'hard': return 30;
      default: return 10;
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className={`w-12 h-12 ${themeClasses.text}`} />
            <h1 className="text-5xl font-bold text-white">Movie Quiz Game</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Test your movie knowledge with {cacheInfo.questionCount} questions!
          </p>
        </div>

        {/* Loading State */}
        {gameStatus === 'loading' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12">
            <div className="text-center">
              <Loader2 className={`w-16 h-16 ${themeClasses.text} animate-spin mx-auto mb-6`} />
              <h2 className="text-2xl font-bold text-white mb-4">Building Question Bank...</h2>
              <p className="text-slate-400 mb-6">
                Fetching 100 trending movies and generating questions
              </p>
              <div className="w-full bg-slate-800 rounded-full h-3 mb-2">
                <div 
                  className={`${themeClasses.button.split(' ')[0]} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-sm text-slate-500">{loadingProgress}%</p>
            </div>
          </div>
        )}

        {/* Idle State - Start Screen */}
        {gameStatus === 'idle' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 md:p-12">
            {cacheInfo.isValid ? (
              <div className="text-center py-12">
                <div className={`inline-flex items-center justify-center w-24 h-24 ${themeClasses.button.split(' ')[0]} rounded-full mb-6`}>
                  <Play className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Play?</h2>
                <p className="text-slate-400 mb-6">
                  Answer 10 random movie trivia questions and earn points!
                </p>
                <div className="bg-slate-800/50 rounded-lg p-4 mb-8 inline-block">
                  <p className="text-sm text-slate-400">
                    Question Bank: <span className="text-white font-semibold">{cacheInfo.questionCount} questions</span>
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Expires in: <span className="text-white font-semibold">{cacheInfo.expiresIn} days</span>
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={startGame}
                    className={`px-8 py-4 ${themeClasses.button} text-white font-semibold rounded-xl transition-all shadow-lg ${themeClasses.glow} hover:scale-105 text-lg`}
                  >
                    Start Game
                  </button>
                  <button
                    onClick={buildQuestions}
                    className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition-colors"
                  >
                    <Download className="w-5 h-5 inline mr-2" />
                    Rebuild Questions
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Download className={`w-20 h-20 ${themeClasses.text} mx-auto mb-6`} />
                <h2 className="text-3xl font-bold text-white mb-4">First Time Setup</h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                  We need to build your question bank first. This will fetch 100 trending movies and generate 600+ questions.
                </p>
                <button
                  onClick={buildQuestions}
                  className={`px-8 py-4 ${themeClasses.button} text-white font-semibold rounded-xl transition-all shadow-lg ${themeClasses.glow} hover:scale-105 text-lg`}
                >
                  Build Question Bank
                </button>
                <p className="text-sm text-slate-500 mt-6">
                  This will take about 30-60 seconds and only needs to be done once.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Playing State */}
        {gameStatus === 'playing' && currentQuestion && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 md:p-12">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-400 text-sm">
                  Question {currentQuestionIndex + 1} / {questions.length}
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-white font-bold text-lg">{score}</span>
                  </div>
                  <button
                    onClick={resetGame}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div 
                  className={`${themeClasses.button.split(' ')[0]} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Image */}
            {currentQuestion.imageUrl && currentQuestion.type === 'poster' && (
              <div className="mb-6">
                <img 
                  src={currentQuestion.imageUrl} 
                  alt="Movie poster"
                  className="w-64 h-96 object-cover rounded-xl mx-auto border-2 border-slate-800 shadow-2xl"
                />
              </div>
            )}

            {/* Question */}
            <div className="text-center mb-8">
              <div className={`inline-block px-4 py-1 ${themeClasses.bg} border ${themeClasses.border} rounded-full text-sm ${themeClasses.text} mb-4`}>
                {currentQuestion.difficulty.toUpperCase()}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    className={`p-4 rounded-xl transition-all text-left font-medium ${
                      showCorrect
                        ? 'bg-green-600/20 border-2 border-green-500 text-green-300'
                        : showWrong
                        ? 'bg-red-600/20 border-2 border-red-500 text-red-300'
                        : isSelected
                        ? `${themeClasses.button.split(' ')[0]} border-2 ${themeClasses.border.replace('border-', 'border-2 border-')} text-white`
                        : 'bg-slate-800 border-2 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600'
                    } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <Check className="w-5 h-5" />}
                      {showWrong && <X className="w-5 h-5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Result & Explanation */}
            {showResult && (
              <div className="text-center">
                <div className={`inline-block px-6 py-3 rounded-xl mb-4 ${
                  selectedAnswer === currentQuestion.correctAnswer
                    ? 'bg-green-600/20 border border-green-500/50'
                    : 'bg-red-600/20 border border-red-500/50'
                }`}>
                  <p className={`font-semibold ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? 'text-green-300'
                      : 'text-red-300'
                  }`}>
                    {selectedAnswer === currentQuestion.correctAnswer 
                      ? `Correct! +${getDifficultyPoints(currentQuestion.difficulty)} points`
                      : 'Wrong answer'
                    }
                  </p>
                </div>
                {currentQuestion.metadata.explanation && (
                  <p className="text-slate-400 text-sm mb-6">
                    {currentQuestion.metadata.explanation}
                  </p>
                )}
                <button
                  onClick={handleNextQuestion}
                  className={`px-8 py-3 ${themeClasses.button} text-white font-semibold rounded-xl transition-colors`}
                >
                  {currentQuestionIndex + 1 === questions.length ? 'Finish Game' : 'Next Question'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Finished State */}
        {gameStatus === 'finished' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 md:p-12">
            <div className="text-center py-12">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-4">Game Over!</h2>
              <div className="bg-slate-800/50 rounded-xl p-6 mb-8 inline-block">
                <div className={`text-5xl font-bold ${themeClasses.text} mb-2`}>{score}</div>
                <div className="text-slate-400">Final Score</div>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">{correctAnswers}</div>
                  <div className="text-sm text-slate-400">Correct</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-slate-400">
                    {questions.length - correctAnswers}
                  </div>
                  <div className="text-sm text-slate-400">Wrong</div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={startGame}
                  className={`px-8 py-3 ${themeClasses.button} text-white font-semibold rounded-xl transition-all shadow-lg ${themeClasses.glow}`}
                >
                  Play Again
                </button>
                <button
                  onClick={resetGame}
                  className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 text-center">
            <div className={`text-3xl font-bold ${themeClasses.text} mb-2`}>{stats.gamesPlayed}</div>
            <div className="text-slate-400">Games Played</div>
          </div>
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">{stats.highScore}</div>
            <div className="text-slate-400">High Score</div>
          </div>
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">
              {stats.winRate.toFixed(1)}%
            </div>
            <div className="text-slate-400">Win Rate</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlayGamePage;
