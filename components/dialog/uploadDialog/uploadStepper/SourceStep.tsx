import { StepWrapper } from './index'
import { Box, Radio, Typography } from '@mui/material'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { PrimaryButton } from '../../../styled/StyledButton'
import { useDropzone } from 'react-dropzone'
import { CSSProperties } from 'styled-components'
import { PrimaryTextField } from 'components/styled/TextField'
import { FileUpload } from '@mui/icons-material'

const baseStyle: CSSProperties = {
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
  width:'100%',
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
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className='flex'>
          <div className='flex item-center mr-5'>
            <FileUpload  fontSize='large'/>
          </div>
          <div className='flex flex-col'>
            <div className='flex'>
              <p className='mr-3'>

                Drag your file here or{' '}
              </p>
              <p style={{ color: 'var(--Primary1)' }}>Browse</p>
            </div>
            <div>
              Maximum file size 2GB
            </div>
          </div>
        </div>
      </div>
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
            '& .MuiTypography-root': {
              fontSize: '14px',
              width: '100%',
            },
          },
        }}
      >
        <Typography>Where is the source file</Typography>

        <Box>
          <Typography>Upload from URL option</Typography>
          <Radio
            checked={vState.type === 'url'}
            onChange={handleType}
            value={'url'}
          />
        </Box>
        <PrimaryTextField
          fullWidth={true}
          inputProps={{ style: { height: '40px', padding: '0 10px' } }}
        />

        <Box>
          <Typography>Upload from your PC</Typography>
          <Radio
            checked={vState.type === 'pc'}
            onChange={handleType}
            value={'pc'}
          />
        </Box>
        <UploadPc />

        <Box>
          <Typography>From Netflix</Typography>
          <Radio
            checked={vState.type === 'netflix'}
            onChange={handleType}
            value={'netflix'}
          />
        </Box>
        <PrimaryTextField
          fullWidth={true}
          inputProps={{ style: { height: '40px', padding: '0 10px' } }}
        />

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
