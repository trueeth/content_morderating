import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Delete, FileUpload, ManageSearch } from '@mui/icons-material'
import { THistoryRowType, TVideoRowType } from '../../../../interfaces'

function HistoryRow(props: { row: THistoryRowType }) {
  const { row } = props

  return (
    <React.Fragment>
      {/*-------main row-----------*/}
      <TableRow
        sx={{
          mt: 2,
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
        <TableCell />
        <TableCell />
        <TableCell />
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
    </React.Fragment>
  )
}

export default HistoryRow
