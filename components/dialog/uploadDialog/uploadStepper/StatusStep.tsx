import { StepWrapper } from './index'
import { Box, Radio, Select, TextField, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { useState } from 'react'
import { PrimaryButton } from 'components/styled/StyledButton'
import { PrimaryTextField } from 'components/styled/TextField'

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
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: 1,
          '& > .MuiBox-root': {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        }}
      >
        <Box>
          <Typography>New Media</Typography>
          <Radio
            checked={vState.type === 'new'}
            onChange={handleType}
            value={'new'}
          />
        </Box>
        <PrimaryTextField
          fullWidth={true}
          inputProps={{ style: { height: '40px', padding: '0 10px' } }}
        />
        <Typography>OR</Typography>
        <Box mt={-2}>
          <Typography>Replace existing one</Typography>
          <Radio
            checked={vState.type === 'old'}
            onChange={handleType}
            value={'old'}
          />
        </Box>
        <Select
          value={vState.replace}
          onChange={handleReplace}
          fullWidth
          sx={{
            height: '40px',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--Primary1)',
            },
          }}
        >
          <MenuItem value={0}>Trolls</MenuItem>
          <MenuItem value={1}>Poppy</MenuItem>
        </Select>
        <Box
          sx={{
            mt: 2,
            justifyContent: 'center !important',
            '& .MuiButton-root': { width: '100px' },
          }}
        >
          <PrimaryButton onClick={props.handleBack}>Back</PrimaryButton>
          <PrimaryButton onClick={props.handleNext}>Next</PrimaryButton>
        </Box>
      </Box>
    </StepWrapper>
  )
}
