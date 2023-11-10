'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Box, Divider, FormControlLabel, Grid, Pagination, Typography } from '@mui/material'
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
import { styled } from '@mui/material/styles'
import TestVideoDrawer from '../components/testVideo/TestVideoDrawer'



const TablePagination = styled('div')({
  marginTop:'2rem',
  marginBottom:'2rem',
  display:'flex',
  flexDirection:'row-reverse',
  boxShadow: 'none',
  textTransform: 'capitalize',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
})

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
          backgroundColor:'white',
          width: '100%',
          fontFamily: 'Rubik',
          overflow: 'auto',
          paddingLeft:'0 !important',
          paddingRight:'0 !important',
        }}
      >

        {/*------------- main content -----------*/}
        <div
          style={{
            border:'1px solid var(--Stroke)',
            paddingLeft:'2rem',
            paddingRight:'2rem',
            borderBottomLeftRadius:'.5rem',
            borderBottomRightRadius:'.5rem',
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

          {/*---------table pagination----------*/}
          <TablePagination>
            <Pagination
              count={4} variant='outlined' shape='rounded'
              sx={{
                // backgroundColor:'red',
                '&:hover': {
                  backgroundColor: 'var(--Gradiant)',
                  boxShadow: 'none',
                },
                '&:active': {
                  boxShadow: 'none',
                  backgroundColor: 'var(--Gradiant)',
                },
                '&:focus': {
                  boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
                },
              }}
            ></Pagination>
          </TablePagination>
        </div>

        {/*---------dialog-----------*/}
        <TestVideoDrawer open={false} handleClose={() => setVisible(false)} />
      </Container>
    </>
  )
}

export default Index
