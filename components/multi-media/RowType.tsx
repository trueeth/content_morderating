import { EMediaType } from '../../interfaces'
import * as React from 'react'
import Box from '@mui/material/Box'
import { Slideshow, Article } from '@mui/icons-material'
import { Typography } from '@mui/material'

const RowType = (props: { type: EMediaType }) => {
  if (props.type === EMediaType.video) {
    return (
      <React.Fragment>
        <Box display="flex" gap={0.5}>
          <Article sx={{ color: '#888' }} />
          <Typography>Document</Typography>
        </Box>
      </React.Fragment>
    )
  }
}

export default RowType
