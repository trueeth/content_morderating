import { styled } from '@mui/system'
import Button from '@mui/material/Button'

const TopButton = styled(Button)(
  ({
    active = false,
    primary = true
  }: {
    active?: boolean
    primary?: boolean
  }) => ({
    color: active ? 'var(--Primary1)' : '#eee',
    boxShadow: 'none',
    textTransform: 'capitalize',
    margin: '0 5px',
    fontSize: 16,
    padding: '6px 12px',
    lineHeight: 1.5,
    backgroundColor: primary ? 'none' : 'var(--Primary1)',

    '&:focus': {
      color: 'white'
    },
    '&:hover': {
      backgroundColor: primary ? 'none' : 'var(--Primary1)'
    }
  })
)
export default TopButton
