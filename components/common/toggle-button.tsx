import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'

interface IProps {
  groupName: string[]
  handleChange?: (val: number) => void
}

export default function CustomToggleButtonGroup(props: IProps) {
  const [vState, setState] = useState({ tabIndex: 0 })

  const setTabIndex = (e: any, newValue: number) => {
    if (newValue !== null) {
      if (props.handleChange) {
        props.handleChange(newValue)
      }
      setState({ ...vState, tabIndex: newValue })
    }
  }

  return (
    <ToggleButtonGroup
      value={vState.tabIndex}
      onChange={setTabIndex}
      exclusive
      sx={{ mt: 3 }}
    >
      {props.groupName.map((val, index) => (
        <ToggleButton
          sx={{
            padding: '7px 20px'
          }}
          value={index}
          key={index}
        >
          {val}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
