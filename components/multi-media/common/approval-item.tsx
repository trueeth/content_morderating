import { EApproval, EModeratorApprovalStatus } from '@interfaces/index'
import Box from '@mui/material/Box'
import clsx from 'clsx'

const RowApproval = (props: { approval: string }) => {
  return (
    <Box
      className={clsx(
        'not-assigned',
        props.approval === EModeratorApprovalStatus.approved && 'approve',
        props.approval === EModeratorApprovalStatus.new && 'new',
        props.approval === EModeratorApprovalStatus.rejected && 'reject',
        props.approval === EModeratorApprovalStatus.inReview && 'review',
        'text-center'
      )}
      style={{
        width:'fit-content'
      }}
    >
      {props.approval?props.approval:'Not Assigned'}
    </Box>
  )
}

export default RowApproval
