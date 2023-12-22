import * as React from 'react'
import Box from '@mui/material/Box'
import { useTranslate } from '../../../locales'

const RowRating = (props: { rating: string }) => {
  const {t}=useTranslate()
  const title=props.rating?props.rating:'Not Assigned'
  return (
    <React.Fragment>
      <Box className={`rating-${props.rating?.toLowerCase()} not-assigned text-capitalize `}>
        {t(`rowRating.${title.toLowerCase()}`)}
      </Box>
    </React.Fragment>
  )
}

export default RowRating
