import { TextField } from '@mui/material'
import { withStyles } from '@mui/styles'

const PrimaryTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#eee',
        backgroundColor: '#fff',
      },
      '&:hover fieldset': {
        borderColor: '#eee',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--Primary1)',
      },
    },
  },
})(TextField)

export { PrimaryTextField }
