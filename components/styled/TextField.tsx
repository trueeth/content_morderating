import { TextField } from '@mui/material'
import { withStyles } from '@mui/styles'

const PrimaryTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      height: '45px',
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
  }
})(TextField)

export { PrimaryTextField }
