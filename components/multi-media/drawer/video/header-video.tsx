import { Box,  Typography } from '@mui/material'
import {  useSelector } from 'react-redux'
import { IAppSlice } from '@store/reducers'
import { IReduxState } from '@store/index'
import { format, parseISO } from 'date-fns'
import { useMemo } from 'react'
import { EClassificationType, ESeverity } from '@interfaces/enums'
import { TResVideo } from '@interfaces/apis/api.types'
import { HeaderUpdate } from '@components/multi-media/drawer/header-update'


export default function DrawerVideoHeader() {
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const memorizedVideoValue = useMemo(() => {

    let memoValue: {
      Name?: string,
      Description?: string,
      Index?: number,
      Status?: string,
      Rating?: string,
      Classification?: EClassificationType[],
      SubmissionDate?: string,
      AiApproval?: string
    } = {}

    try {
      const rowIndex = appState.drawer.rowIndex
      const subRowIndex = appState.drawer.subRowIndex
      const data = appState.api.data

      let rowVideoData = data[rowIndex] as TResVideo.TVideoContent

      const subRowData = rowVideoData.VideoSummary?.SceneSummaries[subRowIndex]

      const submissionDate = format(parseISO(data[rowIndex].UploadedOnUtc), 'MM/dd/yyyy hh:mm:ss a')

      let classifications: EClassificationType[] = []

      if (subRowData.SexualSeverity !== ESeverity.none)
        classifications.push(EClassificationType.sexual)

      if (subRowData.ViolenceSeverity !== ESeverity.none)
        classifications.push(EClassificationType.violance)

      if (subRowData.SelfHarmSeverity !== ESeverity.none)
        classifications.push(EClassificationType.selfHarm)

      if (subRowData.HateSeverity !== ESeverity.none)
        classifications.push(EClassificationType.hate)

      memoValue = {
        Index: subRowIndex + 1,
        Name: rowVideoData.Name,
        Description: 'Later, Muhammad bin Abdulaziz is appointed Crown Prince and assumes\n' +
          '            many tasks and responsibilities in the government. Mohammed bin\n' +
          '            Nayef is then appointed Crown Prince and Deputy Prime Minister, but\n' +
          '            he is dismissed in 2017 and Mohammed bin Salman',
        Status: subRowData.ModeratorApprovalStatus,
        Rating: rowVideoData.VideoSummary?.Rating,
        Classification: classifications,
        SubmissionDate: submissionDate,
        AiApproval: subRowData.AutomaticApprovalStatus
      }
    } catch (e) {
      console.log(e)
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
          Video for the{' '}
          <strong>{memorizedVideoValue.Name}</strong>, Scene #
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
          '& .MuiBox-root': {
            display: 'flex',
            alignItems: 'center',
            '& .MuiTypography-root:first-of-type': {
              color: 'grey',
              fontSize: '14px'
            }
          }
        }}
      >
        <Box>
          <Typography>STATUS : &nbsp;</Typography>
          <Typography color='var(--Secondary)'> {memorizedVideoValue.Status}</Typography>
        </Box>
        <Box>
          <Typography>RATING : &nbsp;</Typography>
          <Typography> {memorizedVideoValue.Rating}</Typography>
        </Box>
        <Box>
          <Typography>CLASSIFICATION : &nbsp; </Typography>
          <Typography>
            {memorizedVideoValue.Classification?.length > 0 ? memorizedVideoValue.Classification?.join(',') : 'Not Assigned'}
          </Typography>
        </Box>
        <Box>
          <Typography>SUBMISSION DATE : &nbsp;</Typography>
          <Typography>
            {memorizedVideoValue.SubmissionDate}
          </Typography>
        </Box>
        <Box>
          <Typography>APPROVAL : &nbsp; </Typography>
          <Typography className='approve'>
            {memorizedVideoValue.AiApproval}
          </Typography>
        </Box>
      </Box>
      <Box>
        <HeaderUpdate />
      </Box>

    </Box>
  )
}
