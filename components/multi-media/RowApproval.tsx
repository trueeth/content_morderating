import { EApporval, EModeratorApprovalStatus } from '../../interfaces'
import Box from '@mui/material/Box'
import clsx from 'clsx'

const RowApproval = (props: { approval: string }) => {
  return (
    <Box
      className={clsx(
        props.approval === EModeratorApprovalStatus.approved && 'approve',
        props.approval === EModeratorApprovalStatus.new && 'reject',
        props.approval === EModeratorApprovalStatus.rejected && 'pending',
        props.approval === EModeratorApprovalStatus.inReview && 'review',
        'text-center'
      )}
    >
      {props.approval}
    </Box>
  )
}

export default RowApproval