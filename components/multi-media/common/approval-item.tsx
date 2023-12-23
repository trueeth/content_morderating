import {  EModeratorApprovalStatus } from '@interfaces/index'
import Box from '@mui/material/Box'
import clsx from 'clsx'
import { useTranslate } from '../../../locales'

const RowApproval = (props: { approval: string }) => {
  const {t}=useTranslate()

  const title=props.approval?props.approval:'Not Assigned'
  return (
    <Box
      className={clsx(
        'not-assigned',
        props.approval === EModeratorApprovalStatus.approved && 'approve',
        props.approval === EModeratorApprovalStatus.new && 'new',
        props.approval === EModeratorApprovalStatus.rejected && 'reject',
        props.approval === EModeratorApprovalStatus.inReview && 'review',
        'text-center text-capitalize '
      )}
      style={{
        width:'fit-content'
      }}
    >
      {t(`rowApproval.${title.toLowerCase()}`)}
    </Box>
  )
}

export default RowApproval
