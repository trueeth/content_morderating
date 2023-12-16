import { TextField } from '@mui/material'
import { styled } from '@mui/system'

const PrimaryTextField = styled(TextField)({
  '& input': {
    fontSize: '0.8rem'
  },
  '& .MuiOutlinedInput-root': {
    padding: '.5rem',
    fontSize: '1rem',
    backgroundColor: 'white',

    '& fieldset': {
      borderColor: '#eee'
    },
    '&:hover fieldset': {
      borderColor: '#eee'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--Primary1)'
    }
  }
})

export { PrimaryTextField }
