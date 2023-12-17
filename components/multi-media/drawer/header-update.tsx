import React, { useEffect, useState } from 'react'
import { CSceneState } from '@interfaces/constant'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { EModeratorApprovalStatus } from '@interfaces/enums'
import { apiUpdateVideoSceneSummary } from '@interfaces/apis/videos'
import { openSnackbarError, openSnackbarInfo, openSnackbarSuccess } from '@store/reducers/snackbar/reducers'
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { TResVideo } from '@interfaces/apis/api.types'
import { setPaginationIndex } from '@store/reducers/page/reducers'
import { openMediaSubDrawer } from '@store/reducers/drawer/reducers'


const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#eee'
    },
    '&:hover fieldset': {
      borderColor: '#eee'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--Primary1)'
    }
  }
})


export const HeaderUpdate = () => {
  const [vState, setState] = useState({ moderatorStatus: CSceneState[0], notes: '' })
  const handleScenceState = (
    event: React.MouseEvent<HTMLElement>,
    newState: string | null
  ) => {
    setState(prevState => ({ ...prevState, moderatorStatus: newState }))
  }

  const router = useRouter()

  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const rowIndex = appState.drawer.rowIndex
  const subRowIndex = appState.drawer.subRowIndex
  const data = appState.api.data

  const updateVideoScene = async () => {
    let rowVideoData = data[rowIndex] as TResVideo.TVideoContent
    let urlParam = {
      videoId: rowVideoData.Id,
      summaryId: rowVideoData.VideoSummary?.SceneSummaries[subRowIndex].Id
    }
    const currentDate = new Date()
    const isoString = currentDate.toISOString()

    let parmasStatus = EModeratorApprovalStatus.new
    switch (vState.moderatorStatus) {
      // case CSceneState[0]:
      //   parmasStatus = EModeratorApprovalStatus.inReview
      //   break
      case CSceneState[0]:
        parmasStatus = EModeratorApprovalStatus.approved
        break
      case CSceneState[1]:
        parmasStatus = EModeratorApprovalStatus.rejected
        break
      default:
        break
    }
    let parmas = {
      'SceneSummaryId': rowVideoData.VideoSummary?.SceneSummaries[subRowIndex].Id,
      'OnModeratorModifiedUtc': isoString,
      'Status': parmasStatus,
      'Rating': 'None',
      'Notes': vState.notes,
      'ModeratorUsername': 'demo'
    }
    try {
      await apiUpdateVideoSceneSummary(urlParam, parmas)
      dispatch(openSnackbarSuccess('Success, updated VideoSceneSummary data'))
      dispatch(openMediaSubDrawer({ open: false }))
      setTimeout(() => {
        dispatch(setPaginationIndex({ pageIndex: 0 }))
      }, 2000)
    } catch (e) {
      dispatch(openSnackbarError('Error, updating VideoSceneSummary'))
    }
  }

  useEffect(()=>{
    const rowIndex = appState.drawer.rowIndex
    const subRowIndex = appState.drawer.subRowIndex
    const data = appState.api.data

    let rowVideoData = data[rowIndex] as TResVideo.TVideoContent
    const subRowData = rowVideoData.VideoSummary?.SceneSummaries[subRowIndex]

    if (subRowData.ModeratorApprovalStatus===EModeratorApprovalStatus.rejected)
      setState(prevState => ({...prevState, moderatorStatus: CSceneState[1]}))
  },[])

  const updateDocumentQuestion = async () => {
    dispatch(openSnackbarInfo('This part will come soon'))
  }
  const handleUpdate = appState.drawer.type === 'video' ? updateVideoScene : updateDocumentQuestion

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0
      }}
    >
      <Typography sx={{
        backgroundColor: 'var(--Secondry-L)',
        marginLeft: '-1rem',
        marginRight: '-1rem',
        color: 'black',
        fontSize: '.9rem',
        marginTop: '1rem',
        padding: '1rem'
      }}>{appState.drawer.type === 'video' ? 'Update Scene Status' : 'Update Topic'}</Typography>

      {/*---------Button group---------*/}
      <Box
        sx={{
          pl: '1rem',
          pt: '1rem'
        }}
      >
        <ToggleButtonGroup
          value={vState.moderatorStatus}
          exclusive
          aria-label='text alignment'
          onChange={handleScenceState}
        >
          {CSceneState.map((item, index) => (
            <ToggleButton
              value={item}
              key={index}
              sx={{
                width: '130px',
                height: '33px'
              }}
            >
              {item}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/*  -----------update-----------*/}
      <Box
        sx={{
          m: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}
      >
        <CssTextField
          fullWidth
          placeholder='Write your note'
          sx={{ mr: 2 }}
          InputProps={{
            sx: {
              height: '33px',
              fontSize: '0.8rem',
              padding: '11px'
            }
          }}
          value={vState.notes}
          onChange={
            val => setState(prevState => ({ ...prevState, notes: val.target.value }))
          }
        ></CssTextField>

        <Button
          variant='contained'
          sx={{
            backgroundColor: 'var(--Primary1)',
            width: '130px',
            height: '33px',
            '&:hover': { backgroundColor: 'var(--Primary1)' }
          }}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Box>
    </Box>
  )
}
