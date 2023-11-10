import * as React from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '../../../store/store'
import { IAppSlice, openDialogUpload } from '../../../store/slices/app'
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import TabPanel from '../../styled/TabPanel'
import UploadStepper from './uploadStepper/UploadStepper'
import HistoryTable from './historyTable/HistoryTable'

export default function UploadDialog() {
  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const handleClose = () => {
    dispatch(openDialogUpload({ open: false }))
  }

  const [vState, setState] = React.useState({ tabIndex: 0 })

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: number
  ) => {
    setState({ ...vState, tabIndex: newValue })
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={appState.dialogUpload}
        onClose={handleClose}
      >
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
          <Typography>
            {vState.tabIndex === 0 ? 'Upload Media' : 'History'}
          </Typography>

          {/*  -----------select tab----------*/}
          <Box>
            <Box>
              <ToggleButtonGroup
                color="primary"
                value={vState.tabIndex}
                exclusive
                onChange={handleChange}
              >
                <ToggleButton value={0}>Upload</ToggleButton>
                <ToggleButton value={1}>History</ToggleButton>
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
