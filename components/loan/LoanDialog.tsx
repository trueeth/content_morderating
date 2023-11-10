import CloseIcon from '@mui/icons-material/Close'
import { Typography, Dialog, Box, Button } from '@mui/material'

import { useState } from 'react'

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
