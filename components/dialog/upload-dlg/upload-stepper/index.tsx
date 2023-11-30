import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { CUploadSteps } from '@interfaces/constant'
import TabPanel from '@components/common/tab-panel'
import TypeStep from './type-step'
import StatusStep from './status-step'
import SourceStep from './source-step'
import LaunchStep from './launch-step'
import { StepIcon } from '@mui/material'
import React, {  useState } from 'react'
import { useDispatch } from 'react-redux'


export const StepWrapper = styled(Box)({
  borderRadius: '.625rem',
  border: '1px solid var(--Stroke)',
  backgroundColor: 'rgb(0 0 0 / 2%)',
  display: 'flex',
  justifyContent: 'center',
  padding: '1.5rem 0.5rem'
})

// type TMedia='Video'|'Audio'|'Document'

export default function UploadStepper() {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }


  const initialState={mediaType:'',newOld:{newTitle: '', type: 'new',replaceItem: null}}
  const [vState, setState]=useState(initialState)

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          width: { xs: '90%', md: '80%' },
          mx: 'auto',
          mb: 2,
          '& .MuiStepIcon-active': { color: 'red' }
        }}
      >
        {CUploadSteps.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}

          return (
            <Step
              key={index}
              {...stepProps}
              sx={{
                '& span': {
                  sm: { fontSize: '.7rem' },
                  xs: { fontSize: '.5rem' }
                },
                '& .Mui-completed path': {
                  color: 'var(--Primary2)'
                },
                '& .Mui-active circle': {
                  color: 'var(--Primary2)'
                }
              }}
            >
              <StepLabel
                {...labelProps}
                StepIconComponent={(props) => (
                  <StepIcon
                    {...props}
                    icon={props.icon}
                    active={props.active || props.completed}
                    completed={false}
                  />
                )}
              >
                {label}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>

      <TabPanel index={activeStep} value={0}>
        <TypeStep
          handleNext={(val)=>{
            setState({...vState, mediaType:val})
            handleNext()
          }}></TypeStep>
      </TabPanel>
      <TabPanel index={activeStep} value={1} >
        <StatusStep
          handleNext={(val)=>{
            setState({...vState, newOld:val})
            handleNext()
          }}
          handleBack={handleBack}
        ></StatusStep>
      </TabPanel>
      <TabPanel index={activeStep} value={2}>
        <SourceStep
          handleBack={handleBack}
          handleNext={handleNext}
          data={vState}
        ></SourceStep>
      </TabPanel>
      <TabPanel index={activeStep} value={3}>
        <LaunchStep></LaunchStep>
      </TabPanel>
    </Box>
  )
}
