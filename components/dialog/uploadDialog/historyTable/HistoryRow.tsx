import * as React from 'react'
import Box from '@mui/material/Box'
import { Typography, TableRow, TableCell, IconButton } from '@mui/material'
import { ManageSearch, Slideshow } from '@mui/icons-material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { THistoryRowType } from '../../../../interfaces'
import LinearProgress from '@mui/material/LinearProgress'
import clsx from 'clsx'

export function UploadStatus(props: { value: number }) {
  const percent = (props.value / 100) * 100
  const label = ['Uploading', 'Analyzing', 'Indexing', 'Scoring']
  const labelIndex = Math.ceil((props.value / 100) * 4) - 1
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, flexGrow: 1 }}>
      <LinearProgress
        className={clsx(
          'flagged-scene',
          percent <= 25 && 'flagged-quarter',
          percent > 25 && percent <= 50 && 'flagged-half',
          percent > 50 && percent < 100 && 'flagged-half-over',
          percent == 100 && 'flagged-complete'
        )}
        variant="determinate"
        value={percent}
      />
      <Typography sx={{ fontSize: '12px' }}>{label[labelIndex]}</Typography>
    </Box>
  )
}

function HistoryRow(props: { row: THistoryRowType }) {
  const { row } = props

  return (
    <React.Fragment>
      {/*-------main row-----------*/}
      <TableRow>
        <TableCell sx={{ minWidth: '200px' }}>{row.name}</TableCell>
        <TableCell>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5
            }}
          >
            <Slideshow sx={{ color: '#888' }} />
            <Typography>{row.source}</Typography>
          </Box>
        </TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>
          <UploadStatus value={row.status} />
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex' }}>
            <IconButton aria-label="expand row" size="small">
              <DeleteOutlineOutlinedIcon />
            </IconButton>
            <IconButton aria-label="expand row" size="small">
              <FileUploadOutlinedIcon />
            </IconButton>
            <IconButton aria-label="expand row" size="small">
              <ManageSearch></ManageSearch>
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default HistoryRow
