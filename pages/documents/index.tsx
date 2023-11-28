'use client'
import * as React from 'react'
import { Box, Pagination, PaginationItem } from '@mui/material'

import DocumentTable from './documentTable'
import DocumentTableHeader from './Header'
import TestVideoDrawer from './drawer'
import { useDispatch, useSelector } from 'react-redux'
import { IAppSlice } from '@/store/reducers'
import { IReduxState } from '@/store/index'
import { openVideoSubDrawer } from '@/store/reducers/drawer.reducers'
import TablePagination from 'components/styled/TablePagination'

const Document = () => {
  //dialog

  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        boxShadow: '0px 0px 25px 0px #F3F3F3;',
        borderRadius: '.4rem',
        border: '1px solid var(--Stroke, #E8E8E8)',
        overflow: 'hidden',
        mt: 1
      }}
    >
      <DocumentTableHeader />
      <Box
        mt={2}
        sx={{
          width: '100%',
          minHeight: '60vh'
        }}
      >
        <DocumentTable />
      </Box>
      <TablePagination>
        <Pagination
          count={4}
          variant="outlined"
          shape="rounded"
          renderItem={(item) => <PaginationItem {...item} />}
        ></Pagination>
      </TablePagination>

      <TestVideoDrawer
        open={appState.drawer.videoSub}
        handleClose={() => dispatch(openVideoSubDrawer({ open: false }))}
      />
    </Box>
  )
}

export default Document
