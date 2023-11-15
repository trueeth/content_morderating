import { EVideoType } from '../../../../interfaces'
import * as React from 'react'
import Box from '@mui/material/Box'
import { Slideshow } from '@mui/icons-material'
import { Typography } from '@mui/material'

const RowType = (props: { type: EVideoType }) => {
  if (props.type === EVideoType.video) {
    return (
      <React.Fragment>
        <Box className={'flex'}>
          <Slideshow sx={{ color: '#888' }} />
          <Typography className={'flex justify-center item-center ml-3'}>
            Video
          </Typography>
        </Box>
      </React.Fragment>
    )
  }
}

export default RowType
