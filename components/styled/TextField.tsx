import { TextField } from '@mui/material'
import { styled } from '@mui/system'

const PrimaryTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    height: '40px',
    backgroundColor: 'white',
    padding: '0 5px',
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
