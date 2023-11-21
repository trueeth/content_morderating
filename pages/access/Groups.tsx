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
  TableRow,
  Tooltip,
  Select,
  Pagination,
  PaginationItem
} from '@mui/material'
import { PrimaryButton } from 'components/styled/StyledButton'
import { EGroupData, TGroupData } from 'interfaces'
import Action from './components/Action'
import AddGroupDlg from './components/AddGroupDlg'
import SearchInput from 'components/styled/SearchInput'
import React from 'react'
import InfoIcon from '@mui/icons-material/Info'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from 'components/styled/TablePagination'

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
  const [vState, setState] = useState({ openDlg: false, sortBy: '0' })

  const closeDlg = () => {
    setState({ ...vState, openDlg: false })
  }

  const handleSortByChange = (event: any) => {
    setState({ ...vState, sortBy: event.target.value })
  }
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        boxShadow: '0px 0px 25px 0px #F3F3F3;',
        borderRadius: '.4rem',
        border: '1px solid var(--Stroke, #E8E8E8)',
        overflow: 'hidden',
        m: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          color: 'black',
          backgroundColor: '#00000008'
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
            <Tooltip title="Group">
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
          <Grid
            item
            sx={{
              flexGrow: 1,
              justifyContent: { md: 'end', xs: 'left' },
              display: 'flex',
              flexWrap: 'wrap',
              flexDiretion: {
                xs: 'column'
              }
            }}
          >
            <Grid item sx={{ display: 'flex' }}>
              <Typography whiteSpace="nowrap" mr={1}>
                Sort by:
              </Typography>
              <Select
                value={vState.sortBy}
                onChange={handleSortByChange}
                sx={{
                  height: '36px',
                  width: '6rem',
                  mr: 2
                }}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>Name</MenuItem>
              </Select>
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                paddingTop: {
                  sm: 0,
                  xs: 2
                }
              }}
            >
              <SearchInput />
            </Grid>
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
          boxShadow: 'none',
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
      <TablePagination>
        <Pagination
          count={4}
          variant="outlined"
          shape="rounded"
          renderItem={(item) => <PaginationItem {...item} />}
        ></Pagination>
      </TablePagination>
    </Box>
  )
}
