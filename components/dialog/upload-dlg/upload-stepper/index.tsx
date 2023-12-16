import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepIcon } from '@mui/material';
import React, { useState } from 'react';
import { CUploadSteps } from '@interfaces/constant';
import TabPanel from '@components/common/tab-panel';
import TypeStep from './type-step';
import StatusStep from './status-step';
import SourceStep from './source-step';
import LaunchStep from './launch-step';

// Styled component for StepWrapper
export const StepWrapper = styled(Box)({
  borderRadius: '.625rem',
  border: '1px solid var(--Stroke)',
  backgroundColor: 'rgb(0 0 0 / 2%)',
  display: 'flex',
  justifyContent: 'center',
  padding: '1.5rem 0.5rem',
});

// Main UploadStepper component
export default function UploadStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  // Handler the next step in the stepper
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Handler for going back to the previous step in the stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Initial state for the component
  const initialState = {
    mediaType: '',
    newOld: {
      newTitle: '',
      type: 'new',
      replaceItem: null,
      languageType:0
    },
  };
  const [vState, setState] = useState(initialState);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Stepper component */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          width: { xs: '90%', md: '80%' },
          mx: 'auto',
          mb: 2,
          '& .MuiStepIcon-active': { color: 'red' },
        }}
      >
        {/* Mapping over steps and creating Step components */}
        {CUploadSteps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};

          return (
            <Step
              key={index}
              {...stepProps}
              sx={{
                '& span': {
                  sm: { fontSize: '.7rem' },
                  xs: { fontSize: '.5rem' },
                },
                '& .Mui-completed path': {
                  color: 'var(--Primary2)',
                },
                '& .Mui-active circle': {
                  color: 'var(--Primary2)',
                },
              }}
            >
              <StepLabel
                {...labelProps}
                // Customizing StepIconComponent to use StepIcon
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
          );
        })}
      </Stepper>

      {/* Rendering different steps based on the activeStep */}
      <TabPanel index={activeStep} value={0}>
        {/* TypeStep component */}
        <TypeStep
          handleNext={(val) => {
            setState({ ...vState, mediaType: val });
            handleNext();
          }}
        ></TypeStep>
      </TabPanel>
      <TabPanel index={activeStep} value={1}>
        {/* StatusStep component */}
        <StatusStep
          mediaType={vState.mediaType}
          handleNext={(val) => {
            setState({ ...vState, newOld: val });
            handleNext();
          }}
          handleBack={handleBack}
        ></StatusStep>
      </TabPanel>
      <TabPanel index={activeStep} value={2}>
        {/* SourceStep component */}
        <SourceStep
          handleBack={handleBack}
          handleNext={handleNext}
          data={vState}
        ></SourceStep>
      </TabPanel>
      <TabPanel index={activeStep} value={3}>
        {/* LaunchStep component */}
        <LaunchStep></LaunchStep>
      </TabPanel>
    </Box>
  );
}
