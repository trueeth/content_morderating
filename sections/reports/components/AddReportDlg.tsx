import { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import { Grid, Typography, MenuItem, Tooltip } from '@mui/material'
import { PrimaryButton } from '@components/styled/StyledButton'
import { PrimaryTextField } from '@components/styled/TextField'
import { EScheduleType, EReportType } from '@interfaces/enums'
import InfoIcon from '@mui/icons-material/Info'
import CustomSelect from '@components/styled/Select'

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
          <Grid
            container
            spacing={3}
            sx={{
              '& .MuiGrid-item': {
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5
              }
            }}
          >
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
              <CustomSelect
                value={vState.reportType}
                onChange={(e) => handleUserInput('reportType', e.target.value)}
                placeholder="Select from list"
              >
                {Object.values(EReportType).map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item}
                    sx={{
                      fontSize: '0.8rem'
                    }}
                  >
                    {item}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Schedule Type</Typography>
              <CustomSelect
                value={vState.scheduleType}
                onChange={(e) =>
                  handleUserInput('scheduleType', e.target.value)
                }
                placeholder="Select from list"
              >
                {Object.values(EScheduleType).map((item, index) => (
                  <MenuItem
                    key={index}
                    sx={{
                      fontSize: '0.8rem'
                    }}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
              </CustomSelect>
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
