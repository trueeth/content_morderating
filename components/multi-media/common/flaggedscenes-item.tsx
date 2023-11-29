import * as React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import clsx from 'clsx'
import { CFlaggedScenesMax } from '@interfaces/index'
import { Typography } from '@mui/material'

export default function RowFlaggedscenes(props: { value: number }) {
  const percent = (props.value / CFlaggedScenesMax) * 100
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
      <LinearProgress
        className={clsx(
          'flagged-scene',
          percent <= 25 && 'flagged-quarter',
          percent > 25 && percent <= 50 && 'flagged-half',
          percent > 50 && 'flagged-half-over'
        )}
        variant="determinate"
        value={percent}
      />
      <Typography sx={{ fontSize: '14px', ml: 2 }}>
        {props.value + '/' + CFlaggedScenesMax}
      </Typography>
    </Box>
  )
}
