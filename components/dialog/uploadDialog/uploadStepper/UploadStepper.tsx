import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { CUploadSteps } from '../../../../interfaces'
import TabPanel from '../../../styled/TabPanel'
import TypeStep from './TypeStep'
import StatusStep from './StatusStep'
import SourceStep from './SourceStep'
import LaunchStep from './LaunchStep'
import { StepIcon } from '@mui/material'

export default function UploadStepper() {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          width: { xs: '90%', md: '80%' },
          mx: 'auto',
          mb: 2,
          '& .MuiStepIcon-active': { color: 'red' },
          // sm: {
          //   px: '3rem',
          //   py: '.5rem'
          // },
          // xs: {
          //   px: '2rem',
          //   py: '.3rem'
          // }
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
                  sm:{fontSize: '.7rem'},
                  xs:{fontSize:'.5rem'}
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
        <TypeStep handleNext={handleNext}></TypeStep>
      </TabPanel>
      <TabPanel index={activeStep} value={1}>
        <StatusStep
          handleNext={handleNext}
          handleBack={handleBack}
        ></StatusStep>
      </TabPanel>
      <TabPanel index={activeStep} value={2}>
        <SourceStep
          handleBack={handleBack}
          handleNext={handleNext}
        ></SourceStep>
      </TabPanel>
      <TabPanel index={activeStep} value={3}>
        <LaunchStep></LaunchStep>
      </TabPanel>
    </Box>
  )
}
