import { EMediaType } from '@interfaces/index'
import * as React from 'react'
import Box from '@mui/material/Box'
import { Slideshow, ArticleOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'

const RowType = (props: { type: EMediaType }) => {
  return (
    <React.Fragment>
      <Box display="flex" gap={0.5}>
        {props.type == EMediaType.video ? (
          <Slideshow sx={{ color: '#888' }} />
        ) : (
          <ArticleOutlined sx={{ color: '#888' }} />
        )}
        <Typography>{props.type}</Typography>
      </Box>
    </React.Fragment>
  )
}

export default RowType
