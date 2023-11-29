import CloseIcon from '@mui/icons-material/Close'
import { Box, Drawer, useMediaQuery } from '@mui/material'

import DrawerHeader from './Header'
import DrawerTab from './DrawerTab'
import { TResVideo } from '@interfaces/apis/videos.types'
import { useDispatch, useSelector } from 'react-redux'
import useTablePagination from '@components/table-pagination/useTablePagination'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { openMediaSubDrawer } from '@store/reducers/drawer/reducers'



export default function MediaDrawer() {


  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)
  
  const isXL = useMediaQuery('(min-width:800px)')

  const handleClose = () => {
    dispatch(openMediaSubDrawer({ open: false }))
  }
  

  return (
    <Drawer
      anchor="right"
      onClose={handleClose}
      open={appState.drawer.mediaSubOpen}
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
            fontSize="small"
            sx={{ cursor: 'pointer', mr: 2 }}
          />
        </Box>

        <DrawerHeader />
        <DrawerTab />
      </Box>
    </Drawer>
  )
}
