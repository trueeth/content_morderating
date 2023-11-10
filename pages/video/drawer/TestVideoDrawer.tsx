import CloseIcon from '@mui/icons-material/Close'
import { Box, Drawer } from '@mui/material'

import { useState } from 'react'
import DrawerHeader from './DrawerHeader'
import DrawerTab from './DrawerTab'

interface IOpenProps {
  open: boolean
  handleClose: () => void
}

export default function TestVideoDrawer({ open, handleClose }: IOpenProps) {

  return (
    <Drawer
      anchor="right"
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          boxShadow: 'none',
          color: '#ececec',
          padding: '20px 0px',
          width: '60%',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            width: '100%',
          }}
        >
          <CloseIcon
            onClick={handleClose}
            fontSize="small"
            sx={{ cursor: 'pointer', color: 'red' }}
          />
        </Box>

        <DrawerHeader></DrawerHeader>

        <DrawerTab></DrawerTab>
      </Box>
    </Drawer>
  )
}
