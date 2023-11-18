import { useState } from 'react'
import { Group } from '@mui/icons-material'
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  Table,
  tableCellClasses,
  Checkbox,
  TableRow
} from '@mui/material'
import { PrimaryButton } from 'components/styled/StyledButton'
import { EGroupData, TGroupData } from 'interfaces'
import Action from './components/Action'
import AddGroupDlg from './components/AddGroupDlg'
import SearchInput from 'components/styled/SearchInput'
import React from 'react'

const GroupData: Array<TGroupData> = [
  {
    name: 'Moderators Group 1',
    owner: 'Mark Mohammad',
    member: 231
  },
  {
    name: 'Moderators Group Backend Development',
    owner: 'Mark Mohammad',
    member: 758
  },
  {
    name: 'Moderators Frontend Development',
    owner: 'Hamza M',
    member: 6
  },
  {
    name: 'Moderators Group 1',
    owner: 'Hamza M',
    member: 43
  },
  {
    name: 'Moderators Group 1',
    owner: 'Mark Mohammad',
    member: 231
  },
  {
    name: 'Moderators Group 1',
    owner: 'Mark Mohammad',
    member: 21
  },
  {
    name: 'Moderators Group 1',
    owner: 'Mark Mohammad',
    member: 90
  },
  {
    name: 'Moderators Group UI/UX',
    owner: 'Hamza M',
    member: 231
  },
  {
    name: 'Moderators Group 1',
    owner: 'Mark Mohammad',
    member: 100
  },
  {
    name: 'Moderators Group UI/UX',
    owner: 'Mark Mohammad',
    member: 45
  }
]

export default function Groups() {
  const [vState, setState] = useState({ openDlg: false })

  const closeDlg = () => {
    setState({ ...vState, openDlg: false })
  }
  return (
    <Box sx={{
      backgroundColor:'white',
      boxShadow:'0px 0px 25px 0px #F3F3F3;',
      borderRadius:'.4rem',
      border:'1px solid var(--Stroke, #E8E8E8)',
      overflow:'hidden',
      m:2
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
            '& .MuiGrid-item': {
              display: 'flex',
              alignItems: 'center'
            }
          }}
        >
          <Grid item>
            <Typography>Groups</Typography>
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
          <Grid item>
            <PrimaryButton
              onClick={() => setState({ ...vState, openDlg: true })}
            >
              <Group sx={{ color: 'white' }} />
              Add New Group
            </PrimaryButton>
            <AddGroupDlg open={vState.openDlg} onClose={closeDlg} />
          </Grid>
        </Grid>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '15px',
          px: 2,
          width: '100%',
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
              {Object.values(EGroupData).map((item, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ whiteSpace: 'nowrap', fontSize: '12px', color: '#888' }}
                >
                  <Checkbox
                    color="primary"
                    sx={{ display: index !== 0 ? 'none' : 'inline' }}
                  />
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {GroupData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox color="primary" checked={false} />
                  {item.name}
                </TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.member}</TableCell>

                <TableCell>
                  <Action />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
