import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import TabPanel from 'components/styled/TabPanel'
import { useState } from 'react'

export default function Report() {
  const [vState, setState] = useState({ tabIndex: 0 })

  return (
    <div>
      <ToggleButtonGroup value={vState.tabIndex}>
        <ToggleButton value={0}>Reports History</ToggleButton>
        <ToggleButton value={1}>Reports History</ToggleButton>
      </ToggleButtonGroup>
      <TabPanel value={vState.tabIndex} index={0}></TabPanel>
      <TabPanel value={vState.tabIndex} index={1}></TabPanel>
    </div>
  )
}
