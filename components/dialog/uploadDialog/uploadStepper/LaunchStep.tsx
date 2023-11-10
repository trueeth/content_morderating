import { StepWrapper } from './index'
import { Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import React from 'react'


export default function LaunchStep() {

  const [vState, setState] = React.useState({ progress:0 })

  React.useEffect(() => {
    const timer = setInterval(() => {
      const setProgress=(state) => {
        if (state.progress === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return { ...state,progress:Math.min(state.progress + diff, 100) }
      };
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
        }}
      >
        <div>
          Video Upload
        </div>
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={vState.progress} />
        </Box>
        <div className='flex justify-between'>
          <div>
            Uploading
          </div>
          <div>
            Analyzing
          </div>
          <div>
            Indexing
          </div>
          <div>
            Scoring
          </div>
        </div>

        <div>
          Disclaimer: He should not leave this page until the first stage of upload is done.
        </div>

      </Box>
    </StepWrapper>)
}