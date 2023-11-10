import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import DrawerTabOverview from './TabOverview'
import DrawerTabPlayScene from './TabPlayScene'
import DrawerTabActivities from './TabActivities'
import TabPanel from '../../../components/TabPanel'


export default function DrawerTab() {
  const [vState, setState] = React.useState({ tabIndex: 0 })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setState({ ...vState, tabIndex: newValue })
  }

  return (
    <div className="w-full">
      <Tabs
        value={vState.tabIndex}
        onChange={handleChange}
        // variant="fullWidth"
        scrollButtons="auto"
        aria-label="scrollable prevent tabs example"
        sx={{
          width: '100%',
          backgroundColor: 'var(--Secondry-L)',
        }}
      >
        <Tab label="Overview" />
        <Tab label="Play teh Scene" />
        <Tab label="Activities" />
      </Tabs>
      <TabPanel value={vState.tabIndex} index={0}>
        <DrawerTabOverview></DrawerTabOverview>
      </TabPanel>
      <TabPanel value={vState.tabIndex} index={1}>
        <DrawerTabPlayScene></DrawerTabPlayScene>
      </TabPanel>
      <TabPanel value={vState.tabIndex} index={2}>
        <DrawerTabActivities></DrawerTabActivities>
      </TabPanel>
    </div>
  )
}
