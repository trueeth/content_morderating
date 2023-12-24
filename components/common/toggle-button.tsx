import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslate } from '../../locales'

interface IProps {
  groupName: string[]
  handleChange?: (val: number) => void
  sx?:any
  value?:number
}

export default function CustomToggleButtonGroup(props: IProps) {
  const [vState, setState] = useState({ tabIndex: 0 })
  const {t}=useTranslate()

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
            padding: '7px 20px',
            textTransform:'capitalize !important'
          }}
          value={index}
          key={index}
        >
          {t(`toggle.${val.toLowerCase()}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
