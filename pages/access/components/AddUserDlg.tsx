import { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import { Grid, MenuItem, Select, Typography } from '@mui/material'
import { PrimaryButton } from 'components/styled/StyledButton'
import { PrimaryTextField } from 'components/styled/TextField'
import { EUserRole, EUserType } from 'interfaces'

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
        {/*---------title-----------*/}
        <Typography
          sx={{
            fontSize: '1.3rem',
            fontWeight: ' 600',
            py: '2rem',
            color: '#333'
          }}
        >
          Add New User
        </Typography>

        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography>Full Name</Typography>
              <PrimaryTextField />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Email Address</Typography>
              <PrimaryTextField />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Mobile Number</Typography>
              <PrimaryTextField />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>User Type</Typography>
              <Select
                value={vState.type}
                onChange={(e) => handleUserInput('type', e.target.value)}
                fullWidth
                sx={{ height: '45px' }}
              >
                {Object.values(EUserType).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Group</Typography>
              <Select
                value={vState.group}
                onChange={(e) => handleUserInput('group', e.target.value)}
                fullWidth
                sx={{ height: '45px' }}
              >
                {Groups.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Role</Typography>
              <Select
                value={vState.role}
                onChange={(e) => handleUserInput('role', e.target.value)}
                fullWidth
                sx={{ height: '45px' }}
              >
                {Object.values(EUserRole).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Password</Typography>
              <PrimaryTextField />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Confirm Password</Typography>
              <PrimaryTextField />
            </Grid>
          </Grid>
        </Box>

        <PrimaryButton sx={{ mt: '2rem' }}>Add New</PrimaryButton>
      </Box>
    </Dialog>
  )
}
