import { EVideoType } from '../../../interfaces'
import * as React from 'react'
import Box from '@mui/material/Box'
import { Slideshow } from '@mui/icons-material'

const RowType = (props: { type: number }) => {
  if (props.type === EVideoType.video) {
    return (
      <React.Fragment>
        <Box className={'flex'}>
          <Slideshow />
          <div className={'flex justify-center item-center ml-3'}>Video</div>
        </Box>
      </React.Fragment>
    )
  }
}

export default RowType
