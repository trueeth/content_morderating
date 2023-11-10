import { StepWrapper } from './index'
import { Box, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import React from 'react'

export default function LaunchStep() {
  const [vState, setState] = React.useState({ progress: 0 })

  React.useEffect(() => {
    const timer = setInterval(() => {
      const setProgress = (state) => {
        if (state.progress === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return { ...state, progress: Math.min(state.progress + diff, 100) }
      }
      setState(setProgress)
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <StepWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 1,
        }}
      >
        <Typography textAlign="center" my={2} variant="h6">
          Video Upload
        </Typography>
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={vState.progress} />
        </Box>
        <Box
          sx={{
            display: 'flex',
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

        <Typography
          sx={{ mt: 3, textAlign: 'center', width: '80%', color: '#666' }}
        >
          Disclaimer: He should not leave this page until the first stage of
          upload is done.
        </Typography>
      </Box>
    </StepWrapper>
  )
}
