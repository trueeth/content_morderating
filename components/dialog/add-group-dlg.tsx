import * as React from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import { Grid, Tooltip, Typography } from '@mui/material'
import { PrimaryButton } from '@components/common/styled-button'
import { PrimaryTextField } from '@components/common/text-field'
import InfoIcon from '@mui/icons-material/Info'

export default function AddGroupDlg({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <React.Fragment>
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
              Add New Group
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
                <Typography>Group Name</Typography>
                <PrimaryTextField placeholder="Enter the group name" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Group Owner</Typography>
                <PrimaryTextField placeholder="Enter the group owner name" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Group Member</Typography>
                <PrimaryTextField placeholder="Enter the group member" />
              </Grid>
            </Grid>
          </Box>

          <PrimaryButton sx={{ mt: '2rem' }}>Add New</PrimaryButton>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}
