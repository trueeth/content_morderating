import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { EHistoryData, EMediaType } from '@interfaces/enums'
import { THistoryRowType } from '@interfaces/types'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import * as React from 'react'
import HistoryRow from './history-row'

const rows: THistoryRowType[] = [
  {
    name: 'SAW X Video for the design',
    source: EMediaType.video,
    status: 20,
    date: 'Sep, 29, 2023 07:55PM'
  },
  {
    name: 'Test Video for the design',
    source: EMediaType.video,
    status: 40,
    date: 'Sep, 29, 2023 07:55PM'
  },
  {
    name: 'UI UX design for the project',
    source: EMediaType.video,
    status: 60,
    date: 'Sep, 29, 2023 07:55PM'
  },
  {
    name: 'Best Tourism places',
    source: EMediaType.video,
    status: 100,
    date: 'Sep, 29, 2023 07:55PM'
  }
]

export default function HistoryTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: '15px', boxShadow: 'none', marginTop: '-1rem' }}
    >
      <Table
        aria-label="collapsible table"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none'
          }
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              '& .MuiTableCell-root': {
                fontSize: '12px',
                color: '#888',
                textAlign: 'center'
              }
            }}
          >
            {Object.values(EHistoryData).map((item, index) => (
              <TableCell key={index}>{item}</TableCell>
            ))}
            <TableCell>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <HistoryRow key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
