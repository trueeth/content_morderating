import * as React from 'react'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import { useDispatch, useSelector } from 'react-redux'
import { Tooltip, Typography, useMediaQuery } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import TabPanel from '@components/common/tab-panel'
import { IAppSlice } from '@store/reducers'
import { openVideoUploadDialog } from '@store/reducers/dialog/reducers'
import { IReduxState } from '@store/index'
import UploadStepper from '@components/dialog/upload-dlg/upload-stepper'
import { setUploadProgress } from '@store/reducers/upload/reducers'
import { openSnackbarWarning } from '@store/reducers/snackbar/reducers'
import { useTranslate } from '../../../locales'
import clsx from 'clsx'

export default function UploadDialog() {
  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)
  const { t } = useTranslate()

  // console.error(appState)
  const handleClose = () => {
    if (appState.api.loading)
      dispatch(openSnackbarWarning(t('uploadDlg.closeWarnning-msg')))
    else
      dispatch(openVideoUploadDialog({ open: false }))
  }

  const [vState, setState] = React.useState({ tabIndex: 0 })

  const isXs = useMediaQuery('(max-width:500px)')

  const uploadGroups = [
    'Upload',
    'History'
  ]

  useEffect(() => {
    dispatch(setUploadProgress({ progress: 0, remaining: 0 }))
  }, [vState.tabIndex, dispatch])

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
        className={clsx(appState.setting.lang==='ar'&&'direction-rtl', appState.setting.lang==='en'&&'direction-ltr')}
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
              className='text-capitalize'
            >
              {vState.tabIndex === 0 ? t('uploadDlg.upload media') : 'History'}
            </Typography>
            <Tooltip className='text-capitalize' title={vState.tabIndex === 0 ? t('uploadDlg.upload media') : 'History'}>
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
              {/*<CustomToggleButtonGroup*/}
              {/*  groupName={uploadGroups}*/}
              {/*  handleChange={(val) => setState({ ...vState, tabIndex: val })}*/}
              {/*/>*/}
            </Box>
            <TabPanel value={vState.tabIndex} index={0}>
              <UploadStepper></UploadStepper>
            </TabPanel>
            {/*<TabPanel value={vState.tabIndex} index={1}>*/}
            {/*  <HistoryTable></HistoryTable>*/}
            {/*</TabPanel>*/}
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}
