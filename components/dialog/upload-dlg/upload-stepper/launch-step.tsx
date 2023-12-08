import { StepWrapper } from './index';
import { Box, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';
import { useSelector } from 'react-redux';
import { IReduxState } from '@store/index';
import { IAppSlice } from '@store/reducers';

// Component for the Launch step in the upload process
export default function LaunchStep() {
  
  // Fetching app state
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app);

  return (
    <StepWrapper>
      {/* Container for LaunchStep content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: 1,
        }}
      >
        {/* Heading for the step */}
        <Typography textAlign="center" my={2} variant="h6">
          Video Upload
        </Typography>

        {/* Linear progress bar showing the upload progress */}
        <Box
          sx={{
            width: { xs: '90%', md: '80%' },
          }}
        >
          <LinearProgress
            variant="determinate"
            value={appState.upload.progress}
          />
        </Box>

        {/* Displaying step labels for larger screens */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            width: '100%',
            justifyContent: 'space-between',
            '& .MuiTypography-root': {
              fontSize: '12px',
              color: '#333',
            },
          }}
        >
          <Typography>Uploading</Typography>
          <Typography>Analyzing</Typography>
          <Typography>Indexing</Typography>
          <Typography>Scoring</Typography>
        </Box>

        {/* Disclaimer text */}
        <Typography
          sx={{
            mt: 3,
            textAlign: 'center',
            width: '80%',
            color: '#666',
            fontSize: '14px',
          }}
        >
          Disclaimer: Do not leave this page until the first stage of upload is done.
        </Typography>
      </Box>
    </StepWrapper>
  );
}
