import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import { Grid, Radio, RadioGroup, Tooltip, Typography } from '@mui/material'
import { PrimaryButton } from '@components/common/styled-button'
import InfoIcon from '@mui/icons-material/Info'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { openDocumentApproval } from '@store/reducers/dialog/reducers'
import { EDocumentApprovalDlg, EModeratorApprovalStatus } from '@interfaces/enums'
import CustomToggleButtonGroup from '@components/common/toggle-button'
import FormControlLabel from '@mui/material/FormControlLabel'
import { PrimaryTextField } from '@components/common/text-field'
import { TResDocument } from '@interfaces/apis/api.types'
import {
  apiUpdateApprovalDocPage,
  apiUpdateApprovalDocQuestion,
  apiUpdateApprovalDocument
} from '@interfaces/apis/documents'
import { openSnackbarError, openSnackbarSuccess } from '@store/reducers/snackbar/reducers'
import { setRefresh } from '@store/reducers/api/reducers'
import { useTranslate } from '../../locales'


type TState = {
  open: boolean,
  approval: number,
  answer: string,
  notes: string
}

export default function DocumentApprovalDlg() {


  const InitialState = {
    open: false,
    approval: 0,
    answer: 'Yes',
    notes: ''
  }

  const { t } = useTranslate()
  const [vState, setState] = useState<TState>(InitialState)

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(openDocumentApproval({ open: false }))
    setState(InitialState)
  }

  const updateApprovalDocument = async () => {

    let approvalStatus = approvalConst[vState.approval]
    if (approvalStatus === approvalConst[0])
      approvalStatus = EModeratorApprovalStatus.approved
    if (approvalStatus === approvalConst[1])
      approvalStatus = EModeratorApprovalStatus.rejected

    const params = {
      DocumentId: appState.api.data[dlgState.docIndex].Id,
      Rating: 'None',
      ModeratorApprovalStatus: approvalStatus,
      ModeratorNotes: vState.notes
    }

    await apiUpdateApprovalDocument({ documentId: params.DocumentId }, params)

  }
  const updateApprovalDocTopic = async () => {
  }
  const updateApprovalDocQuestion = async () => {

    let approvalStatus = approvalConst[vState.approval]
    if (approvalStatus === approvalConst[0])
      approvalStatus = EModeratorApprovalStatus.approved
    if (approvalStatus === approvalConst[1])
      approvalStatus = EModeratorApprovalStatus.rejected

    const params = {
      ModeratorAnswerFound: vState.answer === 'Yes',
      ModeratorApprovalStatus: approvalStatus,
      ModeratorLikeStatus: 'New',
      ModeratorNotes: vState.notes
    }
    await apiUpdateApprovalDocQuestion({
      documentId: appState.api.data[dlgState.docIndex].Id,
      topicId: documentDetailState?.GptResponse[dlgState.topicIndex]?.Topic?.Id,
      questionId: documentDetailState?.GptResponse[dlgState.topicIndex]?.answers[dlgState?.questionIndex]?.questionId
    }, params)

  }
  const updateApprovalDocPage = async () => {

    let approvalStatus = approvalConst[vState.approval]
    if (approvalStatus === approvalConst[0])
      approvalStatus = EModeratorApprovalStatus.approved
    if (approvalStatus === approvalConst[1])
      approvalStatus = EModeratorApprovalStatus.rejected

    const params = {
      ModeratorAnswerFound: vState.answer === 'Yes',
      ModeratorApprovalStatus: approvalStatus,
      ModeratorLikeStatus: 'New',
      ModeratorNotes: vState.notes
    }

    await apiUpdateApprovalDocPage({
      documentId: appState.api.data[dlgState.docIndex].Id,
      topicId: documentDetailState?.GptResponse[dlgState.topicIndex]?.Topic?.Id,
      questionId: documentDetailState?.GptResponse[dlgState.topicIndex]?.answers[dlgState?.questionIndex]?.questionId,
      pageNumber: documentDetailState?.GptResponse[dlgState.topicIndex]?.answers[dlgState?.questionIndex]?.pageNumbers[dlgState?.pageIndex]?.pageNumber
    }, params)

  }

  const handleUpdate = async () => {
    let apiUpdateApproval = updateApprovalDocument
    switch (memoValue.type) {
      case EDocumentApprovalDlg.document:
        apiUpdateApproval = updateApprovalDocument
        break
      case EDocumentApprovalDlg.topic:
        apiUpdateApproval = updateApprovalDocTopic
        break
      case EDocumentApprovalDlg.question:
        apiUpdateApproval = updateApprovalDocQuestion
        break
      case EDocumentApprovalDlg.page:
        apiUpdateApproval = updateApprovalDocPage
        break
      default:
        break
    }
    try {
      await apiUpdateApproval()
      dispatch(openSnackbarSuccess(t('updateApproval.msg.updateSuccess')))
      dispatch(openDocumentApproval({ open: false }))
      setTimeout(() => {
        dispatch(setRefresh(true))
      }, 1000)
    } catch (e) {
      console.error(e)
      dispatch(openSnackbarError(t('updateApproval.msg.updateError')))
    } finally {
      setState(InitialState)
    }
  }


  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const documentDetailState = appState.drawer.drawerData
  const documentState = appState.api.data[appState.dialog.documentApproval.docIndex]
  const dlgState = appState.dialog.documentApproval

  const approvalConst = [
    'Approved',
    'Rejected'
  ]

  useEffect(() => {
    if (dlgState.open) {
      setState(prevState => ({ ...prevState, open: true }))
    }
  }, [dlgState])


  const setApprovalStatus = (val: any) => {
    if (val === approvalConst[1]) {
      setState(prevState => ({ ...prevState, approval: 1 }))
    } else {
      setState(prevState => ({ ...prevState, approval: 0 }))
    }
  }

  /* eslint-disable */
  useEffect(() => {
    const gptResponse = documentDetailState?.GptResponse[dlgState.topicIndex]
    switch (dlgState.type) {
      case EDocumentApprovalDlg.document:
        setApprovalStatus(documentState?.ModeratorApprovalStatus)
        break
      case EDocumentApprovalDlg.topic:
        setApprovalStatus(gptResponse?.AiApproval)
        break
      case EDocumentApprovalDlg.question:
        setApprovalStatus(gptResponse?.answers[dlgState?.questionIndex]?.ModeratorApprovalStatus)
        break
      case EDocumentApprovalDlg.page:
        setApprovalStatus(gptResponse?.answers[dlgState?.questionIndex]?.pageNumbers[dlgState?.pageIndex]?.ModeratorApprovalStatus)
        break
      default:
        break
    }
  }, [appState.dialog.documentApproval])


  const memoValue = useMemo(() => {
    let tempMemo = {
      title: '',
      description: '',
      type: dlgState?.type,
      visibleQuestion: false,
      pageInfo: null
    }
    const gptResponse = documentDetailState?.GptResponse[dlgState.topicIndex]

    switch (dlgState.type) {
      case EDocumentApprovalDlg.document:
        tempMemo.title = t('updateApproval.Document Approval')
        tempMemo.description = `${t('updateApproval.Book')} ${documentState?.Name}`
        break
      case EDocumentApprovalDlg.topic:
        tempMemo.title = t('updateApproval.Topic Approval')
        tempMemo.description = `${t('updateApproval.Book')} ${documentState?.Name}, ${t('updateApproval.Topic')} ${gptResponse?.Topic?.Name}`
        break
      case EDocumentApprovalDlg.question:
        tempMemo.title = t('updateApproval.Question Approval')
        tempMemo.description = `${t('updateApproval.Question')}: ${gptResponse?.answers[dlgState?.questionIndex]?.question}`
        tempMemo.visibleQuestion = true
        break
      case EDocumentApprovalDlg.page:
        tempMemo.title = `${t('updateApproval.Page')} ${gptResponse?.answers[dlgState?.questionIndex]?.pageNumbers[dlgState?.pageIndex]?.pageNumber} ${t('updateApproval.Page')}`
        tempMemo.pageInfo = gptResponse?.answers[dlgState?.questionIndex]?.pageNumbers[dlgState?.pageIndex] as TResDocument.TGptAnswerPageNumber
        tempMemo.description = `${t('updateApproval.Question')}: ${gptResponse?.answers[dlgState?.questionIndex]?.question}`
        tempMemo.visibleQuestion = true
        break
      default:
        break
    }
    return tempMemo
  }, [
    dlgState?.type,
    dlgState?.questionIndex,
    dlgState?.pageIndex,
    dlgState?.docIndex,
    dlgState?.topicIndex,
    documentDetailState?.GptResponse[dlgState.topicIndex]?.answers[dlgState?.questionIndex]?.pageNumbers[dlgState?.pageIndex]?.pageNumber,
    appState?.api?.refresh
  ])

  /*eslint-enable*/

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth={memoValue.type !== EDocumentApprovalDlg.page ? 'xs' : 'xl'}
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

          {memoValue.type === EDocumentApprovalDlg.page ?
            <Box sx={{
              height: '620px',
              overflow: 'auto',
              border: '1px solid #e2e2e2',
              borderRadius: '0.5rem',
              backgroundColor: 'white',
              width: '100%',
              '& *': {
                fontWeight: '500 !important'
              }
            }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  padding: '2rem 2rem 0rem 2rem',
                  '& .MuiGrid-item': {
                    display: 'flex',
                    flexDirection: 'column'
                  },
                  '& p': {
                    fontSize: '.9rem'
                  }
                }}
              >
                <Grid item xs={12} md={3} sx={{
                  '& .MuiGrid-item': {
                    flexBasis: '10%',
                    paddingTop: '1rem'
                  }
                }}>
                  <Grid item xs={12} md={10}>
                    <Typography>
                      {t('updateApproval.Ai opinion')}&nbsp;:
                    </Typography>
                    <Typography sx={{ paddingLeft: '2rem' }} className='text-capitalize'>
                      {memoValue.pageInfo?.opinion ? t(`opinion.${memoValue.pageInfo?.opinion.toLowerCase()}`) : t('opinion.no answer')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <Typography>
                      {t('updateApproval.Snippet')}&nbsp;:
                    </Typography>
                    <Typography sx={{ paddingLeft: '2rem' }}>
                      {memoValue.pageInfo?.snippet}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={10} sx={{ marginTop: '1rem' }}>
                    <Typography>
                      {t('updateApproval.findAnswer-question')}
                    </Typography>
                    <RadioGroup
                      row
                      sx={{
                        justifyContent: 'left',
                        '& span': {
                          fontSize: '.75rem'
                        }
                      }}
                      value={vState.answer}
                      onChange={(e, v) => {
                        setState(prevState => ({ ...prevState, answer: v }))
                      }}
                    >
                      <FormControlLabel value='Yes' control={<Radio />} label={t('Yes')} />
                      <FormControlLabel value='No' control={<Radio />} label={t('No')} sx={{ marginLeft: '1rem' }} />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} md={10} sx={{ marginTop: '1rem', marginBottom: '2rem' }}>
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
                <Grid item
                      xs={12}
                      md={9}
                      sx={{ marginTop: '1rem' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: '#3d3d3d',
                      p: 2,
                      width: '100% !important',
                      borderRadius: '.5rem',
                      '& >div': {
                        position: 'relative',
                        borderRadius: '.3rem',
                        paddingBottom: '56.25%',
                        '& >button': {
                          top: '40% !important',
                          left: '45% !important'
                        },
                        '& #vid-1': {
                          marginTop: '0',
                          left: 0,
                          top: 0,
                          width: '100%',
                          height: '100%',
                          '& >div': {
                            width: '100%',
                            height: '100%'
                          }
                        }
                      },
                      '& .vjs-loading-spinner': {
                        background: 'url(/assets/images/buffering-rainbow-bg.png) !important'
                      },
                      '& .vjs-loading-spinner::before': {
                        content: 'url(/assets/images/buffering-rainbow.gif) !important'
                      }
                    }}
                  >
                    <div
                      style={{
                        height: '600px',
                        width: '100%'
                      }}
                    >
                      <iframe id='pdfid' width='100%' style={{ height: 'inherit' }}
                              src={`${appState.drawer.drawerData?.PdfUrl}#page=${memoValue.pageInfo?.pageNumber}.5`}
                              scrolling='no'></iframe>
                    </div>
                  </Box>
                </Grid>

              </Grid>
            </Box>
            : <Box sx={{
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
                {
                  memoValue.visibleQuestion ?

                    <Grid item
                          xs={12}
                          md={12}
                          sx={{ marginTop: '1rem' }}>
                      <Typography>{t('updateApproval.AiOpinion-answer')}</Typography>
                      <RadioGroup
                        row
                        sx={{
                          justifyContent: 'space-evenly',
                          '& span': {
                            fontSize: '.75rem'
                          }
                        }}
                        value={vState.answer}
                        onChange={(e, v) =>
                          setState(prevState => ({ ...prevState, answer: v }))}
                      >
                        <FormControlLabel
                          value='Yes'
                          control={<Radio />}
                          label={t('Yes')} />
                        <FormControlLabel
                          value='No'
                          control={<Radio />}
                          label={t('No')} />
                      </RadioGroup>
                    </Grid>
                    : null
                }
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
          }

          {memoValue.type !== EDocumentApprovalDlg.page ?
            <PrimaryButton
              sx={{
                mt: '2rem',
                padding: '.5rem 2rem',
                textTransform: 'capitalize !important'
              }}
              onClick={handleUpdate}
            >
              {t('update')}
            </PrimaryButton> :
            <Box sx={{height:'50px'}}></Box>}
        </Box>
      </Dialog>
    </React.Fragment>
  )
}
