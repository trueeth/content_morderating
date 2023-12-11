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


function UpdateStatus() {
  const [vState, setState] = useState({ moderatorStatus: 'Processing', notes: '' })
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

  const handleUpdate = async () => {
    let urlParam = {
      videoId: data[rowIndex].Id,
      summaryId: data[rowIndex].VideoSummary?.SceneSummaries[subRowIndex].Id
    }
    const currentDate = new Date()
    const isoString = currentDate.toISOString()

    let parmasStatus = EModeratorApprovalStatus.new
    switch (vState.moderatorStatus) {
      case CSceneState[0]:
        parmasStatus = EModeratorApprovalStatus.inReview
        break
      case CSceneState[1]:
        parmasStatus = EModeratorApprovalStatus.approved
        break
      case CSceneState[2]:
        parmasStatus = EModeratorApprovalStatus.rejected
        break
      default:
        break
    }


    let parmas = {
      'SceneSummaryId': data[rowIndex].VideoSummary?.SceneSummaries[subRowIndex].Id,
      'OnModeratorModifiedUtc': isoString,
      'Status': parmasStatus,
      'Rating': 'None',
      'Notes': vState.notes,
      'ModeratorUsername': 'demo'
    }
    try {
      await apiUpdateVideoSceneSummary(urlParam, parmas)
      dispatch(openSnackbarSuccess('Success, updated VideoSceneSummary data'))
    } catch (e) {
      dispatch(openSnackbarError('Error, updating VideoSceneSummary'))
    } finally {
      setTimeout(() => {
        router.reload()
      }, 2000)
    }
  }

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
        color: '#3ec9e7',
        fontSize: '.9rem',
        marginTop: '1rem',
        padding: '1rem',
      }}>Update Scene Status</Typography>

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
          InputProps={{ sx: { height: '33px', fontSize: '0.8rem' } }}
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
      AiApproval?: string
    } = {}

    try {
      const rowIndex = appState.drawer.rowIndex
      const subRowIndex = appState.drawer.subRowIndex
      const data = appState.api.data

      const subRowData = data[rowIndex].VideoSummary?.SceneSummaries[subRowIndex]

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
        Name: data[rowIndex].Name,
        Description: 'Later, Muhammad bin Abdulaziz is appointed Crown Prince and assumes\n' +
          '            many tasks and responsibilities in the government. Mohammed bin\n' +
          '            Nayef is then appointed Crown Prince and Deputy Prime Minister, but\n' +
          '            he is dismissed in 2017 and Mohammed bin Salman',
        Status: subRowData.ModeratorApprovalStatus,
        Rating: data[rowIndex].VideoSummary?.Rating,
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
        p: 2
      }}
    >
      <header className='flex justify-between'>
        {appState.drawer.type === 'video' ? (
          <>
            <Typography sx={{
              fontSize: ' 1.2rem',
              textAlign: 'center',
              padding: '1rem 2rem',
              width:'100%',
            }}>
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
          {/*<Typography>*/}
          {/*  {memorizedValue.Description}*/}
          {/*</Typography>*/}
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              columnGap: '4rem',
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
              <Typography color='var(--Secondary)'> {memorizedValue.Status}</Typography>
            </Box>
            <Box>
              <Typography>RATING : &nbsp;</Typography>
              <Typography> {memorizedValue.Rating}</Typography>
            </Box>
            <Box>
              <Typography>CLASSIFICATION : &nbsp; </Typography>
              <Typography>
                {memorizedValue.Classification?.length > 0 ? memorizedValue.Classification?.join(',') : 'Not Assigned'}
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
                {memorizedValue.AiApproval}
              </Typography>
            </Box>
          </Box>
        </>
      ) : null}

      <Box>
        <UpdateStatus />
      </Box>

    </Box>
  )
}
