import { StepWrapper } from './index'
import { Box, Select, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { useState } from 'react'
import { PrimaryButton } from '@components/common/styled-button'
import { PrimaryTextField } from '@components/common/text-field'
import { openSnackbarError } from '@store/reducers/snackbar/reducers'
import { useDispatch } from 'react-redux'
import { CLanguage } from '@interfaces/constant'
import { useTranslate } from "../../../../locales"
import { EMediaRating, EModeratorApprovalStatus, EProcessingStatus } from '@interfaces/enums'
import { TResVideo } from '@interfaces/apis/api.types'
import { apiGetUploadMediaId } from '@interfaces/apis/upload'

export default function StatusStep(props: {
  handleNext: (any) => void
  handleBack: () => void
  mediaType?: string
}) {

  const initialState = {
    newTitle: '',
    type: 'new',
    replaceItem: null,
    languageType: 0,
    uploadId: null
  }

  const [vState, setState] = useState(initialState)
  const { t } = useTranslate()

  const handleLanguageType = (event: any) => {
    setState({ ...vState, languageType: event.target.value })
  }

  const dispatch = useDispatch()

  type TUploadInfo = TResVideo.TVideoContent & {
    ModeratorNotes?: string,
    Rating?: string,
  }


  const handleNext = async () => {
    if (vState.newTitle == '' && vState.type == 'new') {
      dispatch(openSnackbarError(t('uploadDlg.step.titleEmpty-msg')))
      return
    }
    let uploadVideoInfo: TUploadInfo = {
      AIClassification: EMediaRating.none,
      AiClassificationEndTime: null,
      AiClassificationStartTime: null,
      AiClassificationStatus: EProcessingStatus.new,
      AzureIndexerEndTime: null,
      AzureIndexerStartTime: null,
      AzureIndexerStatus: EProcessingStatus.new,
      AzureIndexerVideoId: null,
      Description: 'trueeth video upload',
      Duration: null,
      FileName: null,
      FrameAnalyticsStatus: EProcessingStatus.new,
      FrameClassificationEndTime: null,
      FrameClassificationStartTime: null,
      FrameExractionEndTime: null,
      FrameExractionStartTime: null,
      FrameExtractionStatus: 'New',
      FrameRate: null,
      Id: '00000000-0000-0000-0000-000000000000',
      InternalVideoPath: null,
      MediaSourceId: '49f5cc65-53c4-4caf-94dc-d1f29e6665ec',
      ModeratorApprovalStatus: EModeratorApprovalStatus.new,
      ModeratorClassification: EMediaRating.none,
      ModeratorNotes: '',
      Name: vState.newTitle,
      Notes: 'a',
      OriginalFileName: null,
      ProcessingStatusPercentage: null,
      Rating: 'None',
      SaveToCosmosEndTime: null,
      SaveToCosmosStartTime: null,
      SaveToCosmosStatus: EProcessingStatus.new,
      Status: EProcessingStatus.new,
      TranscripClassificationEndTime: null,
      TranscripClassificationStartTime: null,
      TranscriptAnalyticsStatus: EProcessingStatus.new,
      TranscriptGenerationEndTime: null,
      TranscriptGenerationStartTime: null,
      TranscriptGenerationStatus: EProcessingStatus.new,
      UploadedOnUtc: '0001-01-01T00:00:00+00:00',
      VersionNumber: 0,
      VideoSummary: null
    }
    let uploadId = null
    if (props.mediaType == 'Video') {
      try {
        uploadId = await apiGetUploadMediaId(uploadVideoInfo)
      } catch (e) {
        console.log(e)
        setState(initialState)
        dispatch(openSnackbarError(t('uploadDlg.step.duplicateId-msg')))
        return
      }
    }
    props.handleNext({ ...vState, uploadId: uploadId?.data })
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
            alignItems: 'center'
          },

          '& .MuiTypography-root, input': {
            sm: { fontSize: '.9rem' },
            xs: { fontSize: '.7rem' }
          }
        }}
      >
        <Box sx={{ paddingTop: '1.5rem' }}>
          <Typography className='text-capitalize'> {t('name')}</Typography>
        </Box>
        <PrimaryTextField
          placeholder={t('uploadDlg.step.name-placeHolder')}
          value={vState.newTitle}
          onChange={(event) =>
            setState({ ...vState, newTitle: event.target.value })
          }
        />
        {
          props.mediaType === 'Document' ?
            <>
              <Box sx={{ paddingTop: '1.5rem' }}>
                <Typography className='text-capitalize'>
                  {t('column.language')}
                </Typography>
              </Box>
              <Select
                value={vState.languageType}
                onChange={handleLanguageType}
                fullWidth
                sx={{
                  height: '40px',
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--Primary1)'
                  },
                  '& .MuiOutlinedInput-input': {
                    textTransform: 'capitalize !important'
                  },
                  bgcolor: 'white',
                  pl: '1rem'
                }}
              >
                {
                  CLanguage.map((val, index) => (
                    <MenuItem
                      sx={{
                        '& .MuiTypography-root, input': {
                          sm: { fontSize: '.9rem' },
                          xs: { fontSize: '.7rem' }
                        }
                      }}
                      key={index}
                      value={index}
                      className='text-capitalize'
                    >
                      {t(val.toLowerCase())}
                    </MenuItem>))
                }
              </Select>
            </>
            :
            null
        }

        <Box
          sx={{
            mt: 2,
            justifyContent: 'center !important',
            '& .MuiButton-root': { width: '100px' }
          }}
        >
          <PrimaryButton onClick={props.handleBack} active={false} className='text-capitalize'>
            {t('back')}
          </PrimaryButton>
          <PrimaryButton onClick={handleNext} className='text-capitalize'>
            {t('next')}
          </PrimaryButton>
        </Box>
      </Box>
    </StepWrapper>
  )
}
