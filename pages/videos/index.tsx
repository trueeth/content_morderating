'use client'
import * as React from 'react'
import { Box, Pagination, PaginationItem } from '@mui/material'

import { styled } from '@mui/material/styles'
import VideoTable from './videoTable'
import VideoTableHeader from './Header'
import TestVideoDrawer from './drawer'
import { useDispatch, useSelector } from 'react-redux'
import { IAppSlice } from '../../store/reducers'
import { IReduxState } from '../../store'
import { openVideoSubDrawer } from '../../store/reducers/drawer.reducers'

const TablePagination = styled('div')({
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'row-reverse',
  boxShadow: 'none',
  textTransform: 'capitalize',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5
})

const Video = () => {
  //dialog

  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  return (
    <Box
      sx={{
        backgroundColor:'white',
        boxShadow:'0px 0px 25px 0px #F3F3F3;',
        borderRadius:'.4rem',
        border:'1px solid var(--Stroke, #E8E8E8)',
        overflow:'hidden',
        m:1
      }}
    >
      <VideoTableHeader />
      <Box
        mt={2}
        sx={{
          width: '100%',
          minHeight: '60vh',
        }}
      >
        <VideoTable />
      </Box>
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
                  bgcolor: 'var(--Primary1)',
                  color: '#fff',
                  border: 'none'
                }
              }}
            />
          )}
        ></Pagination>
      </TablePagination>

      <TestVideoDrawer
        open={appState.drawer.videoSub}
        handleClose={() => dispatch(openVideoSubDrawer({ open: false }))}
      />
    </Box>
  )
}

export default Video
