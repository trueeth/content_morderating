import { StepWrapper } from './index'
import { Box,  Select, useMediaQuery, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { useState } from 'react'
import { PrimaryButton } from '@components/common/styled-button'
import { PrimaryTextField } from '@components/common/text-field'
import { openSnackbarError } from '@store/reducers/snackbar/reducers'
import { useDispatch } from 'react-redux'
import { CLanguage } from '@interfaces/constant'

export default function StatusStep(props: {
  handleNext: (any) => void
  handleBack: () => void
  mediaType?:string
}) {
  const [vState, setState] = useState({
    newTitle: '',
    type: 'new',
    replaceItem:null,
    languageType: 0
  })

  const handleLanguageType = (event: any) => {
    setState({ ...vState, languageType: event.target.value })
  }
  // const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...vState, type: event.target.value })
  // }

  const dispatch = useDispatch()

  const handleNext = () => {
    if (vState.newTitle == '' && vState.type == 'new') {
      dispatch(openSnackbarError('Title is empty'))
      return
    }
    props.handleNext(vState)
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
            alignItems: 'center'
          },

          '& .MuiTypography-root, input': {
            sm: { fontSize: '.9rem' },
            xs: { fontSize: '.7rem' }
          }
        }}
      >
        <Box sx={{paddingTop:'1.5rem'}}>
          <Typography>Name</Typography>
          {/*<Radio*/}
          {/*  checked={vState.type === 'new'}*/}
          {/*  onChange={handleType}*/}
          {/*  value={'new'}*/}
          {/*/>*/}
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

        {
          props.mediaType==='Document'?
            <>
              <Box sx={{paddingTop:'1.5rem'}}>
                <Typography>
                  Language
                </Typography>
              </Box>
              <Select
                value={vState.languageType}
                onChange={handleLanguageType}
                fullWidth
                sx={{
                  height: '40px',
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--Primary1)'
                  },
                  bgcolor: 'white'
                }}
              >
                {
                  CLanguage.map((val, index)=>(
                    <MenuItem
                      sx={{
                        '& .MuiTypography-root, input': {
                          sm: { fontSize: '.9rem' },
                          xs: { fontSize: '.7rem' }
                        }
                      }}
                      key={index}
                      value={index}
                    >
                      {val}
                    </MenuItem>))
                }
              </Select>
            </>
            :
            null
        }

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
