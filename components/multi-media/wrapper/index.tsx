'use client'

import * as React from 'react'
import { Box, Container } from '@mui/material'
import useTablePagination from '@components/table-pagination/useTablePagination'
import MediaDrawer from '@components/multi-media/drawer'


interface IProps{
  wrapperHeader:React.ReactNode
  wrapperContent:React.ReactNode
}

const MediaWrapper = (props:IProps) => {

  const { CustomPagination } = useTablePagination()

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
      {props.wrapperHeader}
      <Box
        mt={2}
        sx={{
          width: '100%',
          minHeight: '60vh'
        }}
      >
        {props.wrapperContent}
      </Box>
      <CustomPagination></CustomPagination>
      <MediaDrawer/>
    </Box>
  )
}

export default MediaWrapper
