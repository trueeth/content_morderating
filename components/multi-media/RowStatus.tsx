import { EProcessingStatus } from '../../interfaces'
import * as React from 'react'
import Box from '@mui/material/Box'
import clsx from 'clsx'

const RowStatus = (props: { status: EProcessingStatus }) => {
  return (
    <Box
      className={clsx(
        // 'text-uppercase',
        props.status === EProcessingStatus.processed && 'status-processed',
        props.status === EProcessingStatus.failed && 'status-failed',
        props.status === EProcessingStatus.new && 'status-new'
      )}
    >
      {props.status}
    </Box>
  )
}

export default RowStatus
