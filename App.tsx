import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { WatchlistProvider } from './contexts/WatchlistContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import TrendingPage from './pages/TrendingPage';
import TopRatedMoviesPage from './pages/TopRatedMoviesPage';
import TopRatedTVPage from './pages/TopRatedTVPage';
import UpcomingMoviesPage from './pages/UpcomingMoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import WatchlistPage from './pages/WatchlistPage';
import PlayGamePage from './pages/PlayGamePage';
import RecommendationsPage from './pages/RecommendationsPage';
import AboutPage from './pages/AboutPage';
import ApiDocPage from './pages/ApiDocPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <WatchlistProvider>
        <Router>
          <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
            <Toaster
              position="top-center"
              toastOptions={{
                success: {
                  style: {
                    background: '#10b981',
                    color: '#fff',
                  },
                  iconTheme: {
                    primary: '#fff',
                    secondary: '#10b981',
                  },
                },
              }}
            />
            <Header />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/top-rated-movies" element={<TopRatedMoviesPage />} />
            <Route path="/top-rated-tv" element={<TopRatedTVPage />} />
            <Route path="/upcoming-movies" element={<UpcomingMoviesPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/movie/:slug" element={<MovieDetailsPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/play-game" element={<PlayGamePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/api-docs" element={<ApiDocPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
            <Footer />
          </div>
        </Router>
      </WatchlistProvider>
    </ThemeProvider>
  );
}

export default App;

