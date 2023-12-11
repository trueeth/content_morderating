import { EApporval, EModeratorApprovalStatus } from '@interfaces/index'
import Box from '@mui/material/Box'
import clsx from 'clsx'

const RowApproval = (props: { approval: string }) => {
  return (
    <Box
      className={clsx(
        props.approval === EModeratorApprovalStatus.approved && 'approve',
        props.approval === EModeratorApprovalStatus.new && 'new',
        props.approval === EModeratorApprovalStatus.rejected && 'reject',
        props.approval === EModeratorApprovalStatus.inReview && 'review',
        'text-center'
      )}
    >
      {props.approval}
    </Box>
  )
}

export default RowApproval
