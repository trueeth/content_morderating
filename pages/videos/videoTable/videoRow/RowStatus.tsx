import { EStatus } from '../../../../interfaces'
import * as React from 'react'
import Box from '@mui/material/Box'
import clsx from 'clsx'

const RowStatus = (props: { status: EStatus }) => {

  return (
    <Box
      className={clsx(
        props.status === EStatus.processed && 'status-processed',
        props.status === EStatus.failed && 'status-failed',
        props.status === EStatus.new && 'status-new',
      )}
    >
      {props.status}
    </Box>
  )

}

export default RowStatus
