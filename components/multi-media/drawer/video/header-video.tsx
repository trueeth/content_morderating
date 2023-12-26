import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { IAppSlice } from '@store/reducers'
import { IReduxState } from '@store/index'
import { format, parseISO } from 'date-fns'
import { useMemo } from 'react'
import { EClassificationType, ESeverity } from '@interfaces/enums'
import { TResVideo } from '@interfaces/apis/api.types'
import { HeaderUpdate } from '@components/multi-media/drawer/video/header-update'
import RowApproval from '@components/multi-media/common/approval-item'
import { useTranslate } from '../../../../locales'
import RowRating from '@components/multi-media/common/rating-item'


export default function DrawerVideoHeader() {
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const { t } = useTranslate()

  const memorizedVideoValue = useMemo(() => {

    let memoValue: {
      Name?: string,
      Description?: string,
      Index?: number,
      Status?: string,
      Rating?: string,
      Classification?: EClassificationType[],
      ClassificationString?: string[],
      SubmissionDate?: string,
      AiApproval?: string
    } = {}

    try {
      const rowIndex = appState.drawer.rowIndex
      const subRowIndex = appState.drawer.subRowIndex
      const data = appState.api.data

      let rowVideoData = data[rowIndex] as TResVideo.TVideoContent

      const subRowData = rowVideoData?.VideoSummary?.SceneSummaries[subRowIndex]
      let submissionDate = ''
      if (data[rowIndex]?.UploadedOnUtc !== undefined)
        submissionDate = format(parseISO(data[rowIndex]?.UploadedOnUtc), 'MM/dd/yyyy hh:mm:ss a')

      let classifications: EClassificationType[] = []
      let classificationsString: string[] = []

      if (subRowData?.SexualSeverity !== ESeverity.none)
        classifications.push(EClassificationType.sexual)
      classificationsString.push('sexual')

      if (subRowData?.ViolenceSeverity !== ESeverity.none)
        classifications.push(EClassificationType.violance)
      classificationsString.push('violence')

      if (subRowData?.SelfHarmSeverity !== ESeverity.none)
        classifications.push(EClassificationType.selfHarm)
      classificationsString.push('self-harm')

      if (subRowData?.HateSeverity !== ESeverity.none)
        classifications.push(EClassificationType.hate)
      classificationsString.push('hate')

      memoValue = {
        Index: subRowIndex + 1,
        Name: rowVideoData?.Name,
        Description: 'Later, Muhammad bin Abdulaziz is appointed Crown Prince and assumes\n' +
          '            many tasks and responsibilities in the government. Mohammed bin\n' +
          '            Nayef is then appointed Crown Prince and Deputy Prime Minister, but\n' +
          '            he is dismissed in 2017 and Mohammed bin Salman',
        Status: subRowData?.ModeratorApprovalStatus,
        Rating: subRowData?.Rating,
        Classification: classifications,
        ClassificationString: classificationsString,
        SubmissionDate: submissionDate,
        AiApproval: subRowData?.AutomaticApprovalStatus
      }
    } catch (e) {
      console.error(e)
    }

    return memoValue
  }, [appState.api.data, appState.drawer.rowIndex, appState.drawer.subRowIndex])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        width: '100%'
      }}
    >
      <header className='flex justify-between'>
        <Typography sx={{
          fontSize: ' 1.2rem',
          textAlign: 'center',
          padding: '1rem 2rem',
          width: '100%'
        }}>
          {t('drawer.video.Video for the')}{' '}
          <strong>{memorizedVideoValue.Name}</strong>, {t('drawer.video.Scene')} #
          {memorizedVideoValue.Index}
        </Typography>
      </header>

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          columnGap: '4rem',
          padding: '0rem 1rem',
          flexDirection: 'column',
          '& .MuiBox-root': {
            display: 'flex',
            alignItems: 'center',
            '& .MuiTypography-root:first-of-type': {
              color: 'grey',
              fontSize: '14px'
            }
          },
          '>.MuiBox-root': {
            gap: 4
          }
        }}
      >
        <Box>
          <Box>
            <Typography>{t('drawer.video.STATUS')} : &nbsp;</Typography>
            <RowApproval approval={memorizedVideoValue.Status} />
          </Box>
          <Box>
            <Typography>{t('drawer.video.RATING')} : &nbsp;</Typography>
            <RowRating rating={memorizedVideoValue.Rating} />
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography>{t('drawer.video.AI CLASSIFICATION')} : &nbsp; </Typography>
            <Typography className='text-capitalize text-85'>
              {memorizedVideoValue.ClassificationString?.length > 0 ? memorizedVideoValue.ClassificationString?.map(item => t(`violence-classification.${item}`)).join(', ') : t('not assigned')}
            </Typography>
          </Box>

          <Box>
            <Typography>{t('drawer.video.AI APPROVAL')} : &nbsp; </Typography>
            <RowApproval approval={memorizedVideoValue.AiApproval} />
          </Box>

        </Box>

        <Box>
          <Typography>{t('drawer.video.SUBMISSION DATE')} : &nbsp;</Typography>
          <Typography>
            {memorizedVideoValue.SubmissionDate}
          </Typography>
        </Box>
      </Box>
      <Box>
        <HeaderUpdate />
      </Box>
    </Box>
  )
}
