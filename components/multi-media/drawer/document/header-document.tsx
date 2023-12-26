import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { IAppSlice } from '@store/reducers'
import { IReduxState } from '@store/index'
import { format, parseISO } from 'date-fns'
import React, { useMemo } from 'react'
import { TResDocument } from '@interfaces/apis/api.types'
import RowApproval from '@components/multi-media/common/approval-item'
import { useTranslate } from '../../../../locales'


export default function DrawerDocumentHeader() {
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)
  const {t}=useTranslate()

  /* eslint-disable */
  const memorizedVideoValue = useMemo(() => {

    let memoValue: {
      Name?: string,
      Topic?: string,
      Language?: string,
      ProcessingStatus?: string,
      Rating?: string,
      SubmissionDate?: string,
      AiApproval?: string,
      ModeratorApproval?: string,
    } = {}

    try {

      let documentData = appState.drawer.drawerData as TResDocument.TDocumentContentDetail
      let gptResponse = documentData?.GptResponse[appState.drawer.subRowIndex]
      let submissionDate = ''
      if (documentData.UploadedOnUtc != null && documentData.UploadedOnUtc != '')
        submissionDate = format(parseISO(documentData.UploadedOnUtc), 'MM/dd/yyyy hh:mm:ss a')

      memoValue = {
        Name: documentData.Name,
        Topic: gptResponse.Topic.Name,
        Language: documentData.Language,
        ProcessingStatus: documentData.TotalProcessingStatus,
        Rating: documentData.Rating,
        SubmissionDate: submissionDate,
        AiApproval: gptResponse.AiApproval,
        ModeratorApproval: documentData.ModeratorApprovalStatus
      }
    } catch (e) {
      console.error(e)
    }

    return memoValue
  }, [appState.api.data, appState.drawer.rowIndex, appState.drawer.subRowIndex])
  /* eslint-enable */

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
        <Typography
          sx={{
            fontSize: ' 1.2rem',
            textAlign: 'center',
            padding: '1rem 2rem',
            width: '100%'
          }}
          className='menu-title'
        >
          <strong>{memorizedVideoValue.Name}</strong>&nbsp; {t('drawer.Book')}, &nbsp; {t('drawer.Topic')}  &nbsp; &nbsp;
          {memorizedVideoValue.Topic}
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
              fontSize: '12px'
            }
          }
        }}
      >
        <Box>
          <Typography className='text-uppercase'>{t('column.language')} : &nbsp;</Typography>
          <Typography> {memorizedVideoValue.Language}</Typography>
        </Box>
        <Box>
          <Typography className='text-uppercase'>{t('column.ai approval')} : &nbsp; </Typography>
          <RowApproval approval={memorizedVideoValue.AiApproval} />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 0
        }}
      >
      </Box>

    </Box>
  )
}
