'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ColorTheme = 'default' | 'blue' | 'green' | 'purple' | 'orange';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [colorTheme, setColorTheme] = useState<ColorTheme>('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme | null;
    if (savedColorTheme) {
      setColorTheme(savedColorTheme);
    }
  }, []);

  // Handle Light/Dark Mode
  useEffect(() => {
    const root = window.document.documentElement;

    const updateTheme = () => {
      let activeTheme: 'light' | 'dark';

      if (theme === 'system') {
        activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        activeTheme = theme;
      }

      setResolvedTheme(activeTheme);
      root.classList.remove('light', 'dark');
      root.classList.add(activeTheme);

      if (theme !== 'system') {
        localStorage.setItem('theme', theme);
      } else {
        localStorage.removeItem('theme');
      }
    };

    updateTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Handle Color Theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme-color', colorTheme);
    localStorage.setItem('colorTheme', colorTheme);
  }, [colorTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
