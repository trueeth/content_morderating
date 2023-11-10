import * as React from 'react'
import Box from '@mui/material/Box'
import { Typography, TableRow, TableCell, IconButton } from '@mui/material'
import {
  Delete,
  FileUpload,
  ManageSearch,
  Slideshow,
} from '@mui/icons-material'
import { THistoryRowType } from '../../../../interfaces'
import LinearProgress from '@mui/material/LinearProgress'
import clsx from 'clsx'

export function UploadStatus(props: { value: number }) {
  const percent = (props.value / 100) * 100
  const label = ['Uploading', 'Analyzing', 'Indexing', 'Scoring']
  const labelIndex = Math.ceil((props.value / 100) * 4) - 1
  return (
    <Box sx={{ flexGrow: 1 }} display={'flex'}>
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
      <div className={'text-6 ml-3'}>{label[labelIndex]}</div>
    </Box>
  )
}

function HistoryRow(props: { row: THistoryRowType }) {
  const { row } = props

  return (
    <React.Fragment>
      {/*-------main row-----------*/}
      <TableRow
        sx={{
          '& > .MuiTableCell-root': {
            textAlign: 'center',
            borderTop: '1px solid #ccc',
            borderBottom: '1px solid #ccc',
            '&:first-of-type': {
              borderLeft: '1px solid #ccc',
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
            },
            '&:last-of-type': {
              borderRight: '1px solid #ccc',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
            },
          },
        }}
      >
        <TableCell sx={{ minWidth: '200px' }}>{row.name}</TableCell>
        <TableCell>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
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
              <Delete></Delete>
            </IconButton>
            <IconButton aria-label="expand row" size="small">
              <FileUpload></FileUpload>
            </IconButton>
            <IconButton aria-label="expand row" size="small">
              <ManageSearch></ManageSearch>
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: '5px' }} />
      </TableRow>
    </React.Fragment>
  )
}

export default HistoryRow
