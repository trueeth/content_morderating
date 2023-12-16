import * as React from 'react'
import Box from '@mui/material/Box'

const RowRating = (props: { rating: string }) => {
  return (
    <React.Fragment>
      <Box className={`rating-${props.rating?.toLowerCase()} not-assigned `}>
        {props.rating?props.rating:'Not Assigned'}
      </Box>
    </React.Fragment>
  )
}

export default RowRating
