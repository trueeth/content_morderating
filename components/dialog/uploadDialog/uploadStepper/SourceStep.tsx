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
  backgroundColor: 'white',
  color: '#bdbdbd',
  outline: 'none',
  width: '100%',
  transition: 'border .24s ease-in-out'
}

const focusedStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

const UploadPc = () => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone()

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))
  return (
    <Box {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <Box className="flex">
        <Box className="flex item-center mr-5">
          <FileUpload
            fontSize="large"
            sx={{ display: { xs: 'none', md: 'block' } }}
          />
        </Box>
        <Box>
          <Box
            display="flex"
            sx={{ flexDirection: { xs: 'column', md: 'row' } }}
          >
            <Typography
              sx={{
                mr: 1,
                fontSize: '16px',
                whiteSpace: 'nowrap',
                color: '#333'
              }}
            >
              Drag your file here or
            </Typography>
            <Typography style={{ color: 'var(--Primary1)' }}>Browse</Typography>
          </Box>
          <Typography>Maximum file size 2GB</Typography>
        </Box>
      </Box>
    </Box>
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
          width: '90%',
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
              width: '100%'
            }
          }
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
        <PrimaryTextField fullWidth={true} placeholder="Enter  URL" />

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
        <PrimaryTextField placeholder="Enter the full movie name" />

        <Box
          sx={{
            mt: 2,
            justifyContent: 'center !important',
            '& .MuiButton-root': { width: '100px' },
            display:'flex',
            flexDirection:{
              xs:'column',
              sm:'row'
          }
        }}
        >
          <PrimaryButton active={false} onClick={props.handleBack}>Back</PrimaryButton>
          <PrimaryButton
            sx={{
              mt:{
                xs:2,
                sm:0
              }
            }}
            onClick={props.handleNext}
          >Start the Upload
          </PrimaryButton>
        </Box>
      </Box>
    </StepWrapper>
  )
}
