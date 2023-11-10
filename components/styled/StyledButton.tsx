import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

const StyledButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'capitalize',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
  backgroundImage: 'var(--Gradiant)',
  margin: '0 10px',
  color: 'white',
})
export default StyledButton
