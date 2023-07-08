import { CircularProgress } from '@mui/material';
import React from 'react';

export const Loading = () => {
  return (
    <div className="flex justify-center p-10">
      <CircularProgress />
    </div>
  );
};
