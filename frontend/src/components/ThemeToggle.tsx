import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from '../context/ThemeModeContext';

export default function ThemeToggle() {
  const { mode, toggle } = useThemeMode();
  return (
    <IconButton color="inherit" onClick={toggle} aria-label="toggle theme">
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
