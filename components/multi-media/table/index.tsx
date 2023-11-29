import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

interface IProps {
  headerColumn: Object
  children: React.ReactNode
}

const MediaTable: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: '15px', px: 2, boxShadow: 'none' }}
    >
      <Table
        aria-label="collapsible table"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none'
          },
          borderSpacing: '0 0.3rem',
          borderCollapse: 'separate'
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.values(props.headerColumn).map((item, index) => (
              <TableCell
                key={index}
                sx={{
                  whiteSpace: 'wrap',
                  fontSize: '12px',
                  color: '#888',
                  maxWidth: '70px'
                }}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{props.children}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default MediaTable
