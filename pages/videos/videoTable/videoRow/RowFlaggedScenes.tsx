import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import clsx from 'clsx'
import { CFlaggedScenesMax } from '../../../../interfaces'

export default function RowFlaggedScenes(props: { value: number }) {
  const percent = (props.value / CFlaggedScenesMax) * 100
  return (
    <Box sx={{ flexGrow: 1 }} display={'flex'}>
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
      <Box className={'text-6 ml-3'}>
        {props.value + '/' + CFlaggedScenesMax}
      </Box>
    </Box>
  )
}
