import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import TabPanel from 'components/styled/TabPanel'
import { useState } from 'react'
import ReportHistory from './ReportHistory'
import ScheduledReport from './ScheduledReports'

export default function Report() {
  const [vState, setState] = useState({ tabIndex: 0 })

  const setTabIndex = (e: any, newValue: number) => {
    if (newValue !== null) setState({ ...vState, tabIndex: newValue })
  }

  return (
    <div>
      <ToggleButtonGroup
        value={vState.tabIndex}
        onChange={setTabIndex}
        exclusive
        sx={{ ml: 5, mt: 3 }}
      >
        <ToggleButton value={0}>Reports History</ToggleButton>
        <ToggleButton value={1}>Scheduled Reports</ToggleButton>
      </ToggleButtonGroup>
      <TabPanel value={vState.tabIndex} index={0}>
        <ReportHistory />
      </TabPanel>
      <TabPanel value={vState.tabIndex} index={1}>
        <ScheduledReport />
      </TabPanel>
    </div>
  )
}
