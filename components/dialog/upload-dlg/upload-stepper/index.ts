import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export * from './upload-stepper'

export const StepWrapper = styled(Box)({
  borderRadius: '.625rem',
  border: '1px solid var(--Stroke)',
  backgroundColor: 'rgb(0 0 0 / 2%)',
  display: 'flex',
  justifyContent: 'center',
  padding: '1.5rem 0.5rem'
})
