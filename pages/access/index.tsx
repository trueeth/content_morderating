import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import TabPanel from 'components/styled/TabPanel'
import { useState } from 'react'
import Users from './Users'
import Groups from './Groups'
import Roles from './Roles'

export default function Access() {
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
        sx={{ mt: 3, ml: 3 }}
      >
        <ToggleButton value={0}>Users</ToggleButton>
        <ToggleButton value={1}>Groups</ToggleButton>
        <ToggleButton value={2}>Roles</ToggleButton>
      </ToggleButtonGroup>
      <TabPanel value={vState.tabIndex} index={0}>
        <Users />
      </TabPanel>
      <TabPanel value={vState.tabIndex} index={1}>
        <Groups />
      </TabPanel>
      <TabPanel value={vState.tabIndex} index={2}>
        <Roles />
      </TabPanel>
    </div>
  )
}
