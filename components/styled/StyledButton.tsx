import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

const StyledButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'capitalize',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
  backgroundColor: 'linear-gradient(90deg, #75598d 0%, #3ec0d8 92.75%)',
  margin: '0 10px',
})
export default StyledButton
