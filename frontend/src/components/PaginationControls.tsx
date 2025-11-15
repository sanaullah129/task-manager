import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const PaginationControls: React.FC<Props> = ({ page, totalPages, onChange }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
      <IconButton disabled={page <= 1} onClick={() => onChange(page - 1)}><ChevronLeftIcon /></IconButton>
      <Typography variant="body2">Page {page} / {totalPages}</Typography>
      <IconButton disabled={page >= totalPages} onClick={() => onChange(page + 1)}><ChevronRightIcon /></IconButton>
    </Box>
  );
};
