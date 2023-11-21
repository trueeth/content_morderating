import { useState } from 'react'
import { NoteAdd } from '@mui/icons-material'
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
  tableCellClasses,
  Checkbox,
  Tooltip,
  Pagination,
  PaginationItem, Select,
} from '@mui/material'
import { PrimaryButton } from 'components/styled/StyledButton'
import {
  EReportHistory,
  EReportHistoryStatus,
  TReportHistory
} from 'interfaces'
import Action from './components/SelectAction'
import AddReportDlg from './components/AddReportDlg'
import SearchInput from 'components/styled/SearchInput'
import InfoIcon from '@mui/icons-material/Info'
import TablePagination from 'components/styled/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'

const HistoryData: Array<TReportHistory> = [
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing
  }
]

export default function ReportHistory() {
  const [vState, setState] = useState({ openDlg: false, sortBy:0 })

  const closeDlg = () => {
    setState({ ...vState, openDlg: false })
  }
  const handleSortByChange = (event: any) => {
    setState({ ...vState,sortBy: event.target.value })
  }
  return (
    <Box
      sx={{
        backgroundColor:'white',
        boxShadow:'0px 0px 25px 0px #F3F3F3;',
        borderRadius:'.4rem',
        border:'1px solid var(--Stroke, #E8E8E8)',
        overflow:'hidden',
        m:1
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
            p: 3,
            '& .MuiGrid-item': {
              display: 'flex',
              alignItems: 'center'
            }
          }}
        >
          <Grid item>
            <Typography>Reports History</Typography>
            <Tooltip title="Reports History">
              <InfoIcon sx={{ color: 'grey', width: '16px', ml: 1, mt: -1 }} />
            </Tooltip>
            <Button
              sx={{
                ml: 2,
                bgcolor: '#ff1313a0',
                opacity:'0.6',
                color: 'white',
                '&:hover': { bgcolor: '#ff1313a0',
                  opacity:'0.6',}
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
          <Grid item>
            <PrimaryButton
              onClick={() => setState({ ...vState, openDlg: true })}
              sx={{
                whiteSpace: 'nowrap'
              }}
            >
              <NoteAdd sx={{ color: 'white', mr: 0.5 }} />
              <Typography fontSize="14px">Add New Report</Typography>
            </PrimaryButton>
            <AddReportDlg open={vState.openDlg} onClose={closeDlg} />
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
              {Object.values(EReportHistory).map((item, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ whiteSpace: 'nowrap', fontSize: '12px', color: '#888' }}
                >
                  <Checkbox
                    color="primary"
                    sx={{
                      display: index !== 0 ? 'none' : 'inline'
                    }}
                  />
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {HistoryData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox color="primary" checked={false} />
                  {item.name}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.createdby}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      p: 0.5,
                      borderRadius: '5px',
                      width: 'fit-content',
                      bgcolor:
                        item.status === EReportHistoryStatus.processing
                          ? '#FFE6C9'
                          : 'var(--Primary1-L)',
                      color:
                        item.status === EReportHistoryStatus.processing
                          ? '#FF9432'
                          : 'var(--Primary1)'
                    }}
                  >
                    {item.status}
                  </Box>
                </TableCell>
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
