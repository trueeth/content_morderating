'use client'
import * as React from 'react'
import { useState } from 'react'
import { Box, Pagination } from '@mui/material'
import { Container } from '@mui/material'

import { styled } from '@mui/material/styles'
import VideoTable from '../../components/videoTable/VideoTable'
import VideoTableHeader from '../../components/videoTable/VideoTableHeader'
import TestVideoDrawer from '../../components/testVideo/TestVideoDrawer'

const TablePagination = styled('div')({
  marginTop: '2rem',
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'row-reverse',
  boxShadow: 'none',
  textTransform: 'capitalize',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
})

const Index = () => {
  //dialog

  const [visible, setVisible] = useState(false)

  return (
    <>
      <Container
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100%',
          overflow: 'auto',
        }}
      >
        {/*-------------table header-----------*/}
        <VideoTableHeader />

        {/*----------main table----------*/}
        <Box
          mt={4}
          sx={{
            width: '100%',
            minHeight: '60vh',
            borderRadius: '20px',
            bgcolor: 'rgb(31, 48, 74)',
          }}
        >
          <VideoTable />
        </Box>

        {/*---------table pagination----------*/}
        <TablePagination>
          <Pagination
            count={4}
            variant="outlined"
            shape="rounded"
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

        {/*---------dialog-----------*/}
        <TestVideoDrawer open={false} handleClose={() => setVisible(false)} />
      </Container>
    </>
  )
}

export default Index
