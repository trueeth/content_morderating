import { StepWrapper } from './index'
import { Box, Typography } from '@mui/material'
import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { PrimaryButton } from '@components/common/styled-button'
import { useDropzone } from 'react-dropzone'
import { CSSProperties } from 'styled-components'
import fileUpload from '/public/assets/images/icon/fileUpload.svg'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { openSnackbarError, openSnackbarSuccess, openSnackbarWarning } from '@store/reducers/snackbar/reducers'
import {
  apiUploadDocument,
  apiUploadDocumentProcess,
  apiUploadedVideoProcess,
  apiUploadVideo
} from '@interfaces/apis/upload'
import { AxiosRequestConfig } from 'axios'
import { setUploadProgress } from '@store/reducers/upload/reducers'
import { setApiLoading, setRefresh } from '@store/reducers/api/reducers'
import { EProcessingStatus } from '@interfaces/enums'
import { CLanguage } from '@interfaces/constant'
import { readFileAsBytes, uint8ArrayToBase64 } from '@utils/file'
import { openVideoUploadDialog } from '@store/reducers/dialog/reducers'
import { useTranslate } from '../../../../locales'

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
  // const router = useRouter()
  const {t}=useTranslate()

  const getAxiosConfig = (startAt: number, type = 'form') => {

    const progressHandler = (progressEvent: any) => {
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

    const formOptions: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'multipart/form-data'
      },
      onUploadProgress: progressHandler
    }


    const jsonOptions: AxiosRequestConfig = {
      headers: {
        ContentType: 'application/json; charset=UTF-8',
        Accept: '*/*'
      },
      onUploadProgress: progressHandler
    }

    return type == 'form' ? formOptions : jsonOptions
  }

  const uploadVideo = async () => {


    var formData = new FormData()
    formData.append('file', vState.uploadFile)


    let uploadId = props.data.newOld.uploadId
    let startAt = Date.now()


    await apiUploadVideo(uploadId, formData, getAxiosConfig(startAt))
    try {
      await apiUploadedVideoProcess(uploadId.Id)
    } catch (e) {
      console.error(e)
      dispatch(openSnackbarWarning(t('uploadDlg.msg.uploadFileProcessError')))
    } finally {
      dispatch(setApiLoading(false))
      setTimeout(() => {
      }, 500)
      setTimeout(() => {
      }, 1000)
    }
  }


  const uploadDocument = async () => {

    const propsData = props.data.newOld


    let startAt = Date.now()

    const readerResult = await readFileAsBytes(vState.uploadFile)

    const stringResult = uint8ArrayToBase64(readerResult)

    let uploadDocumentInfo = {
      AiApproval: EProcessingStatus.new,
      CompletionTokens: 0,
      CreateLanguageProjectEndTime: '0001-01-01T00:00:00+00:00',
      CreateLanguageProjectStartTime: '0001-01-01T00:00:00+00:00',
      CreateLanguageProjectStatus: 0,
      CreateSearchIndexEndTime: '0001-01-01T00:00:00+00:00',
      CreateSearchIndexStartTime: '0001-01-01T00:00:00+00:00',
      CreateSearchIndexStatus: 0,
      Description: null,
      DocumentBytes: stringResult,
      DocumentChunks: [],
      DocumentSummarizationEndTime: '0001-01-01T00:00:00+00:00',
      DocumentSummarizationStartTime: '0001-01-01T00:00:00+00:00',
      DocumentSummarizationStatus: 0,
      DocumentUrl: null,
      EstimatedTokens: 0,
      FileName: null,
      GptResponse: [],
      Id: '00000000-0000-0000-0000-000000000000',
      Language: CLanguage[propsData.languageType],
      MediaId: '00000000-0000-0000-0000-000000000000',
      MediaSourceId: '49f5cc65-53c4-4caf-94dc-d1f29e6665ec',
      ModeratorApprovalStatus: EProcessingStatus.new,
      ModeratorNotes: null,
      ModeratorResponse: [],
      Name: propsData.newTitle,
      Notes: null,
      OpenAIAnalysisEndTime: '0001-01-01T00:00:00+00:00',
      OpenAIAnalysisStartTime: '0001-01-01T00:00:00+00:00',
      OpenAIAnalysisStatus: 0,
      OpenAiModelDeployment: 'GPT35Turbo16K',
      OriginalFileName: vState.uploadFile.name,
      PdfUrl: null,
      PromptTokens: 0,
      Rating: 'None',
      RecognizeDocumentEndTime: '0001-01-01T00:00:00+00:00',
      RecognizeDocumentStartTime: '0001-01-01T00:00:00+00:00',
      RecognizeDocumentStatus: 0,
      Summary: null,
      TotalProcessingStatus: 0,
      TotalTokens: 0,
      UploadedOnUtc: '0001-01-01T00:00:00+00:00',
      VersionNumber: 0
    }

    const uploadedDocument = await apiUploadDocument(uploadDocumentInfo, getAxiosConfig(startAt, 'json'))

    try {
      await apiUploadDocumentProcess(uploadedDocument.data.Id)
    } catch (e) {
      console.error(e)
      dispatch(openSnackbarWarning(t('uploadDlg.msg.uploadFileProcessError')))
    } finally {
      dispatch(setApiLoading(false))
      setTimeout(() => {
        dispatch(openVideoUploadDialog({ open: false }))
      }, 500)
      setTimeout(() => {
        dispatch(setRefresh(true))
      }, 1000)
    }


  }

  const onFileUpload = async () => {


    if (!vState.uploadFile) return

    dispatch(setApiLoading(true))


    try {
      const mediaType = props.data.mediaType
      if (mediaType === 'Video') {
        await uploadVideo()
      } else {
        await uploadDocument()
      }
      dispatch(openSnackbarSuccess(t('uploadDlg.msg.uploadFileSuccess')))
    } catch (e) {
      console.error(e)
      dispatch(openSnackbarWarning(t('uploadDlg.msg.uploadFileError')))
      dispatch(setApiLoading(false))
    }

  }


  const handleFileSelect = (file: TFile) => {
    setState(prevState => {
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


  const handleStartUpload = async () => {
    if (!vState.uploadFile) {
      dispatch(openSnackbarError(t('uploadDlg.msg.validNoFile')))
      return
    }
    if (props.data.mediaType == 'Video' && vState.uploadFile.type.indexOf('video') < 0) {
      dispatch(openSnackbarError(t('uploadDlg.msg.validVideoFile')))
      return
    }
    if (props.data.mediaType == 'Document' && vState.uploadFile.type.indexOf('pdf') < 0) {
      dispatch(openSnackbarError(t('uploadDlg.msg.validPdfFile')))
      return
    }

    if (vState.uploadFile.size / (1024 * 1024 * 2048) > 1) {
      dispatch(openSnackbarError(t('uploadDlg.msg.validOverFile')))
      return
    }

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
        <Typography>
          {t('uploadDlg.step.sourceFile-question')}
        </Typography>
        <Box sx={{ paddingBottom: '.5rem' }}>
          <Typography>{t('uploadDlg.step.Upload from your PC')}</Typography>
                  </Box>
        <Box {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <Box className='flex'>
            <Box className='flex item-center mr-5'>
              <Image
                src={fileUpload}
                alt={'fileUpload'}
                style={{
                  width: '1.5rem',
                  marginRight: '1rem'
                }}
              />
            </Box>
            <Box className='title-drag'>
              <Box
                display='flex'
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
                  {t('uploadDlg.step.Drag your file here or')}
                </Typography>
                <Typography style={{ color: 'var(--Primary1)' }}>
                  {t('uploadDlg.step.Browse')}
                </Typography>
              </Box>
              <Typography>
                {t('uploadDlg.step.Maximum file size 2GB')}
              </Typography>
            </Box>
          </Box>
        </Box>
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
          <PrimaryButton active={false} onClick={props.handleBack} className='text-capitalize'>
            {t('back')}
          </PrimaryButton>
          <PrimaryButton
            sx={{
              mt: {
                xs: 2,
                sm: 0
              }
            }}
            onClick={handleStartUpload}
            className='text-capitalize'
          >
            {t('uploadDlg.step.Start the Upload')}
          </PrimaryButton>
        </Box>
      </Box>
    </StepWrapper>
  )
}
