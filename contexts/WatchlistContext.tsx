import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface WatchlistItem {
  id: string;
  title: string;
  posterUrl: string;
  rating: number;
  year: number;
  genres: string[];
  addedAt: string;
}

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  isInWatchlist: (movieId: string) => boolean;
  addToWatchlist: (movie: WatchlistItem) => void;
  removeFromWatchlist: (movieId: string) => void;
  toggleWatchlist: (movie: WatchlistItem) => void;
  clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

// Use consistent key - 'watchlist' to match existing data
const WATCHLIST_KEY = 'watchlist';

export const WatchlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      // Try to get data from 'watchlist' key first
      let stored = localStorage.getItem(WATCHLIST_KEY);
      
      // If not found, check old key 'watchly-watchlist' and migrate
      if (!stored) {
        const oldStored = localStorage.getItem('watchly-watchlist');
        if (oldStored) {
          // Migrate from old key to new key
          localStorage.setItem(WATCHLIST_KEY, oldStored);
          localStorage.removeItem('watchly-watchlist'); // Clean up old key
          stored = oldStored;
        }
      }
      
      if (stored) {
        const parsed = JSON.parse(stored);
        setWatchlist(parsed);
      }
    } catch (error) {
      console.error('Failed to load watchlist:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage whenever watchlist changes (only after initialization)
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
      } catch (error) {
        console.error('Failed to save watchlist:', error);
      }
    }
  }, [watchlist, isInitialized]);

  const isInWatchlist = (movieId: string): boolean => {
    return watchlist.some(item => item.id === movieId);
  };

  const addToWatchlist = (movie: WatchlistItem) => {
    if (!isInWatchlist(movie.id)) {
      const newItem: WatchlistItem = {
        ...movie,
        addedAt: new Date().toISOString(),
      };
      setWatchlist(prev => [newItem, ...prev]); // Add to beginning
    }
  };

  const removeFromWatchlist = (movieId: string) => {
    setWatchlist(prev => prev.filter(item => item.id !== movieId));
  };

  const toggleWatchlist = (movie: WatchlistItem) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        isInWatchlist,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        clearWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

// Custom hook to use watchlist
export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }
  return context;
};
