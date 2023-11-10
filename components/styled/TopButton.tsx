import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

const TopButton = styled(Button)({
  color: '#eee',
  boxShadow: 'none',
  textTransform: 'capitalize',
  margin: '0 5px',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
  backgroundColor: 'none',

  '&:focus': {
    color: 'var(--Primary1)',
  },
})
export default TopButton
