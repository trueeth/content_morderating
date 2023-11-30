import { StepWrapper } from './index'
import { Box, Radio, RadioGroup, Typography, Button } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import { PrimaryButton } from '@components/common/styled-button'
import React, { useState } from 'react'

export default function TypeStep(props: { handleNext: (any) => void }) {
  const [vState, setState] = useState('Video')
  const handleNext = () => {
    props.handleNext(vState)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((event.target as HTMLInputElement).value)
  }

  return (
    <StepWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          '& .MuiTypography-root': {
            sm: { fontSize: '.9rem' },
            xs: { fontSize: '.7rem' }
          }
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '1rem'
          }}
        >
          What do you want to upload?
        </Typography>
        <RadioGroup
          row
          sx={{ justifyContent: 'center' }}
          value={vState}
          onChange={handleChange}
        >
          <FormControlLabel value="Video" control={<Radio />} label="Video" />
          <FormControlLabel value="Audio" control={<Radio />} label="Audio" />
          <FormControlLabel value="Document" control={<Radio />} label="Book" />
        </RadioGroup>
        <Box sx={{ textAlign: 'center' }}>
          <PrimaryButton onClick={handleNext} sx={{ width: '100px' }}>
            Next
          </PrimaryButton>
        </Box>
      </Box>
    </StepWrapper>
  )
}
