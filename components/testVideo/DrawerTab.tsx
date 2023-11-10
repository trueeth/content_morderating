import { Box, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import DrawerTabOverview from './DrawerTabOverview'
import DrawerTabPlayScene from './DrawerTabPlayScene'
import DrawerTabActivities from './DrawerTabActivities'



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


export default function DrawerTab(){

  const [VState, setState] = React.useState({tabIndex:0});

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setState({...VState, tabIndex:newValue});
  };

  return(
    <div className='w-full'>
    <Tabs
      value={VState.tabIndex}
      onChange={handleChange}
      // variant="fullWidth"
      scrollButtons='auto'
      aria-label="scrollable prevent tabs example"
      sx={{
        width:'100%'
      }}
    >
      <Tab label="Overview" />
      <Tab label="Play teh Scene" />
      <Tab label="Activities" />

    </Tabs>
      <TabPanel value={VState.tabIndex} index={0}>
        <DrawerTabOverview></DrawerTabOverview>
      </TabPanel>
      <TabPanel value={VState.tabIndex} index={1}>
        <DrawerTabPlayScene></DrawerTabPlayScene>
      </TabPanel>
      <TabPanel value={VState.tabIndex} index={2}>
        <DrawerTabActivities></DrawerTabActivities>
      </TabPanel>
    </div>
  )

}