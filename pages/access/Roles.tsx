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
  tableCellClasses, Tooltip, Select,
} from '@mui/material'
import { TRole } from 'interfaces'
import SearchInput from 'components/styled/SearchInput'
import InfoIcon from '@mui/icons-material/Info'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { useState } from 'react'

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
  const [vState, setState] = useState({ sortBy:'0'})


  const handleSortByChange = (event: any) => {
    setState({ ...vState,sortBy: event.target.value })
  }
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
            <Tooltip title="Reports History">
              <InfoIcon sx={{ color: 'grey', width: '16px', ml: 1, mt: -1 }} />
            </Tooltip>
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
          <Grid item
                sx={{
                  flexGrow: 1,
                  justifyContent: { md:'end',xs:'left' },
                  display: 'flex',
                  flexWrap:'wrap',
                  flexDiretion:{
                    xs:'column'
                  }
          }}>
            <Grid item sx={{ display: 'flex',}}>
              <Typography whiteSpace='nowrap' mr={1}>
                Sort by:
              </Typography>
              <Select
                value={vState.sortBy}
                onChange={handleSortByChange}
                sx={{
                  height: '36px',
                  width: '6rem',
                  mr: 2,
                }}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>Name</MenuItem>
              </Select>
            </Grid>
            <Grid sx={{
              display:'flex',
              paddingTop: {
                sm:0,
                xs:2
              }
            }}>
              <SearchInput />
            </Grid>
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
