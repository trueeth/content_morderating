import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {
  EHistoryData,
  EVideoType,
  THistoryRowType,
} from '../../../../interfaces'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import * as React from 'react'
import HistoryRow from './HistoryRow'

const rows: THistoryRowType[] = [
  {
    name: 'SAW X Video for the design',
    source: EVideoType.video,
    status: 70,
    date: 'Sep, 29, 2023 07:55PM',
  },
  {
    name: 'Test Video for the design',
    source: EVideoType.video,
    status: 40,
    date: 'Sep, 29, 2023 07:55PM',
  },
  {
    name: 'UI UX design for the project',
    source: EVideoType.video,
    status: 60,
    date: 'Sep, 29, 2023 07:55PM',
  },
  {
    name: 'Best Tourism places',
    source: EVideoType.video,
    status: 100,
    date: 'Sep, 29, 2023 07:55PM',
  },
]

export default function HistoryTable() {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '15px', p: 2 }}>
      <Table
        aria-label="collapsible table"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none',
          },
          borderCollapse: 'unset',
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              '& .MuiTableCell-root': {
                fontSize: '12px',
                color: '#888',
                textAlign: 'center',
              },
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
