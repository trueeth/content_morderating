import Link from 'next/link'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { Container } from '@mui/material'
import LoanDialog from '../components/loan/LoanDialog'
import Image from 'next/image'

const Account = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          mt: 2,
          width: '100%',
          fontFamily: 'Rubik',
        }}
      >
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 5,
                  p: { xs: 1, md: 2 },
                  bgcolor: '#1c2c42',
                  borderRadius: 5,
                  minHeight: '74px',
                  '& .MuiBox-root': {
                    width: 'fit-content',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Image
                    src="https://twopaws.app/static/media/fuel.95a53fd17843648c51b0d000461e4216.svg"
                    alt="img"
                    width={30}
                    height={30}
                  />
                  <Typography>15.63</Typography>
                  <Typography>Gwei</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Image
                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png"
                    alt="img"
                    width={30}
                    height={30}
                  />
                  <Typography>13.97 USD</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 3,
                  p: 2,
                  bgcolor: '#1c2c42',
                  minHeight: '68px !important',
                  borderRadius: 5,
                  '& .MuiButton-root': {
                    whiteSpace: 'nowrap',
                    padding: 'auto 20px',
                    maxWidth: '140px',
                    width: 'fit-content',
                  },
                }}
              >
                <Link href="/">
                  <Button variant="outlined">Orders Book</Button>
                </Link>
                <Link href="./account">
                  <Button variant="outlined">My Account</Button>
                </Link>
                <Button variant="outlined" onClick={() => setVisible(true)}>
                  New Loan
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          mt={4}
          sx={{
            width: '100%',
            minHeight: '80vh',
            borderRadius: '20px',
            bgcolor: 'rgb(31, 48, 74)',
            border: '1px solid #141e2f',
          }}
        >
          <Typography sx={{ ml: 2, fontSize: '25px', my: 2 }}>
            Orders
          </Typography>
          <Divider sx={{ bgcolor: '#141e2f', p: '0.2px' }} />
        </Box>
        <LoanDialog open={visible} handleClose={() => setVisible(false)} />
      </Container>
    </>
  )
}

export default Account
