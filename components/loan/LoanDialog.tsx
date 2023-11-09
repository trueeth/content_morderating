import CloseIcon from '@mui/icons-material/Close'
import { Typography, Dialog, Box, Button } from '@mui/material'
import DatePicker from '../styled/DatePicker'

import { useState } from 'react'

import LoanDetail from './LoanDetail'

import SupplyBox from './SupplyBox'
import BorrowBox from './BorrowBox'

import { DatePickerType, OrderType } from 'interfaces'

interface IOpenProps {
  open: boolean
  handleClose: () => void
}

export default function LoanDialog({ open, handleClose }: IOpenProps) {
  const [view, setview] = useState('supply')

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          backgroundColor: '#1f304a',
          boxShadow: 'none',
          borderRadius: '15px',
          color: '#ececec',
          padding: '10px 20px',
        },
      }}
      scroll={'body'}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography p={1} sx={{ fontSize: '18px' }}>
          Create {view === 'supply' ? 'Supply' : 'Borrow'} Loan
        </Typography>
        <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          mt: 3,
          mx: 4,
        }}
      >
        <Button
          value="supply"
          onClick={() => setview('supply')}
          sx={{
            backgroundColor: view === 'supply' ? '#182539 !important' : '',
          }}
        >
          Supply
        </Button>

        <Button
          value="borrow"
          onClick={() => setview('borrow')}
          sx={{
            backgroundColor: view === 'borrow' ? '#182539 !important' : '',
          }}
        >
          Borrow
        </Button>
      </Box>
      <Box
        sx={{
          '& .MuiTypography-root': {
            mt: 2,
            mb: 0.5,
            fontSize: { xs: '15px', md: '15px' },
            letterSpacing: 1,
          },
        }}
      >
        {view === 'supply' ? <SupplyBox /> : <BorrowBox />}
        <Typography ml={2} mb={0.5}>
          The repayment period for this credit starts on:
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <DatePicker
            pickerType={DatePickerType.START}
            orderType={view === 'supply' ? OrderType.SUPPLY : OrderType.BORROW}
          />
        </Box>
        <Typography ml={2} mb={0.5}>
          Ends on:
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <DatePicker
            pickerType={DatePickerType.END}
            orderType={view === 'supply' ? OrderType.SUPPLY : OrderType.BORROW}
          />
        </Box>
      </Box>

      <LoanDetail
        orderType={view === 'supply' ? OrderType.SUPPLY : OrderType.BORROW}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          mb: 1,
          mt: 2,
          mx: { xs: 0, md: 3 },
        }}
      >
        <Button>OK</Button>
      </Box>
    </Dialog>
  )
}
