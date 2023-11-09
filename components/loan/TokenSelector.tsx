import * as React from 'react'
import { FormControl, Select } from '@mui/material'

import { OrderType } from 'interfaces'

const TokenSelector = ({
  orderType,
  tokenType,
}: {
  orderType: OrderType
  tokenType: string
}) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select
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
            gap: '3px !important',
          },
        }}
        inputProps={{
          padding: '0px !important',
        }}
      ></Select>
    </FormControl>
  )
}
export default TokenSelector
