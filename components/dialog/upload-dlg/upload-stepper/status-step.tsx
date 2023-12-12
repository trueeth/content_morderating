import { StepWrapper } from './index'
import { Box, Radio, Select, useMediaQuery, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { useState } from 'react'
import { PrimaryButton } from '@components/common/styled-button'
import { PrimaryTextField } from '@components/common/text-field'
import { openSnackbarError } from '@store/reducers/snackbar/reducers'
import { useDispatch } from 'react-redux'

export default function StatusStep(props: {
  handleNext: (any) => void
  handleBack: () => void
}) {
  const [vState, setState] = useState({
    newTitle: '',
    type: 'new',
    replaceItem: 0
  })

  const handleReplace = (event: any) => {
    setState({ ...vState, replaceItem: event.target.value })
  }
  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...vState, type: event.target.value })
  }

  const dispatch = useDispatch()

  const handleNext = () => {
    if (vState.newTitle == '' && vState.type == 'new') {
      dispatch(openSnackbarError('Title is empty'))
      return
    }
    props.handleNext(vState)
  }

  const isXs = useMediaQuery('(max-width:500px)')

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
            alignItems: 'center'
          },

          '& .MuiTypography-root, input': {
            sm: { fontSize: '.9rem' },
            xs: { fontSize: '.7rem' }
          }
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
          placeholder="Enter the name"
          value={vState.newTitle}
          onChange={(event) =>
            setState({ ...vState, newTitle: event.target.value })
          }
        />
        {/*<Typography>OR</Typography>*/}
        {/*<Box mt={-2}>*/}
        {/*  <Typography>Replace{!isXs && 'existing one'}</Typography>*/}
        {/*  <Radio*/}
        {/*    checked={vState.type === 'old'}*/}
        {/*    onChange={handleType}*/}
        {/*    value={'old'}*/}
        {/*  />*/}
        {/*</Box>*/}
        {/*<Select*/}
        {/*  value={vState.replaceItem}*/}
        {/*  onChange={handleReplace}*/}
        {/*  fullWidth*/}
        {/*  sx={{*/}
        {/*    height: '40px',*/}
        {/*    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {*/}
        {/*      borderColor: 'var(--Primary1)'*/}
        {/*    },*/}
        {/*    bgcolor: 'white'*/}
        {/*  }}*/}
        {/*  renderValue={*/}
        {/*    vState.type !== null*/}
        {/*      ? undefined*/}
        {/*      : () => <Typography>Select from list</Typography>*/}
        {/*  }*/}
        {/*>*/}
        {/*  <MenuItem*/}
        {/*    sx={{*/}
        {/*      '& .MuiTypography-root, input': {*/}
        {/*        sm: { fontSize: '.9rem' },*/}
        {/*        xs: { fontSize: '.7rem' }*/}
        {/*      }*/}
        {/*    }}*/}
        {/*    value={0}*/}
        {/*  >*/}
        {/*    Trolls*/}
        {/*  </MenuItem>*/}
        {/*  <MenuItem*/}
        {/*    sx={{*/}
        {/*      '& .MuiTypography-root, input': {*/}
        {/*        sm: { fontSize: '.9rem' },*/}
        {/*        xs: { fontSize: '.7rem' }*/}
        {/*      }*/}
        {/*    }}*/}
        {/*    value={1}*/}
        {/*  >*/}
        {/*    Poppy*/}
        {/*  </MenuItem>*/}
        {/*</Select>*/}
        <Box
          sx={{
            mt: 2,
            justifyContent: 'center !important',
            '& .MuiButton-root': { width: '100px' }
          }}
        >
          <PrimaryButton onClick={props.handleBack} active={false}>
            Back
          </PrimaryButton>
          <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
        </Box>
      </Box>
    </StepWrapper>
  )
}
