import TabPanel from '@components/common/tab-panel'
import { useState } from 'react'
import ReportHistory from '@sections/reports/report-history'
import ScheduledReport from '@sections/reports/schedule-reports'
import CustomToggleButtonGroup from '@components/common/toggle-button'

export default function ReportsSection() {
  const [vState, setState] = useState({ tabIndex: 0 })

  const toggleGroup = ['Reports History', 'Scheduled Reports']

  return (
    <div>
      <CustomToggleButtonGroup
        groupName={toggleGroup}
        handleChange={(val) => setState({ ...vState, tabIndex: val })}
      />
      <TabPanel value={vState.tabIndex} index={0}>
        <ReportHistory />
      </TabPanel>
      <TabPanel value={vState.tabIndex} index={1}>
        <ScheduledReport />
      </TabPanel>
    </div>
  )
}
