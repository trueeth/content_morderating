import { Box, Typography } from '@mui/material'
import RowAction from '@components/multi-media/common/action-item'
import { useSelector } from 'react-redux'
import { IAppSlice } from '@store/reducers'
import { IReduxState } from '@store/index'
import { format, parseISO } from 'date-fns'
import { useMemo } from 'react'
import { EClassificationType } from '@interfaces/enums'

export default function DrawerHeader() {
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const memorizedValue = useMemo(() => {

    let memoValue: {
      Name?: string,
      Description?: string,
      Index?: number,
      Status?: string,
      Rating?: string,
      Classification?: EClassificationType[],
      SubmissionDate?: string,
      Approval?: string
    } = {}

    try {
      const rowIndex = appState.drawer.rowIndex
      const subRowIndex = appState.drawer.subRowIndex
      const data = appState.api.data

      const submissionDate = format(parseISO(data[rowIndex].UploadedOnUtc), 'MM/dd/yyyy hh:mm:ss a')


      let classifications: EClassificationType[] = []
      if (data[rowIndex].VideoSummary?.SexualSeverity == 'Extreme')
        classifications.push(EClassificationType.sexual)
      if (data[rowIndex].VideoSummary?.SelfHarmSeverity == 'Extreme')
        classifications.push(EClassificationType.selfHarm)
      if (data[rowIndex].VideoSummary?.HateSeverity == 'Extreme')
        classifications.push(EClassificationType.hate)
      if (data[rowIndex].VideoSummary?.ViolenceSeverity == 'Extreme')
        classifications.push(EClassificationType.violance)


      memoValue = {
        Index: subRowIndex + 1,
        Name: data[rowIndex].Name,
        Description: 'Later, Muhammad bin Abdulaziz is appointed Crown Prince and assumes\n' +
          '            many tasks and responsibilities in the government. Mohammed bin\n' +
          '            Nayef is then appointed Crown Prince and Deputy Prime Minister, but\n' +
          '            he is dismissed in 2017 and Mohammed bin Salman',
        Status: data[rowIndex].Status,
        Rating: data[rowIndex].VideoSummary.Rating,
        Classification: classifications,
        SubmissionDate: submissionDate,
        Approval: data[rowIndex].ModeratorApprovalStatus
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
        p: 2
      }}
    >
      <header className='flex justify-between'>
        {appState.drawer.type === 'video' ? (
          <>
            <Typography>
              Video for the{' '}
              <strong>{memorizedValue.Name}</strong>, Scene #
              {memorizedValue.Index}
            </Typography>
            <RowAction />
          </>
        ) : (
          <>
            <Typography>
              <strong>{memorizedValue.Name}</strong> Book, Page #
              {memorizedValue.Index}
            </Typography>
            <RowAction />
          </>
        )}
      </header>
      {appState.drawer.type === 'video' ? (
        <>
          <Typography>
            {memorizedValue.Description}
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
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
              <Typography color='var(--Secondary)'> NEW</Typography>
            </Box>
            <Box>
              <Typography>RATING : &nbsp;</Typography>
              <Typography> {memorizedValue.Rating}</Typography>
            </Box>
            <Box>
              <Typography>CLASSIFICATION : &nbsp; </Typography>
              <Typography>
                {memorizedValue.Classification?.join(',')}
              </Typography>
            </Box>
            <Box>
              <Typography>SUBMISSION DATE : &nbsp;</Typography>
              <Typography>
                {memorizedValue.SubmissionDate}
              </Typography>
            </Box>
            <Box>
              <Typography>APPROVAL : &nbsp; </Typography>
              <Typography className='approve'>
                {memorizedValue.Approval}
              </Typography>
            </Box>
          </Box>
        </>
      ) : null}
    </Box>
  )
}
