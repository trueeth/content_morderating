import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import { Grid, Select, Tooltip, Typography } from '@mui/material'
import { PrimaryButton } from '@components/common/styled-button'
import InfoIcon from '@mui/icons-material/Info'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { openVideoApproval } from '@store/reducers/dialog/reducers'
import { EMediaRating, EModeratorApprovalStatus } from '@interfaces/enums'
import CustomToggleButtonGroup from '@components/common/toggle-button'
import { PrimaryTextField } from '@components/common/text-field'
import { openSnackbarError, openSnackbarSuccess } from '@store/reducers/snackbar/reducers'
import { apiUpdateApprovalVideoSummary } from '@interfaces/apis/videos'
import { TResVideo } from '@interfaces/apis/api.types'
import MenuItem from '@mui/material/MenuItem'
import { setRefresh } from '@store/reducers/api/reducers'
import { useTranslate } from '../../locales'


type TState = {
  open: boolean,
  approval: number,
  rating: number,
  notes: string
}

export default function VideoApprovalDlg() {


  const {t}=useTranslate()

  const InitialState = {
    open: false,
    approval: 0,
    rating: 0,
    notes: ''
  }

  const [vState, setState] = useState<TState>(InitialState)

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(openVideoApproval({ open: false }))
    setState(InitialState)
  }

  const updateApprovalVideo = async () => {

    let approvalStatus = approvalConst[vState.approval]
    if (approvalStatus === approvalConst[0])
      approvalStatus = EModeratorApprovalStatus.approved
    if (approvalStatus === approvalConst[1])
      approvalStatus = EModeratorApprovalStatus.rejected


    const currentDate = new Date()
    const isoString = currentDate.toISOString()

    const params = {
      VideoSummaryId: videoState?.VideoSummary?.Id,
      OnModeratorModifiedUtc: isoString,
      Status: approvalStatus,
      AutomaticStatus: "Rejected",
      Rating: Object.values(EMediaRating)[vState.rating],
      Notes: vState.notes,
      ModeratorUsername: "demo"
    }

    await apiUpdateApprovalVideoSummary({ videoId: videoState?.Id }, params)

  }

  const handleUpdate = async () => {
    try {
      await updateApprovalVideo()
      dispatch(openSnackbarSuccess(t('drawer.msg.updateApprovalStatusSuccess')))
      setTimeout(() => {
        dispatch(setRefresh(true))
      }, 1000)
    } catch (e) {
      console.error(e)
      dispatch(openSnackbarError(t('drawer.msg.updateApprovalStatusError')))
    } finally {
      dispatch(openVideoApproval({ open: false }))
      setState(InitialState)
    }
  }


  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const videoState = appState.api.data[appState.dialog.videoApproval.rowIndex] as TResVideo.TVideoContent
  const dlgState = appState.dialog.videoApproval

  const approvalConst = [
    'Approved',
    'Rejected'
  ]

  /*eslint-disable*/
  useEffect(() => {
    if (dlgState.open) {
      {
        const ratingValue = videoState?.VideoSummary?.Rating
        let ratingKey=0
        const ratingArray=Object.values(EMediaRating)
        ratingArray.forEach((val, index)=>{
          if (val===ratingValue)
            ratingKey=index
        })
        setState(prevState => ({ ...prevState, open: true, rating:ratingKey }))
      }
    }
  }, [dlgState])
  /*eslint-enable*/


  const setApprovalStatus = (val: any) => {
    if (val === approvalConst[1])
      setState(prevState => ({ ...prevState, approval: 1 }))
    else
      setState(prevState => ({ ...prevState, approval: 0 }))
  }

  /* eslint-disable */
  const memoValue = useMemo(() => {
    let tempMemo = {
      title: '',
      description: '',
      visibleQuestion: false,
      pageInfo: null,
      rating:EMediaRating.none
    }

    tempMemo.title=`${videoState?.Name} ${t('updateApproval.Approval')}`

    setApprovalStatus(videoState?.VideoSummary?.ModeratorApprovalStatus)

    return tempMemo
  }, [dlgState])
  /*eslint-enable*/

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth='xs'
        open={vState.open}
        onClose={handleClose}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            p: 3,
            backgroundImage: 'linear-gradient(to right, #fff9f9, #ebe9ff)',
            '& .MuiTypography-root': {
              fontSize: '.9rem'
            }
          }}
        >
          <Box sx={{ display: 'flex', pt: '2rem', pb: '1rem' }}>
            <Typography
              sx={{
                fontSize: '1.3rem !important',
                fontWeight: ' 600',
                color: '#333',
                textAlign: 'center'
              }}
            >
              {memoValue.title}
            </Typography>
            <Tooltip title={memoValue.title}>
              <InfoIcon sx={{ color: 'grey', width: '16px', ml: 1, mt: -1 }} />
            </Tooltip>
          </Box>
          <Box sx={{ paddingBottom: '1rem' }}>
            <Typography sx={{ textAlign: 'center' }}>
              {memoValue.description}
            </Typography>
          </Box>
           <Box sx={{
              overflow: 'auto',
              border: '1px solid #e2e2e2',
              borderRadius: '0.5rem',
              backgroundColor: 'white',
              padding: '2rem',
              '& *': {
                fontWeight: '500 !important'
              }
            }}>
              <Grid
                container
                spacing={2}
                sx={{
                  '& .MuiGrid-item': {
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '1rem'
                  },
                  '& p': {
                    fontSize: '.9rem'
                  }
                }}
              >
                <Grid item xs={12} md={12}>
                  <Typography sx={{ pb: '.3rem' }}>{t('updateApproval.Moderator Approval')} :</Typography>
                  <CustomToggleButtonGroup
                    groupName={approvalConst}
                    sx={{
                      marginTop: '.5rem',
                      '& button': {
                        fontSize: '.75rem',
                        whiteSpace: 'nowrap',
                        padding: '.4rem .6rem',
                        minWidth: '40%'
                      }
                    }}
                    value={vState.approval}
                    handleChange={(val) => setState({ ...vState, approval: val })}
                  />
                </Grid>
                    <Grid item
                          xs={12}
                          md={12}
                          sx={{ marginTop: '1rem' }}>
                      <Typography>{t('updateApproval.Meida Rating')}</Typography>
                      <Select
                        value={vState.rating}
                        onChange={(e)=>setState(prevState => ({...prevState, rating:Number(e.target.value)}))}
                        sx={{
                          width: '80%',
                          fontSize: '.8rem',
                          pl:'1rem',
                          mt:'.5rem',
                          '& .MuiOutlinedInput-input': {
                            textTransform:"capitalize !important"
                          }
                        }}
                      >
                        {Object.values(EMediaRating).map((val, index) => (
                          <MenuItem key={index} value={index} sx={{ fontSize: '.8rem', textTransform:'capitalize !important' }}>
                            {t(`rowRating.${val.toLowerCase()}`)}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                <Grid item xs={12} md={12}>
                  <Typography>{t('updateApproval.Notes')}:</Typography>
                  <PrimaryTextField
                    sx={{
                      marginTop: '.5rem',
                      '& textarea': {
                        fontSize: '.9rem'
                      }
                    }}
                    value={vState.notes}
                    onChange={
                      (e: React.ChangeEvent<HTMLInputElement>) =>
                        setState(prevState => ({
                          ...prevState,
                          notes: e.target.value
                        }))
                    }
                    multiline
                    placeholder={t('updateApproval.Enter the notes')} />
                </Grid>
              </Grid>
            </Box>
          <PrimaryButton
            sx={{
              mt: '2rem',
              padding: '.5rem 2rem',
              textTransform: 'capitalize !important'
            }}
            onClick={handleUpdate}
          >
            {t('update')}
          </PrimaryButton>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}
