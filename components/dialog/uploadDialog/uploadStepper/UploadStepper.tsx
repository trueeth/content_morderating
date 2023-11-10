import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { CUploadSteps } from '../../../../interfaces'
import TabPanel from '../../../TabPanel'
import TypeStep from './TypeStep'
import StatusStep from './StatusStep'
import SourceStep from './SourceStep'
import LaunchStep from './LaunchStep'

export default function UploadStepper() {
  const [activeStep, setActiveStep] = React.useState(0)

  const isStepOptional = (step: number) => {
    return step === 1
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {CUploadSteps.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
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
        <SourceStep handleBack={handleBack}></SourceStep>
      </TabPanel>
      <TabPanel index={activeStep} value={3}>
        <LaunchStep></LaunchStep>
      </TabPanel>

      {/*{activeStep === CUploadSteps.length ? (*/}
      {/*  <React.Fragment>*/}
      {/*    <Typography sx={{ mt: 2, mb: 1 }}>*/}
      {/*      All steps completed - you&apos;re finished*/}
      {/*    </Typography>*/}
      {/*    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>*/}
      {/*      <Box sx={{ flex: '1 1 auto' }} />*/}
      {/*      <Button onClick={handleReset}>Reset</Button>*/}
      {/*    </Box>*/}
      {/*  </React.Fragment>*/}
      {/*) : (*/}
      {/*  <React.Fragment>*/}
      {/*    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>*/}
      {/*    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>*/}
      {/*      <Button*/}
      {/*        color="inherit"*/}
      {/*        disabled={activeStep === 0}*/}
      {/*        onClick={handleBack}*/}
      {/*        sx={{ mr: 1 }}*/}
      {/*      >*/}
      {/*        Back*/}
      {/*      </Button>*/}
      {/*      <Box sx={{ flex: '1 1 auto' }} />*/}
      {/*      <Button onClick={handleNext}>*/}
      {/*        {activeStep === CUploadSteps.length - 1 ? 'Finish' : 'Next'}*/}
      {/*      </Button>*/}
      {/*    </Box>*/}
      {/*  </React.Fragment>*/}
      {/*)}*/}
    </Box>
  )
}
