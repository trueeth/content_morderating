import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useEffect, useState } from 'react'

interface IProps {
  groupName: string[]
  handleChange?: (val: number) => void
  sx?:any
  value?:number
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

  useEffect(() => {
    if (props.value!==undefined)
      setState(prevState => ({...prevState, tabIndex: props.value}))
  }, [props.value])

  return (
    <ToggleButtonGroup
      value={vState.tabIndex}
      onChange={setTabIndex}
      exclusive
      sx={{
        mt: 3,
        ...props.sx
    }}
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
