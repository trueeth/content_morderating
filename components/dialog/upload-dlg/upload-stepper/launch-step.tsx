import { StepWrapper } from './index';
import { Box, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';
import { useSelector } from 'react-redux';
import { IReduxState } from '@store/index';
import { IAppSlice } from '@store/reducers';
import { useTranslate } from '../../../../locales'

// Component for the Launch step in the upload process
export default function LaunchStep(props:any) {

  const {t}=useTranslate()
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
          width:'60%',
        }}
      >
        {/* Heading for the step */}
        <Typography textAlign="center" my={2} variant="h6">
          {props.data.mediaType==='Video'?t('uploadDlg.step.Video Upload'):t('uploadDlg.step.Document Upload')}
        </Typography>

        {/* Linear progress bar showing the upload progress */}
        <Box
          sx={{
            width: { xs: '90%', md: '80%' },
          }}
          className='stepper-state'
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
          className='stepper-state-title'
        >
          <Typography>{t('uploadDlg.step.Uploading')}</Typography>
          <Typography>{t('uploadDlg.step.Analyzing')}</Typography>
          <Typography>{t('uploadDlg.step.Indexing')}</Typography>
          <Typography>{t('uploadDlg.step.Scoring')}</Typography>
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
          {t('uploadDlg.step.disclaimer')}
        </Typography>
      </Box>
    </StepWrapper>
  );
}
