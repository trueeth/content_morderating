import { useState } from 'react'
import {
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Modal,
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  backgroundColor: '#1f304a',
  borderRadius: '15px',
  color: '#ececec',
  padding: '20px 20px',
}

function OrderTable({ orders }: { orders: Array<string> }) {
  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState<string | null>(null)

  return (
    <TableContainer
      sx={{
        px: 2,
        height: '64vh',
        overflowY: 'auto',
      }}
    >
      <Table
        sx={{
          borderSpacing: '0px 5px',
          borderCollapse: 'separate',
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              '& .MuiTableCell-root': {
                color: '#9597a1',
                backgroundColor: '#1f304a',
                textAlign: 'center',
                fontFamily: 'square',
                fontSize: '15px',
                borderBottom: 'none',
                paddingTop: '10px',
                paddingBottom: '10px',
              },
            }}
          >
            <TableCell>Loan Amount</TableCell>
            <TableCell>Collateral Amount</TableCell>
            <TableCell>Lender Fee</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Reward</TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
      {order && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={modalStyle}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography fontSize="20px">Info</Typography>
              <CloseIcon
                onClick={() => setOpen(false)}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
            <Box
              sx={{
                '& > .MuiBox-root': {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  my: 2,
                  '& > p:first-of-type': {
                    color: '#aaa',
                    fontSize: '14px',
                  },
                  '& .MuiBox-root': {
                    display: 'flex',
                    alignItems: 'center',
                  },
                },
              }}
            >
              <Box>
                <Typography>Loan Amount</Typography>
              </Box>
              <Box>
                <Typography>Collateral Amount</Typography>
              </Box>
              <Box>
                <Typography>Lender Fee</Typography>
                <Typography>0</Typography>
              </Box>
              <Box>
                <Typography>will get</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: 'grey',
                      maxWidth: '150px',
                      textAlign: 'right',
                    }}
                  ></Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  px: 4,
                  flexDirection: 'column',
                  '& .MuiTypography-root': {
                    color: '#aaa',
                    fontSize: '14px',
                  },
                }}
              >
                <Typography mb={1}>
                  have from
                  <span
                    style={{
                      fontSize: '16px',
                      color: '#ccc',
                      padding: '0 5px',
                    }}
                  ></span>
                  to repay your loan, with the deadline being
                  <span
                    style={{
                      fontSize: '16px',
                      color: '#ccc',
                      padding: '0 5px',
                    }}
                  ></span>
                </Typography>
                <Typography>
                  If the repayment is not completed, all collateral amount go to
                  the lender.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </TableContainer>
  )
}

export default OrderTable
