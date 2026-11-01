'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import type { MahoeTheme, ThemeMode, AccentColor } from '@/lib/design-system';
import { defaultTheme, generateCSSVariables } from '@/lib/design-system';

interface ThemeContextType {
  theme: MahoeTheme;
  resolvedMode: 'dark' | 'light';
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
  setReducedMotion: (reduced: boolean) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<MahoeTheme>(defaultTheme);
  const [resolvedMode, setResolvedMode] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('mahoe-theme');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as MahoeTheme;
        setTheme(parsed);
      } catch {
        // Ignore invalid stored theme
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateResolvedMode = () => {
      if (theme.mode === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setResolvedMode(prefersDark ? 'dark' : 'light');
      } else {
        setResolvedMode(theme.mode);
      }
    };

    updateResolvedMode();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateResolvedMode);
    return () => mediaQuery.removeEventListener('change', updateResolvedMode);
  }, [theme.mode, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const mode = resolvedMode;
    const vars = generateCSSVariables(mode, theme.accent);
    const root = document.documentElement;

    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    root.classList.remove('dark', 'light');
    root.classList.add(mode);

    if (theme.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    localStorage.setItem('mahoe-theme', JSON.stringify(theme));
  }, [resolvedMode, theme.accent, theme.reducedMotion, mounted]);

  const setMode = useCallback((mode: ThemeMode) => {
    setTheme(prev => ({ ...prev, mode }));
  }, []);

  const setAccent = useCallback((accent: AccentColor) => {
    setTheme(prev => ({ ...prev, accent }));
  }, []);

  const setReducedMotion = useCallback((reduced: boolean) => {
    setTheme(prev => ({ ...prev, reducedMotion: reduced }));
  }, []);

  const toggleMode = useCallback(() => {
    setTheme(prev => ({
      ...prev,
      mode: prev.mode === 'dark' ? 'light' : prev.mode === 'light' ? 'system' : 'dark',
    }));
  }, []);

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{
        theme: defaultTheme,
        resolvedMode: 'dark',
        setMode: () => {},
        setAccent: () => {},
        setReducedMotion: () => {},
        toggleMode: () => {},
      }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      resolvedMode,
      setMode,
      setAccent,
      setReducedMotion,
      toggleMode,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}