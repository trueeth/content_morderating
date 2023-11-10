import { StepWrapper } from './index'
import { Box, Radio, RadioGroup } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import StyledButton from '../../../styled/StyledButton'


export default function TypeStep(props:{handleNext:()=>void}) {
  return (
    <StepWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          What do you want to upload?
        </div>
        <RadioGroup
          row
          aria-labelledby='demo-row-radio-buttons-group-label'
          name='row-radio-buttons-group'
        >
          <FormControlLabel value='female' control={<Radio />} label='Video' />
          <FormControlLabel value='male' control={<Radio />} label='Audio' />
          <FormControlLabel value='other' control={<Radio />} label='Book' />
        </RadioGroup>
        <div>
          <StyledButton onClick={props.handleNext}>
            Next
          </StyledButton>
        </div>
      </Box>
    </StepWrapper>
  )
}