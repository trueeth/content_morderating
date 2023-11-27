import * as React from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '../../../store'
import {
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import TabPanel from '../../styled/TabPanel'
import UploadStepper from './uploadStepper/UploadStepper'
import HistoryTable from './historyTable/HistoryTable'
import { IAppSlice } from '@/store/reducers'
import { openVideoUploadDialog } from '@/store/reducers/dialog.reducers'

export default function UploadDialog() {
  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const handleClose = () => {
    dispatch(openVideoUploadDialog({ open: false }))
  }

  const [vState, setState] = React.useState({ tabIndex: 0 })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue !== null) setState({ ...vState, tabIndex: newValue })
  }

  const isXs = useMediaQuery('(max-width:500px)')

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={appState.dialog.videoUpload}
        onClose={handleClose}
        PaperProps={{
          style: {
            margin: '0px',
            width: isXs ? '95%' : '80%'
          }
        }}
      >
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
                mr: 1,
                color: '#333'
              }}
            >
              {vState.tabIndex === 0 ? 'Upload Media' : 'History'}
            </Typography>
            <Tooltip title={vState.tabIndex === 0 ? 'Upload Media' : 'History'}>
              <InfoIcon sx={{ color: 'grey', width: '16px' }} />
            </Tooltip>
          </Box>

          {/*  -----------select tab----------*/}
          <Box
            sx={{
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <ToggleButtonGroup
                color="primary"
                value={vState.tabIndex}
                exclusive
                onChange={handleChange}
                sx={{
                  borderRadius: '.3rem',
                  overflow: 'hidden'
                }}
              >
                <ToggleButton
                  sx={{
                    padding: '7px 30px'
                  }}
                  value={0}
                >
                  Upload
                </ToggleButton>
                <ToggleButton
                  sx={{
                    padding: '7px 30px'
                  }}
                  value={1}
                >
                  History
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <TabPanel value={vState.tabIndex} index={0}>
              <UploadStepper></UploadStepper>
            </TabPanel>
            <TabPanel value={vState.tabIndex} index={1}>
              <HistoryTable></HistoryTable>
            </TabPanel>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}
