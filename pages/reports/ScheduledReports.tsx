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
import { EReportHistory, EScheduleType, TScheduledReports } from 'interfaces'
import Action from './components/Action'
import SearchInput from 'components/styled/SearchInput'

const ScheduledReports: Array<TScheduledReports> = [
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.daily,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.daily,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.daily,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.daily,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.weekly,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.monthly,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.weekly,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.weekly,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.daily,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.monthly,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.monthly,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.daily,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.weekly,
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    scheduleType: EScheduleType.daily,
  },
]

export default function ScheduledReport() {
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
            <Typography>Scheduled Reports</Typography>
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
            <PrimaryButton>
              <NoteAdd sx={{ color: 'white' }} />
              Add New Report
            </PrimaryButton>
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
            {ScheduledReports.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox color="primary" checked={false} />
                  {item.name}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.createdby}</TableCell>
                <TableCell>{item.scheduleType}</TableCell>
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
