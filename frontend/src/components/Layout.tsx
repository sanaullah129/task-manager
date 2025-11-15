import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from '../store/authStore';
import { Link as RouterLink } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const signout = useAuthStore((s) => s.signout);
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar sx={{ flexWrap: 'wrap', rowGap: 1 }}>
          <Typography variant={isSmall ? 'subtitle1' : 'h6'} sx={{ flexGrow: 1 }} component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Task Manager
          </Typography>
          {user ? (
            <>
              {!isSmall && <Typography variant="body2" sx={{ mr: 2 }}>{user.email} ({user.role})</Typography>}
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
      <Container component="main" maxWidth="lg" sx={{ py: 3, flexGrow: 1 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
