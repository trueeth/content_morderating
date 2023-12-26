import { StepWrapper } from './index'
import { Box, Radio, RadioGroup, Typography } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import { PrimaryButton } from '@components/common/styled-button'
import React, { useState } from 'react'
import { useTranslate } from '../../../../locales'


export default function TypeStep(props: { handleNext: (any) => void }) {
  const [vState, setState] = useState('Video')
  const {t}=useTranslate()
  const handleNext = () => {
    props.handleNext(vState)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((event.target as HTMLInputElement).value)
  }

  return (
    <StepWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          '& .MuiTypography-root': {
            sm: { fontSize: '.9rem' },
            xs: { fontSize: '.7rem' }
          }
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '1rem'
          }}
        >
          {t('uploadDlg.step.mediaType-question')}
        </Typography>
        <RadioGroup
          row
          sx={{ justifyContent: 'center' }}
          value={vState}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Video"
            control={<Radio />}
            sx={{
              '& .MuiFormControlLabel-label': {
                textTransform:'capitalize !important'
              }
          }}
            label={t('video')} />
          <FormControlLabel
            value="Document"
            control={<Radio />}
            sx={{
              '& .MuiFormControlLabel-label': {
                textTransform:'capitalize !important'
              }
            }}
            label={t('document')} />
        </RadioGroup>
        <Box sx={{ textAlign: 'center' }}>
          <PrimaryButton onClick={handleNext} sx={{ width: '100px' }} className='text-capitalize' >
            {t('next')}
          </PrimaryButton>
        </Box>
      </Box>
    </StepWrapper>
  )
}
