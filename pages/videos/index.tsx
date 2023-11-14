'use client'
import * as React from 'react'
import { Box, Pagination, PaginationItem } from '@mui/material'
import { Container } from '@mui/material'

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
  lineHeight: 1.5,
})

const Video = () => {
  //dialog

  // const [vState, setState] = useState({open:false})

  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)
  // console.log(appState)

  return (
    <>
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

      {/*---------drawer-----------*/}
      <TestVideoDrawer
        open={appState.drawer.videoSub}
        handleClose={() => dispatch(openVideoSubDrawer({ open: false }))}
      />
    </>
  )
}

export default Video
