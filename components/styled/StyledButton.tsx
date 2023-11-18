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
  color: 'white'
})

const PrimaryButton = styled(Button)(({ active = true }:{active?:boolean})=>({
  boxShadow: 'none',
  textTransform: 'capitalize',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
  backgroundColor: active?'var(--Primary1)':'#00000061',
  margin: '0 10px',
  color: 'white',
  textWrap:'nowrap',
  width:'auto !important',
  '&:hover': {
    backgroundColor: active?'var(--Primary1)':'#00000061'
  }
}))

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

export { StyledButton, PrimaryButton, TopButton }
