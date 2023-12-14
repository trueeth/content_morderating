import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import RowAction from '@components/multi-media/common/action-item'
import { useDispatch, useSelector } from 'react-redux'
import { IAppSlice } from '@store/reducers'
import { IReduxState } from '@store/index'
import { format, parseISO } from 'date-fns'
import { useMemo, useState } from 'react'
import { EClassificationType, EModeratorApprovalStatus, ESeverity } from '@interfaces/enums'
import { useRouter } from 'next/router'
import { CSceneState } from '@interfaces/constant'
import { apiUpdateVideoSceneSummary } from '@interfaces/apis/videos'
import { openSnackbarError, openSnackbarSuccess } from '@store/reducers/snackbar/reducers'
import { styled } from '@mui/system'
import { TResDocument, TResVideo } from '@interfaces/apis/api.types'
import { HeaderUpdate } from '@components/multi-media/drawer/header-update'





export default function DrawerDocumentHeader() {
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const memorizedVideoValue = useMemo(() => {

    let memoValue: {
      Name?: string,
      Topic?: string,
      Language?: string,
      ProcessingStatus?: string,
      Rating?: string,
      SubmissionDate?: string,
      AiApproval?: string
    } = {}

    try {

      let documentData = appState.drawer.drawerData as TResDocument.TDocumentContentDetail
      let gptResponse =documentData?.GptResponse[appState.drawer.subRowIndex]
      let submissionDate=''
      if (documentData.UploadedOnUtc != null && documentData.UploadedOnUtc != '')
        submissionDate = format(parseISO(documentData.UploadedOnUtc), 'MM/dd/yyyy hh:mm:ss a')

      memoValue = {
        Name: documentData.Name,
        Topic: gptResponse.Topic.Name,
        Language: documentData.Language,
        ProcessingStatus: documentData.TotalProcessingStatus,
        Rating: documentData.Rating,
        SubmissionDate: submissionDate,
        AiApproval: gptResponse.AiApproval
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
        width:'100%'
      }}
    >
      <header className='flex justify-between'>
            <Typography sx={{
              fontSize: ' 1.2rem',
              textAlign: 'center',
              padding: '1rem 2rem',
              width: '100%'
            }}>
              <strong>{memorizedVideoValue.Name}</strong>&nbsp; Book, &nbsp; Topic  &nbsp; &nbsp;
              {memorizedVideoValue.Topic}
            </Typography>
      </header>
          {/*<Typography>*/}
          {/*  {memorizedVideoValue.Description}*/}
          {/*</Typography>*/}
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
              <Typography>LANGUAGE : &nbsp;</Typography>
              <Typography> {memorizedVideoValue.Language}</Typography>
            </Box>
            <Box>
              <Typography>PROCESSING STATUS : &nbsp;</Typography>
              <Typography color='var(--Secondary)'> {memorizedVideoValue.ProcessingStatus}</Typography>
            </Box>
            <Box>
              <Typography>RATING : &nbsp;</Typography>
              <Typography> {memorizedVideoValue.Rating}</Typography>
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
