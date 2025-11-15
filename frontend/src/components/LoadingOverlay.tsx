import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface LoadingOverlayProps {
  open: boolean;
  size?: number;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ open, size = 48 }) => (
  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
    <CircularProgress color="inherit" size={size} />
  </Backdrop>
);

export default LoadingOverlay;
