import { EProcessingStatus } from '@interfaces/index'
import * as React from 'react'
import { useTranslate } from '../../../locales'
import Typography from '@mui/material/Typography'

const RowStatus = (props: { status: EProcessingStatus }) => {
  const {t}=useTranslate()
  const title=props.status?props.status:'Not Assigned'
  return (
    <Typography className={`status-${props.status.toLowerCase()} text-capitalize text-8`}>
      {t(`rowStatus.${title.toLowerCase()}`)}
    </Typography>
  )
}

export default RowStatus
