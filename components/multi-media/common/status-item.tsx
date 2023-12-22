import { EProcessingStatus } from '@interfaces/index'
import * as React from 'react'
import Box from '@mui/material/Box'
import { useTranslate } from '../../../locales'

const RowStatus = (props: { status: EProcessingStatus }) => {
  const {t}=useTranslate()
  const title=props.status?props.status:'Not Assigned'
  return (
    <Box className={`status-${props.status.toLowerCase()} text-capitalize`}>
      {t(`rowStatus.${title.toLowerCase()}`)}
    </Box>
  )
}

export default RowStatus
