import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import TabPanel from '@components/styled/TabPanel'
import { useState } from 'react'
import ReportHistory from '@sections/reports/ReportHistory'
import ScheduledReport from '@sections/reports/ScheduledReports'

export default function ReportsSection() {
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
        sx={{ mt: 3 }}
      >
        <ToggleButton
          sx={{
            padding: '7px 20px'
          }}
          value={0}
        >
          Reports History
        </ToggleButton>
        <ToggleButton
          sx={{
            padding: '7px 20px'
          }}
          value={1}
        >
          Scheduled Reports
        </ToggleButton>
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
