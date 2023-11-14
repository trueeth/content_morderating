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
} from '@mui/material'
import { PrimaryButton } from 'components/styled/StyledButton'
import {
  EReportHistory,
  EReportHistoryStatus,
  TReportHistory,
} from 'interfaces'
import Action from './components/SelectAction'
import AddReportDlg from './components/AddReportDlg'
import SearchInput from 'components/styled/SearchInput'

const HistoryData: Array<TReportHistory> = [
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing,
  },
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
          color: 'black',
        }}
      >
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography>Reports History</Typography>
            <Button
              sx={{
                ml: 2,
                bgcolor: '#ff1313a0',
                color: 'white',
                '&:hover': { bgcolor: '#ff1313a0' },
              }}
            >
              Delete
            </Button>
          </Grid>

          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography>Sort by:</Typography>

            <SearchInput />
            <PrimaryButton
              onClick={() => setState({ ...vState, openDlg: true })}
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
            whiteSpace: 'nowrap',
          },
        }}
      >
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
            <TableRow>
              {Object.values(EReportHistory).map((item, index) => (
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
                          : 'var(--Primary1)',
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
    </div>
  )
}
