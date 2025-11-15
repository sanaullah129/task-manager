import { createTheme } from '@mui/material/styles';

export const buildTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: { default: '#f7f9fc', paper: '#ffffff' },
          }
        : {
            background: { default: '#121212', paper: '#1e1e1e' },
          }),
    },
    shape: { borderRadius: 8 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600 },
        },
      },
    },
  });
