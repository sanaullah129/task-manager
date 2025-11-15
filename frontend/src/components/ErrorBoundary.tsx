import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // You could log to an external service here
    console.error('ErrorBoundary caught error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
          <Paper sx={{ p: 4, maxWidth: 600 }} elevation={3}>
            <Typography variant="h5" gutterBottom>Something went wrong.</Typography>
            {this.state.error && (
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mb: 2 }} color="error">
                {this.state.error.message}
              </Typography>
            )}
            <Button variant="contained" onClick={this.handleReset}>Try Again</Button>
          </Paper>
        </Box>
      );
    }
    return this.props.children;
  }
}

// Convenience functional wrapper
export const WithErrorBoundary: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ErrorBoundary>{children}</ErrorBoundary>
);
