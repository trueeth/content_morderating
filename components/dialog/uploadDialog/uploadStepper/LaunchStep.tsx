import { StepWrapper } from './index'
import { Box, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import React from 'react'

export default function LaunchStep() {
  const [vState, setState] = React.useState({ progress: 0 })

  return (
    <StepWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: 1
        }}
      >
        <Typography textAlign="center" my={2} variant="h6">
          Video Upload
        </Typography>
        <Box
          sx={{
            width: { xs: '90%', md: '80%' }
          }}
        >
          <LinearProgress variant="determinate" value={0} />
        </Box>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            width: '100%',
            justifyContent: 'space-between',
            '& .MuiTypography-root': {
              fontSize: '12px',
              color: '#333'
            }
          }}
        >
          <Typography>Uploading</Typography>
          <Typography>Analyzing</Typography>
          <Typography>Indexing</Typography>
          <Typography>Scoring</Typography>
        </Box>

        <Typography
          sx={{
            mt: 3,
            textAlign: 'center',
            width: '80%',
            color: '#666',
            fontSize: '14px'
          }}
        >
          Disclaimer: He should not leave this page until the first stage of
          upload is done.
        </Typography>
      </Box>
    </StepWrapper>
  )
}
