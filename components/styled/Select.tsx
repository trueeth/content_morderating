import { Select, Typography, SelectProps } from '@mui/material'

const CustomSelect = (props: SelectProps) => {
  const { children, placeholder, ...other } = props
  return (
    <Select
      {...other}
      renderValue={(value: string) =>
        value === '' ? (
          <Typography color="grey">{placeholder}</Typography>
        ) : (
          value
        )
      }
    >
      {children}
    </Select>
  )
}

export default CustomSelect
