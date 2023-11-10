'use client'
import * as React from 'react'
import { useState } from 'react'
import { Box, Pagination, PaginationItem } from '@mui/material'
import { Container } from '@mui/material'

import { styled } from '@mui/material/styles'
import VideoTable from './videoTable/VideoTable'
import VideoTableHeader from './Header'
import TestVideoDrawer from './drawer/TestVideoDrawer'

const TablePagination = styled('div')({
  marginTop: '1rem',
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
          width: '100%',
          maxWidth: '1400px !important',
          overflow: 'auto',
        }}
      >
        {/*-------------table header-----------*/}
        <VideoTableHeader />

        {/*----------main table----------*/}
        <Box
          mt={2}
          sx={{
            width: '100%',
            minHeight: '60vh',
            borderRadius: '20px',
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
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  '&.Mui-selected': {
                    backgroundImage: 'var(--Gradiant)',
                    color: '#fff',
                    border: 'none',
                  },
                }}
              />
            )}
          ></Pagination>
        </TablePagination>

        {/*---------dialog-----------*/}
        <TestVideoDrawer open={false} handleClose={() => setVisible(false)} />
      </Container>
    </>
  )
}

export default Index
