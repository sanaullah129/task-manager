import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from '../store/authStore';
import { Link as RouterLink } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  const signout = useAuthStore((s) => s.signout);
  console.log('Layout render, user:', user);
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Task Manager
          </Typography>
          {user ? (
            <>
              <Typography variant="body2" sx={{ mr: 2 }}>{user.email} ({user.role})</Typography>
              <ThemeToggle />
              <Button color="inherit" onClick={signout}>Sign Out</Button>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Button color="inherit" component={RouterLink} to="/signin">Sign In</Button>
              <Button color="inherit" component={RouterLink} to="/signup">Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3, flexGrow: 1, width: '100%', maxWidth: 1200, mx: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
