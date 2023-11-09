'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Box, Divider, FormControlLabel, Grid, Typography } from '@mui/material'
import * as React from 'react'
import Button from '@mui/material/Button'
import { Container } from '@mui/material'
import LoanDialog from '../components/loan/LoanDialog'
import CustomCheckBox from '../components/styled/CheckBox'
import OrderFilter from '../components/OrdersFilter'
import  VideoTable  from "../components/videoTable/VideoTable";
import Image from 'next/image'

const Index = () => {
  //dialog

  const [visible, setVisible] = useState(false)

  const [filter, setFilter] = useState<{
    loanToken: string
    collateralToken: string
    orderType: number
  }>({
    loanToken: null,
    collateralToken: null,
    orderType: null,
  })

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
          overflow: 'auto',
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
                  gap: { xs: 1, md: 4 },
                  flexWrap: 'wrap',
                  p: { xs: 1, md: 2 },
                  bgcolor: '#1c2c42',
                  borderRadius: 5,

                  '& .MuiBox-root': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  <Image
                    src="https://twopaws.io/token-icons/default.png"
                    alt="img"
                    width={30}
                    height={30}
                  />
                  <OrderFilter
                    tokenType="loan"
                    filter={filter}
                    setFilter={setFilter}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  <Image
                    src="https://twopaws.io/token-icons/default.png"
                    alt="img"
                    width={30}
                    height={30}
                  />
                  <OrderFilter
                    tokenType="collateral"
                    filter={filter}
                    setFilter={setFilter}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: { xs: 1, md: 3 },
                  p: 2,
                  bgcolor: '#1c2c42',
                  minHeight: '68px !important',
                  borderRadius: 5,
                  '& .MuiButton-root': {
                    whiteSpace: 'nowrap',
                    padding: 'auto 20px',
                    maxWidth: '140px',
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
          <VideoTable></VideoTable>
          <Divider sx={{ bgcolor: '#141e2f', p: '0.2px' }} />
        </Box>
        <LoanDialog open={visible} handleClose={() => setVisible(false)} />
      </Container>
    </>
  )
}

export default Index
