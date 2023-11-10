import { Box, Typography } from '@mui/material'
import * as React from 'react'
import TokenSelector from './TokenSelector'
import { StyledTextField } from '../styled/CustomTextField'
import {
  setSupLoanAmount,
  setSupCollateralAmount,
  IActionSlice,
} from 'store/slices/action'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from 'store/store'

const SupplyBox = () => {
  const dispatch = useDispatch()
  const actionState = useSelector<IReduxState, IActionSlice>(
    (state) => state.action
  )

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
        <Typography>Loan Amount</Typography>

        <Typography
          sx={{ fontSize: { md: '13px !important' }, color: '#9597a1' }}
        >
          Balance:0
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          gap: 1,
          border: '1px solid #454f5b',
          px: '10px',
          py: 1,
          borderRadius: '10px',
        }}
      >
        <TokenSelector orderType="supply" tokenType="loan" />
        <StyledTextField
          value={actionState.supply.loanAmount}
          onChange={(e) => {
            dispatch(setSupLoanAmount({ loanAmount: e.target.value }))
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
        <Typography>Collateral Amount</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '& .MuiTypography-root': {
              fontSize: { md: '13px !important' },
              color: '#9597a1',
            },
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          gap: 1,
          border: '1px solid #454f5b',
          px: '10px',
          py: 1,
          borderRadius: '10px',
        }}
      >
        <TokenSelector orderType="supply" tokenType="collateral" />
        <StyledTextField
          value={actionState.supply.collateralAmount}
          onChange={(e) => {
            dispatch(
              setSupCollateralAmount({
                collateralAmount: e.target.value,
              })
            )
          }}
        />
      </Box>
    </Box>
  )
}
export default SupplyBox
