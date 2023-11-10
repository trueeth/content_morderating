import { StepWrapper } from './index'
import { Box, Radio, Select, TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { useState } from 'react'
import { PrimaryButton } from 'components/styled/StyledButton'

export default function StatusStep(props: {
  handleNext: () => void
  handleBack: () => void
}) {
  const [vState, setState] = useState({ replace: 0, type: 'new' })

  const handleReplace = (event: any) => {
    setState({ ...vState, replace: event.target.value })
  }
  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...vState, type: event.target.value })
  }

  return (
    <StepWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="flex justify-between">
          <div>New Media</div>
          <Radio
            checked={vState.type === 'new'}
            onChange={handleType}
            value={'new'}
          />
        </div>
        <TextField fullWidth={true} />
        <div>OR</div>
        <div className="flex justify-between">
          <div>Replace existing one</div>
          <Radio
            checked={vState.type === 'old'}
            onChange={handleType}
            value={'old'}
          />
        </div>
        <Select
          value={vState.replace}
          onChange={handleReplace}
          sx={{
            height: '36px',
          }}
        >
          <MenuItem value={0}>Trolls</MenuItem>
          <MenuItem value={1}>Poppy</MenuItem>
        </Select>
        <div>
          <PrimaryButton onClick={props.handleBack}>Back</PrimaryButton>
          <PrimaryButton onClick={props.handleNext}>Next</PrimaryButton>
        </div>
      </Box>
    </StepWrapper>
  )
}
