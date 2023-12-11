import { EProcessingStatus } from '@interfaces/index'
import * as React from 'react'
import Box from '@mui/material/Box'
import clsx from 'clsx'

const RowStatus = (props: { status: EProcessingStatus }) => {
  return (
    <Box className={`status-${props.status.toLowerCase()}`}>
      {props.status?props.status:'Not Assigned'}
    </Box>
  )
}

export default RowStatus
