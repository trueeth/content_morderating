import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import DrawerTabOverview from './tab-overview'
import DrawerTabPlayScene from './video/tab-play-scene'
import DrawerTabActivities from './tab-activities'
import TabPanel from '@components/common/tab-panel'
import { useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { CDrawerDocumentTabs, CDrawerVideoTabs } from '@interfaces/constant'
import Typography from '@mui/material/Typography'
import DrawerTabQuestions from '@components/multi-media/drawer/document/tab-questions'
import DrawerTabPreviewPage from '@components/multi-media/drawer/document/tab-preview-page'

export default function DrawerTab() {
  const [vState, setState] = React.useState({ tabIndex: 0, pageNumber:0, questionIndex:0 })
  const [pageNumber, setPageNumber] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setState({ ...vState, tabIndex: newValue })
  }

  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const drawerTabs = appState.drawer.type === 'video' ? CDrawerVideoTabs : CDrawerDocumentTabs

  const videoTabPanels = (
    <Box>
    <TabPanel value={vState.tabIndex} index={0}>
      <DrawerTabPlayScene></DrawerTabPlayScene>
    </TabPanel>
    <TabPanel value={vState.tabIndex} index={1}>
      <DrawerTabActivities></DrawerTabActivities>
    </TabPanel>
  </Box>
  )
  const documentTabPanels =(
      <Box>
        <TabPanel value={vState.tabIndex} index={0}>
          <DrawerTabQuestions handlePageNum ={(val, index)=> {
            if (val==0) {
              setState(prevState => ({ ...prevState, pageNumber: 0 }))
              return
            }
            setState(prevState => ({...prevState, tabIndex: 1, pageNumber: val, questionIndex: index}))
          }}></DrawerTabQuestions>
        </TabPanel>
        <TabPanel value={vState.tabIndex} index={1}>
          <DrawerTabPreviewPage pageNum ={vState.pageNumber} questionIndex={vState.questionIndex}></DrawerTabPreviewPage>
        </TabPanel>
        <TabPanel value={vState.tabIndex} index={2}>
          <Box>
            <Typography sx={{padding:'2rem'}}>{appState.drawer.drawerData?.Summary}</Typography>
          </Box>
        </TabPanel>
        <TabPanel value={vState.tabIndex} index={3}>
          <DrawerTabActivities></DrawerTabActivities>
        </TabPanel>
      </Box>
    )

  const tabPanels = appState.drawer.type==='video'?videoTabPanels:documentTabPanels

  return (
    <Box className='w-full'>
      <Tabs
        value={vState.tabIndex}
        onChange={handleChange}
        // variant="fullWidth"
        scrollButtons='auto'
        aria-label='scrollable prevent tabs example'
        sx={{
          width: '100%',
          backgroundColor: 'var(--Secondry-L)',
          '& button': {
            color: 'black !important'
          },
          '& span': {
            backgroundColor: 'black !important'
          }
        }}
      >
        {drawerTabs.map((val, index) =>
          <Tab label={val} key={index} />
        )}
      </Tabs>
      <Box>
        {tabPanels}
      </Box>
    </Box>
  )
}
