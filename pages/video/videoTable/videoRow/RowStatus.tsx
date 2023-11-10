import { EStatus } from '../../../../interfaces'
import * as React from 'react'
import Box from '@mui/material/Box'

const RowStatus = (props: { status: number }) => {
  if (props.status === EStatus.new) {
    return <Box className={'status-new'}>new</Box>
  } else if (props.status === EStatus.failed) {
    return <Box className={'status-failed'}>failed</Box>
  } else if (props.status === EStatus.processed) {
    return <Box className={'status-processed'}>processed</Box>
  }
}

export default RowStatus
