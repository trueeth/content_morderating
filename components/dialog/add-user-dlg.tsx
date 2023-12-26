import { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import {
  Grid,
  InputAdornment,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/material'
import { PrimaryButton } from '@components/common/styled-button'
import { PrimaryTextField } from '@components/common/text-field'
import { EUserRole, EUserType } from '@interfaces/index'
import InfoIcon from '@mui/icons-material/Info'
import CustomSelect from '@components/common/select'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'

const Groups = ['Moderators Group 1', 'Moderators Frontend Development']

export default function AddUserDlg({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  const [vState, setState] = useState({
    group: '',
    role: EUserRole.user,
    type: EUserType.local
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
        <Box sx={{ display: 'flex', py: '2rem' }}>
          <Typography
            sx={{
              fontSize: '1.3rem',
              fontWeight: ' 600',
              color: '#333'
            }}
          >
            Add New User
          </Typography>
          <Tooltip title="Add New User">
            <InfoIcon sx={{ color: 'grey', width: '16px', ml: 1, mt: -1 }} />
          </Tooltip>
        </Box>

        <Box>
          <Grid
            container
            spacing={2}
            sx={{
              '& .MuiGrid-item': {
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5
              }
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography>Full Name</Typography>
              <PrimaryTextField placeholder="Enter the full name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Email Address</Typography>
              <PrimaryTextField placeholder="Enter the full address" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Mobile Number</Typography>
              <PrimaryTextField placeholder="Enter the mobile number" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>User Type</Typography>
              <CustomSelect
                value={vState.type}
                onChange={(e) => handleUserInput('type', e.target.value)}
                placeholder="Select from the list"
              >
                {Object.values(EUserType).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Group</Typography>
              <CustomSelect
                value={vState.group}
                onChange={(e) => handleUserInput('group', e.target.value)}
                placeholder="Select from the list"
              >
                {Groups.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Role</Typography>
              <CustomSelect
                value={vState.role}
                onChange={(e) => handleUserInput('role', e.target.value)}
                placeholder="Select from the list"
              >
                {Object.values(EUserRole).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Password</Typography>
              <PrimaryTextField
                placeholder="Create your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <VisibilityOutlinedIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Confirm Password</Typography>
              <PrimaryTextField
                placeholder="Confirm your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <VisibilityOutlinedIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <PrimaryButton sx={{ mt: '2rem' }}>Add New</PrimaryButton>
      </Box>
    </Dialog>
  )
}
