import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import TabPanel from '@components/styled/TabPanel'
import { useState } from 'react'
import Users from '@sections/access/Users'
import Groups from '@sections/access/Groups'
import Roles from '@sections/access/Roles'

export default function AccessSection() {
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
            padding: '7px 30px'
          }}
          value={0}
        >
          Users
        </ToggleButton>
        <ToggleButton
          sx={{
            padding: '7px 30px'
          }}
          value={1}
        >
          Groups
        </ToggleButton>
        <ToggleButton
          sx={{
            padding: '7px 30px'
          }}
          value={2}
        >
          Roles
        </ToggleButton>
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
