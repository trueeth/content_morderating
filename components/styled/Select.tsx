import { Select, Typography, SelectProps } from '@mui/material'
import { ExpandMoreOutlined } from '@mui/icons-material'

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

      sx={{
        fontSize:'0.75rem',
        backgroundColor:'#F9F9FF',
        '& div': {
          color:'#474747'
        },
        '& fieldset':{
          border:'1px solid #E7E7E7'
        },
        boxShadow:'4.89017px 4.89017px 25px 0px #00000024'
      }}


      IconComponent={ExpandMoreOutlined}

    >
      {children}
    </Select>
  )
}

export default CustomSelect
