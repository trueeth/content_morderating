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
  PaginationItem
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
  const [vState, setState] = useState({ openDlg: false })

  const closeDlg = () => {
    setState({ ...vState, openDlg: false })
  }
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
            <Typography>Reports History</Typography>
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
          <Grid item sx={{ flexGrow: 1, justifyContent: 'end' }}>
            <Typography whiteSpace="nowrap" mr={2}>
              Sort by:
            </Typography>

            <SearchInput />
          </Grid>
          <Grid item>
            <PrimaryButton
              onClick={() => setState({ ...vState, openDlg: true })}
              sx={{ whiteSpace: 'nowrap' }}
            >
              <NoteAdd sx={{ color: 'white' }} />
              Add New Report
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
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'var(--Primary1)',
                  color: '#fff',
                  border: 'none'
                }
              }}
            />
          )}
        ></Pagination>
      </TablePagination>
    </div>
  )
}
