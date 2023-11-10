import { StepWrapper } from './index'
import { Box, Radio, TextField } from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import StyledButton from '../../../styled/StyledButton'


export default function SourceStep (props:{handleBack:()=>void, handleNext:()=>void}) {

  const [vState, setState]=useState({ type:'new'})

  const handleType=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setState({...vState,type: event.target.value})
  }
  return(

    <StepWrapper>
      <Box
        sx={{
          display:'flex',
          flexDirection:'column'
        }}
      >
        <div>
          Where is the source file
        </div>

        <div className='flex justify-between'>
          <div>
            Upload from URL option
          </div>
          <Radio
            checked={vState.type==='url'}
            onChange={handleType}
            value={'url'}
          />
        </div>
        <TextField
          fullWidth={true}
        />

        <div className='flex justify-between'>
          <div>
            Upload from your PC
          </div>
          <Radio
            checked={vState.type==='pc'}
            onChange={handleType}
            value={'pc'}
          />
        </div>
        <TextField
          fullWidth={true}
        />


        <div className='flex justify-between'>
          <div>
            From Netflix
          </div>
          <Radio
            checked={vState.type==='netflix'}
            onChange={handleType}
            value={'netflix'}
          />
        </div>
        <TextField
          fullWidth={true}
        />

        <div>
          <StyledButton onClick={props.handleBack} type='back'>
            Back
          </StyledButton>
          <StyledButton onClick={props.handleNext}>
            Next
          </StyledButton>
        </div>
      </Box>
    </StepWrapper>
  )
}