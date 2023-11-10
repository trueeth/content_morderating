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
import { FilterList, Sort } from '@mui/icons-material'
import VideoTableHeader from '../components/videoTable/VideoTableHeader'

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
          mx:3,
          backgroundColor:'white',
          width: '100%',
          fontFamily: 'Rubik',
          overflow: 'auto',
        }}
      >

        {/*-------------table header-----------*/}
        <VideoTableHeader>

        </VideoTableHeader>

        {/*----------main table----------*/}
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

        {/*---------dialog-----------*/}
        <LoanDialog open={visible} handleClose={() => setVisible(false)} />
      </Container>
    </>
  )
}

export default Index
