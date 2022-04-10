import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex', position: 'absolute', height:'100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(173, 173, 173, 0.7)'}}>
      <CircularProgress />
    </Box>
  );
}