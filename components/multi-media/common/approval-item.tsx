import { EApporval, EModeratorApprovalStatus } from '@interfaces/index'
import Box from '@mui/material/Box'
import clsx from 'clsx'

const RowApproval = (props: { approval: string }) => {
  return (
    <Box
      className={clsx(
        props.approval === EModeratorApprovalStatus.approved && 'reject',
        props.approval === EModeratorApprovalStatus.new && 'reject',
        props.approval === EModeratorApprovalStatus.rejected && 'pending',
        props.approval === EModeratorApprovalStatus.inReview && 'review',
        'text-center'
      )}
    >
      {props.approval &&
        (props.approval == EModeratorApprovalStatus.inReview ||
        props.approval == EModeratorApprovalStatus.rejected
          ? 'Approved'
          : 'Disclined')}
    </Box>
  )
}

export default RowApproval
