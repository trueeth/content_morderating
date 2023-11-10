import { ERating } from '../../../../interfaces'
import * as React from 'react'
import Box from '@mui/material/Box'


//@TODO modify rating
//modify rating
const RowRating = (props: { rating: string }) => {
  if (props.rating === ERating.r18) {
    return (
      <React.Fragment>
        <Box className={'rating-r18'}>r18</Box>
      </React.Fragment>
    )
  } else if (props.rating === ERating.missing) {
    return (
      <React.Fragment>
        <Box className={'rating-missing'}>missing</Box>
      </React.Fragment>
    )
  }
}

export default RowRating
