import { StepWrapper } from './index'
import { Box, Radio, RadioGroup, Typography, Button } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import { PrimaryButton } from 'components/styled/StyledButton'

export default function TypeStep(props: { handleNext: () => void }) {
  return (
    <StepWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
        }}
      >
        <Typography>What do you want to upload?</Typography>
        <RadioGroup row>
          <FormControlLabel value="female" control={<Radio />} label="Video" />
          <FormControlLabel value="male" control={<Radio />} label="Audio" />
          <FormControlLabel value="other" control={<Radio />} label="Book" />
        </RadioGroup>
        <Box sx={{ textAlign: 'center' }}>
          <PrimaryButton onClick={props.handleNext} sx={{ width: '100px' }}>
            Next
          </PrimaryButton>
        </Box>
      </Box>
    </StepWrapper>
  )
}
