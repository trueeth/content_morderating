import { EApporval, VApproval } from '../../../interfaces'
import * as React from 'react'
import Box from '@mui/material/Box'
import clsx from 'clsx'

const RowApproval = (props: { approval: number }) => {
  return (
    <React.Fragment>
      <Box
        className={clsx(
          props.approval === EApporval.approve && 'approve',
          props.approval === EApporval.reject && 'reject',
          props.approval === EApporval.pending && 'pending',
          props.approval === EApporval.review && 'review'
        )}
      >
        {VApproval[props.approval]}
      </Box>
    </React.Fragment>
  )
}

export default RowApproval
