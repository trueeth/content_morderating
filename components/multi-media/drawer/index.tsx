import CloseIcon from '@mui/icons-material/Close'
import { Box, Drawer, useMediaQuery } from '@mui/material'
import DrawerTab from './drawer-tab'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { openMediaSubDrawer } from '@store/reducers/drawer/reducers'
import DrawerVideoHeader from './video/header-video'
import DrawerDocumentHeader from '@components/multi-media/drawer/document/header-document'
import { useEffect, useState } from 'react'

export default function MediaDrawer() {
  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)
  const [vState, setState] = useState({ open: false })

  const isXL = useMediaQuery('(min-width:800px)')

  const handleClose = () => {
    setState(prevState => ({ ...prevState, open: false }))
    dispatch(openMediaSubDrawer({ open: false }))
  }

  useEffect(() => {
      setState(prevState => ({ ...prevState, open: appState.drawer.mediaSubOpen }))
  }, [appState.drawer.mediaSubOpen])

  return (
    <Drawer
      anchor='right'
      onClose={handleClose}
      open={vState.open}
      PaperProps={{
        style: {
          boxShadow: 'none',
          padding: '20px 0px',
          width: isXL ? '50%' : '90%',
          color: '#333'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            width: '100%'
          }}
        >
          <CloseIcon
            onClick={handleClose}
            fontSize='small'
            sx={{ cursor: 'pointer', mr: 2 }}
          />
        </Box>

        {appState.drawer.type === 'video' ? <DrawerVideoHeader /> : <DrawerDocumentHeader />}
        <DrawerTab />
      </Box>
    </Drawer>
  )
}
