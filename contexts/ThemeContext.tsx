import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ColorTheme, ThemeConfig, COLOR_THEMES } from '../types/theme';

interface ThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  themeClasses: typeof COLOR_THEMES[ColorTheme];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'watchly-theme';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('purple');

  // Load theme from localStorage on mount
  useEffect(() => {
    // Migrate old theme system
    const oldTheme = localStorage.getItem('theme');
    if (oldTheme && !localStorage.getItem(STORAGE_KEY)) {
      const migratedConfig: ThemeConfig = {
        colorTheme: 'purple'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedConfig));
      localStorage.removeItem('theme'); // Clean up old key
      setColorThemeState(migratedConfig.colorTheme);
      return;
    }

    // Load from new system
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      try {
        const parsed: ThemeConfig = JSON.parse(savedTheme);
        setColorThemeState(parsed.colorTheme);
      } catch (e) {
        console.error('Failed to parse theme:', e);
      }
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Always dark mode
    root.classList.add('dark');
    root.classList.remove('light');

    // Apply color theme CSS variables
    const theme = COLOR_THEMES[colorTheme];
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
  }, [colorTheme]);

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    const config: ThemeConfig = { colorTheme: theme };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  };

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme,
        themeClasses: COLOR_THEMES[colorTheme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
