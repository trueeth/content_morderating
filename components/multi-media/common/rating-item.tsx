import { ERating } from '@interfaces/enums'
import * as React from 'react'
import Box from '@mui/material/Box'
import clsx from 'clsx'

const RowRating = (props: { rating: string }) => {
  return (
    <React.Fragment>
      <Box className={`rating-${props.rating?.toLowerCase()}`}>
        {props.rating}
      </Box>
    </React.Fragment>
  )
}

export default RowRating
