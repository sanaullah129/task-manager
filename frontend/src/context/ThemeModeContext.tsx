import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { buildTheme } from '../theme/theme';

interface ThemeModeContextValue {
  mode: 'light' | 'dark';
  toggle: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => (localStorage.getItem('themeMode') as 'light' | 'dark') || 'light');

  const toggle = () => setMode(m => (m === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeModeProvider');
  return ctx;
};
