import { EVideoType } from '../../../../interfaces'
import * as React from 'react'
import Box from '@mui/material/Box'
import { Slideshow } from '@mui/icons-material'
import { Typography } from '@mui/material'

const RowType = (props: { type: EVideoType }) => {
  if (props.type === EVideoType.video) {
    return (
      <React.Fragment>
        <Box display="flex" gap={0.5}>
          <Slideshow sx={{ color: '#888' }} />
          <Typography>Video</Typography>
        </Box>
      </React.Fragment>
    )
  }
}

export default RowType
