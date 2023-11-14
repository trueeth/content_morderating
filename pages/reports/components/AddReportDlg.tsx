import { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import { Grid, Typography, Select, MenuItem } from '@mui/material'
import { PrimaryButton } from 'components/styled/StyledButton'
import { PrimaryTextField } from 'components/styled/TextField'
import { EScheduleType } from 'interfaces'

export default function AddReportDlg({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  const [vState, setState] = useState({
    name: 'JSC',
    reportType: '',
    scheduleType: EScheduleType.daily,
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
        <Typography
          sx={{
            fontSize: '1.3rem',
            fontWeight: ' 600',
            py: '2rem',
            color: '#333'
          }}
        >
          Add New Report
        </Typography>

        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography>Report Name</Typography>
              <PrimaryTextField
                value={vState.name}
                onChange={(e) => handleUserInput('name', e.target.value)}
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
                onChange={(e) =>
                  handleUserInput('scheduleType', e.target.value)
                }
                fullWidth
                sx={{ height: '45px' }}
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
              <PrimaryTextField />
            </Grid>
          </Grid>
        </Box>

        <PrimaryButton sx={{ mt: '2rem' }}>Add New</PrimaryButton>
      </Box>
    </Dialog>
  )
}
