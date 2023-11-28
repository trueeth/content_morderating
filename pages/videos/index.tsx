'use client'
import * as React from 'react'
import { Box, Pagination, PaginationItem } from '@mui/material'

import VideoTable from './videoTable'
import VideoTableHeader from './Header'
import TestVideoDrawer from './drawer'
import { useDispatch, useSelector } from 'react-redux'
import { IAppSlice } from '@/store/reducers'
import { IReduxState } from '@/store/index'
import { openVideoSubDrawer } from '@/store/reducers/drawer.reducers'
import TablePagination from 'components/styled/TablePagination'
import { log } from 'console'
import useTablePagination from '../../hooks/useTablePagination'
import Loading from '@/components/Loading'
import { useEffect, useState } from 'react'

const Video = () => {
  //dialog

  const dispatch = useDispatch()
  const {CustomPagination}=useTablePagination()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)
  const [vState, setState]=useState({loading:false})
  // useEffect(()=>{
  //   if (appState.api.data==null) {
  //       setState({...vState,loading: true})
  //   } else {
  //     setState({...vState, loading: false })
  //   }
  // },[appState])
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
      {vState.loading?
        <Loading/>:
        (<>
        <VideoTableHeader />
        <Box
          mt={2}
          sx={{
            width: '100%',
            minHeight: '60vh'
          }}
        >
          <VideoTable />
        </Box>
        <CustomPagination></CustomPagination>
        <TestVideoDrawer
          open={appState.drawer.videoSub}
          handleClose={() => dispatch(openVideoSubDrawer({ open: false }))}
        />
      </>)}
    </Box>
  )
}

export default Video
