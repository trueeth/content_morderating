import { ERating } from '@/interfaces/enums'
import * as React from 'react'
import Box from '@mui/material/Box'
import clsx from 'clsx'

const RowRating = (props: { rating: string }) => {
  return (
    <React.Fragment>
      <Box
        className={clsx(
          props.rating === ERating.r18 && 'rating-r18',
          props.rating === ERating.none && 'rating-missing'
        )}
      >
        {props.rating}
      </Box>
    </React.Fragment>
  )
}

export default RowRating
