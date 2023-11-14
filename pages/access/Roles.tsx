import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Table,
  tableCellClasses
} from '@mui/material'
import { TRole } from 'interfaces'
import SearchInput from 'components/styled/SearchInput'

const RoleData: Array<TRole> = [
  {
    name: 'Administrator',
    description:
      'Your role as a Group administrator determines what you are able to do for that Group, like managing the users of the group dashboard.'
  },
  {
    name: 'Auditor',
    description:
      'The group auditor must plan the audit procedures to be performed on the consolidation process.'
  },
  {
    name: 'Viewer',
    description:
      'The group auditor must plan the audit procedures to be performed on the consolidation process.'
  }
]

export default function Roles() {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          color: 'black'
        }}
      >
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 2
          }}
        >
          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography>Roles </Typography>
            <Button
              sx={{
                ml: 2,
                bgcolor: '#ff1313a0',
                color: 'white',
                '&:hover': { bgcolor: '#ff1313a0' }
              }}
            >
              Delete
            </Button>
          </Grid>

          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography>Sort by:</Typography>
            <SearchInput />
          </Grid>
        </Grid>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '15px',
          px: 2,
          '& .MuiTableCell-root': {
            textAlign: 'left',
            whiteSpace: 'nowrap'
          }
        }}
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
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Role Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {RoleData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
