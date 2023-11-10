import { StepWrapper } from './index'
import { Box, Radio, TextField } from '@mui/material'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { StyledButton } from '../../../styled/StyledButton'
import { useDropzone } from 'react-dropzone'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

const UploadPc = () => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone()

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))
  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>
          Drag your file here or{' '}
          <p style={{ color: 'var(--Primary1)' }}>Browse</p>
        </p>
      </div>
      {/*<aside>*/}
      {/*  <h4>Files</h4>*/}
      {/*  <ul>{files}</ul>*/}
      {/*</aside>*/}
    </section>
  )
}

export default function SourceStep(props: {
  handleBack: () => void
  handleNext: () => void
}) {
  const [vState, setState] = useState({ type: 'new' })

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
        <div>Where is the source file</div>

        <div className="flex justify-between">
          <div>Upload from URL option</div>
          <Radio
            checked={vState.type === 'url'}
            onChange={handleType}
            value={'url'}
          />
        </div>
        <TextField fullWidth={true} />

        <div className="flex justify-between">
          <div>Upload from your PC</div>
          <Radio
            checked={vState.type === 'pc'}
            onChange={handleType}
            value={'pc'}
          />
        </div>
        <UploadPc />

        <div className="flex justify-between">
          <div>From Netflix</div>
          <Radio
            checked={vState.type === 'netflix'}
            onChange={handleType}
            value={'netflix'}
          />
        </div>
        <TextField fullWidth={true} />

        <div>
          <StyledButton onClick={props.handleBack}>Back</StyledButton>
          <StyledButton onClick={props.handleNext}>Next</StyledButton>
        </div>
      </Box>
    </StepWrapper>
  )
}
