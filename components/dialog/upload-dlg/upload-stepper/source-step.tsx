import { StepWrapper } from './index'
import { Box, Radio, Typography } from '@mui/material'
import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { PrimaryButton } from '@components/common/styled-button'
import { useDropzone } from 'react-dropzone'
import { CSSProperties } from 'styled-components'
import { PrimaryTextField } from '@components/common/text-field'
import fileUpload from '/public/assets/images/icon/fileUpload.svg'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import {
  openSnackbarError,
  openSnackbarSuccess,
  openSnackbarWarning
} from '@store/reducers/snackbar/reducers'
import {
  apiGetUploadMediaId,
  apiUploadVideo,
  TReqUpload
} from '@interfaces/apis/upload'
import { TResVideo } from '@interfaces/apis/videos.types'
import { AxiosRequestConfig } from 'axios'
import { setUploadProgress } from '@store/reducers/upload/reducers'
import { setApiLoading } from '@store/reducers/api/reducers'

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

type TFile = File | null

type TStateSource = {
  type: string
  uploadFile: TFile
  uploadProgress?: number
  uploadRemaining?: number
}

export default function SourceStep(props: {
  handleBack: () => void
  handleNext: () => void
  data: any
}) {
  const [vState, setState] = useState<TStateSource>({
    type: 'pc',
    uploadFile: null,
    uploadProgress: 0,
    uploadRemaining: 0
  })
  const dispatch = useDispatch()

  const onFileUpload = async () => {
    dispatch(setApiLoading(true))

    if (!vState.uploadFile) return

    let uploadInfo: TReqUpload.TGetUploadId = {
      Description: 'trueet upload video',
      Documents: [],
      Id: '00000000-0000-0000-0000-000000000000',
      MediaSourceId: '49f5cc65-53c4-4caf-94dc-d1f29e6665ec',
      MediaType: 'Video',
      ModeratorApprovalStatus: 'New',
      Name: props.data.newOld.newTitle,
      Notes: 'scenes video about mountain',
      Videos: []
    }

    var formData = new FormData()
    formData.append('file', vState.uploadFile)

    try {
      let uploadId = await apiGetUploadMediaId(uploadInfo)
      console.log(uploadId, formData)

      let startAt = Date.now()
      const options: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'multipart/form-data'
        },
        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent

          // Calculate the progress percentage
          const percentage = (loaded * 100) / total

          const timeElapsed = Date.now() - startAt
          const uploadSpeed = loaded / timeElapsed
          const duration = (total - loaded) / uploadSpeed
          dispatch(
            setUploadProgress({
              progress: +percentage.toFixed(2),
              remaining: duration
            })
          )
        }
      }

      await apiUploadVideo(uploadId, formData, options)
      dispatch(openSnackbarSuccess('File was uploaded successfully:'))

      dispatch(setApiLoading(false))
    } catch (e) {
      dispatch(setApiLoading(false))
      dispatch(
        openSnackbarWarning('Sorry! Something went wrong while uploading file.')
      )
    }
  }

  const handleFileSelect = (file: TFile) => {
    setState((prevState) => {
      return { ...prevState, uploadFile: file }
    })
  }

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

  useEffect(() => {
    handleFileSelect(acceptedFiles[0])
  }, [acceptedFiles.length, acceptedFiles])

  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...vState, type: event.target.value })
  }

  const handleStartUpload = async () => {
    if (!vState.uploadFile) {
      dispatch(openSnackbarError('No file was chosen'))
      return
    }

    /** File validation */
    if (vState.uploadFile.type.indexOf('video') < 0) {
      dispatch(openSnackbarError('Please select a valid video'))
      return
    }

    if (vState.uploadFile.size / (1024 * 1024 * 2048) > 1) {
      dispatch(openSnackbarError('Please reselect file. File size is over 2GB'))
      return
    }

    // console.warn(props.data)

    props.handleNext()
    setTimeout(() => {
      onFileUpload()
    }, 1000)
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
        <PrimaryTextField
          fullWidth={true}
          placeholder="Enter  URL"
          disabled={vState.type !== 'url'}
        />

        <Box>
          <Typography>Upload from your PC</Typography>
          <Radio
            checked={vState.type === 'pc'}
            onChange={handleType}
            value={'pc'}
          />
        </Box>
        <Box {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <Box className="flex">
            <Box className="flex item-center mr-5">
              <Image
                src={fileUpload}
                alt={'fileUpload'}
                style={{
                  width: '1.5rem',
                  marginRight: '1rem'
                }}
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
                <Typography style={{ color: 'var(--Primary1)' }}>
                  Browse
                </Typography>
              </Box>
              <Typography>Maximum file size 2GB</Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography>From Netflix</Typography>
          <Radio
            checked={vState.type === 'netflix'}
            onChange={handleType}
            value={'netflix'}
          />
        </Box>
        <PrimaryTextField
          placeholder="Enter the full movie name"
          disabled={vState.type !== 'netflix'}
        />

        <Box
          sx={{
            mt: 2,
            justifyContent: 'center !important',
            '& .MuiButton-root': { width: '100px' },
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row'
            }
          }}
        >
          <PrimaryButton active={false} onClick={props.handleBack}>
            Back
          </PrimaryButton>
          <PrimaryButton
            sx={{
              mt: {
                xs: 2,
                sm: 0
              }
            }}
            onClick={handleStartUpload}
          >
            Start the Upload
          </PrimaryButton>
        </Box>
      </Box>
    </StepWrapper>
  )
}
