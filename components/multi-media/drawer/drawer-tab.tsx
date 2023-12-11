import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import DrawerTabOverview from './tab-overview'
import DrawerTabPlayScene from './tab-play-scene'
import DrawerTabActivities from './tab-activities'
import TabPanel from '@components/common/tab-panel'
import { useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'

export default function DrawerTab() {
  const [vState, setState] = React.useState({ tabIndex: 0 })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setState({ ...vState, tabIndex: newValue })
  }

  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  return (
    <Box className="w-full">
      <Tabs
        value={vState.tabIndex}
        onChange={handleChange}
        // variant="fullWidth"
        scrollButtons="auto"
        aria-label="scrollable prevent tabs example"
        sx={{
          width: '100%',
          backgroundColor: 'var(--Secondry-L)'
        }}
      >
        {/*<Tab label="Overview" />*/}
        <Tab
          label={
            appState.drawer.type === 'video'
              ? 'Play the Scene'
              : 'Preview thte Page'
          }
        />
        <Tab label="Activities" />
      </Tabs>
      <Box>
        {/*<TabPanel value={vState.tabIndex} index={0}>*/}
        {/*  <DrawerTabOverview></DrawerTabOverview>*/}
        {/*</TabPanel>*/}
        <TabPanel value={vState.tabIndex} index={0}>
          <DrawerTabPlayScene></DrawerTabPlayScene>
        </TabPanel>
        <TabPanel value={vState.tabIndex} index={1}>
          <DrawerTabActivities></DrawerTabActivities>
        </TabPanel>
      </Box>
    </Box>
  )
}
