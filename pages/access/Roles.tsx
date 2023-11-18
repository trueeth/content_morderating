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
    <Box sx={{
      backgroundColor:'white',
      boxShadow:'0px 0px 25px 0px #F3F3F3;',
      borderRadius:'.4rem',
      border:'1px solid var(--Stroke, #E8E8E8)',
      overflow:'hidden',
    }}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          color: 'black',
          backgroundColor:'#00000008'
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 2,
            boxShadow:'none',
            '& .MuiGrid-item': {
              display: 'flex',
              alignItems: 'center'
            }
          }}
        >
          <Grid item>
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
          <Grid item sx={{ flexGrow: 1, justifyContent: 'end' }}>
            <Typography whiteSpace="nowrap" mr={2}>
              Sort by:
            </Typography>
            <SearchInput />
          </Grid>
        </Grid>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '15px',
          px: 2,
          boxShadow:'none',
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
    </Box>
  )
}
