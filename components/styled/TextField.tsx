import { TextField } from '@mui/material'
import { styled } from '@mui/system'

const PrimaryTextField = styled(TextField)({
  fontFamily: 'Raleway',

  '& .MuiOutlinedInput-root': {
    height: '40px',
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
    },
    border: '1px solid #E7E7E7'
  }
})

export { PrimaryTextField }
