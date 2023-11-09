import { useState } from 'react'
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material'

const Filter = ({ tokenType, filter, setFilter }) => {
  const [crypto, setCrypto] = useState('')

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select
        value={crypto}
        displayEmpty
        sx={{
          color: '#ececec',
          borderRadius: '8px',
          '&.MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#454f5b',
            },
            '&:hover fieldset': {
              borderColor: '#454f5b',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#454f5b',
            },
          },
          '& .MuiSvgIcon-root': {
            color: '#ececec',
          },
          '& .MuiSelect-select': {
            p: 0,
            py: 0.5,
          },
        }}
        inputProps={{
          padding: '0px !important',
          gap: '0px !important',
        }}
      >
        <MenuItem value="">
          <Box
            sx={{
              width: '100%',
              justifyContent: 'center',
              pl: 3,
              py: 0.4,
            }}
          >
            <Typography sx={{ letterSpacing: '2px' }}>Filter</Typography>
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}
export default Filter
