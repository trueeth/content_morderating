import * as React from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import { Grid, Typography } from '@mui/material'
import { PrimaryButton } from 'components/styled/StyledButton'
import { PrimaryTextField } from 'components/styled/TextField'

export default function AddGroupDlg({
  open,
  onClose,
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
            p: 3,
          }}
        >
          {/*---------title-----------*/}
          <Typography
            sx={{
              fontSize: '1.3rem',
              fontWeight: ' 600',
              py: '2rem',
              color: '#333',
            }}
          >
            Add New Group
          </Typography>

          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography>Group Name</Typography>
                <PrimaryTextField />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Group Owner</Typography>
                <PrimaryTextField />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Group Member</Typography>
                <PrimaryTextField />
              </Grid>
            </Grid>
          </Box>

          <PrimaryButton sx={{ mt: '2rem' }}>Add New</PrimaryButton>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}
