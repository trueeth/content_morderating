import { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import { Grid, Typography, Select, MenuItem, Tooltip } from '@mui/material'
import { PrimaryButton } from 'components/styled/StyledButton'
import { PrimaryTextField } from 'components/styled/TextField'
import { EScheduleType } from 'interfaces'
import InfoIcon from '@mui/icons-material/Info'

export default function AddReportDlg({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  const [vState, setState] = useState({
    name: '',
    reportType: '',
    scheduleType: '',
    mail: ''
  })

  const handleUserInput = (key: string, value: any) => {
    setState({ ...vState, [key]: value })
  }

  return (
    <Dialog fullWidth={true} maxWidth={'md'} open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          p: 3
        }}
      >
        {/*---------title-----------*/}
        <Box sx={{ display: 'flex', py: '2rem' }}>
          <Typography
            sx={{
              fontSize: '1.3rem',
              fontWeight: ' 600',
              color: '#333'
            }}
          >
            Add New Report
          </Typography>
          <Tooltip title="Add New Report">
            <InfoIcon sx={{ color: 'grey', width: '16px', ml: 1, mt: -1 }} />
          </Tooltip>
        </Box>

        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography>Report Name</Typography>
              <PrimaryTextField
                value={vState.name}
                onChange={(e) => handleUserInput('name', e.target.value)}
                placeholder="Enter report name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Report Type</Typography>
              <PrimaryTextField />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Schedule Type</Typography>
              <Select
                value={vState.scheduleType}
                displayEmpty={true}
                onChange={(e) =>
                  handleUserInput('scheduleType', e.target.value)
                }
                renderValue={(value) =>
                  value !== '' ? (
                    value
                  ) : (
                    <Typography color="grey">Select from list</Typography>
                  )
                }
                fullWidth
                sx={{ height: '40px' }}
              >
                {Object.values(EScheduleType).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Additional Delivery Methods</Typography>
              <PrimaryTextField placeholder="Enter email address" />
            </Grid>
          </Grid>
        </Box>

        <PrimaryButton sx={{ mt: '2rem' }}>Add New</PrimaryButton>
      </Box>
    </Dialog>
  )
}
