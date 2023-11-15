import { EApporval } from '../../../../interfaces'
import Box from '@mui/material/Box'
import clsx from 'clsx'

const RowApproval = (props: { approval: string }) => {
  return (
    <Box
      className={clsx(
        props.approval === EApporval.approve && 'approve',
        props.approval === EApporval.reject && 'reject',
        props.approval === EApporval.pending && 'pending',
        props.approval === EApporval.review && 'review'
      )}
    >
      {props.approval}
    </Box>
  )
}

export default RowApproval
