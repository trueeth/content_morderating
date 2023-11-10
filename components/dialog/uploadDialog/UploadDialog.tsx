import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '../../../store/store'
import { IAppSlice, openDialogUpload } from '../../../store/slices/app'
import { ButtonGroup, Tab, Tabs, ToggleButton, ToggleButtonGroup } from '@mui/material'
import DrawerTabOverview from '../../../pages/video/drawer/TabOverview'
import DrawerTabPlayScene from '../../../pages/video/drawer/TabPlayScene'
import TabPanel from '../../TabPanel'
import UploadStepper from './uploadStepper/UploadStepper'
import HistoryTable from './historyTable/HistoryTable'

export default function UploadDialog() {


  const dispatch=useDispatch();
  const appState=useSelector<IReduxState,IAppSlice>(
    (state)=>state.app
  )


  const handleClose = () => {
    dispatch(openDialogUpload({ open: false }));
  };

  const [vState, setState] = React.useState({ tabIndex: 0 })

  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: number) => {
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
        <Box>
          {/*---------title-----------*/}
          <Box>
            {vState.tabIndex===0?'Upload Media':'History'}
          </Box>

        {/*  -----------select tab----------*/}
          <Box>
            <Box>
              <ToggleButtonGroup
                color="primary"
                value={vState.tabIndex}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
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
  );
}
