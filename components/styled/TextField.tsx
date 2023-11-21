import { TextField } from '@mui/material'
import { styled } from '@mui/system'

const PrimaryTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    height: '40px',
    fontSize:'1rem',
    backgroundColor:'#F9F9FF',

    '& fieldset': {
      borderColor: '#eee'
    },
    '&:hover fieldset': {
      borderColor: '#eee'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--Primary1)'
    },
    border:'1px solid #E7E7E7',
    boxShadow:'4.89017px 4.89017px 25px 0px #00000024'
  }
})

export { PrimaryTextField }
