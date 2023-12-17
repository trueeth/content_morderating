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
import { setPaginationIndex } from '@store/reducers/page/reducers'
import { openMediaSubDrawer } from '@store/reducers/drawer/reducers'


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

  const [vState, setState] = useState<TState>(InitialState)

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(openDocumentApproval({ open: false }))
    setState(InitialState)
  }

  const updateApprovalDocument = async () => {

    let approvalStatus = approvalConst[vState.approval]
    if (approvalStatus === approvalConst[0])
      approvalStatus = EModeratorApprovalStatus.inReview

    const params = {
      DocumentId: appState.api.data[dlgState.docIndex].Id,
      Rating: 'None',
      ModeratorApprovalStatus: approvalStatus,
      ModeratorNotes: vState.notes
    }

    await apiUpdateApprovalDocument({ documentId: params.DocumentId }, params)

  }
  const updateApprovalDocTopic = async () => {

    // let approvalStatus = approvalConst[vState.approval];
    // if (approvalStatus===approvalConst[0])
    //   approvalStatus=EModeratorApprovalStatus.inReview
    //
    // const params = {
    //   DocumentId: appState.api.data[dlgState.docIndex].Id,
    //   Rating: 'None',
    //   ModeratorApprovalStatus: approvalConst[vState.approval],
    //   ModeratorNotes: vState.notes
    // }

    // await apiUpdateApprovalDocTopic({documentId:params.DocumentId}, params)

  }
  const updateApprovalDocQuestion = async () => {

    let approvalStatus = approvalConst[vState.approval]
    if (approvalStatus === approvalConst[0])
      approvalStatus = EModeratorApprovalStatus.inReview

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
      approvalStatus = EModeratorApprovalStatus.new

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
      dispatch(openSnackbarSuccess('Success updating approval status'))
      setTimeout(() => {
        dispatch(setPaginationIndex({ pageIndex: 0 }))
      }, 2000)
    } catch (e) {
      console.error(e)
      dispatch(openSnackbarError('Get Error while updating approval status'))
    } finally {
      dispatch(openDocumentApproval({ open: false }))
      dispatch(openMediaSubDrawer({ open: false }))
      setState(InitialState)
    }
  }


  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const documentDetailState = appState.drawer.drawerData
  const documentState = appState.api.data[appState.dialog.documentApproval.docIndex]
  const dlgState = appState.dialog.documentApproval

  const approvalConst = [
    // 'Not Assigned',
    'Approved',
    'Rejected',
  ]

  useEffect(() => {
    if (dlgState.open) {
      setState(prevState => ({ ...prevState, open: true }))
    }
  }, [dlgState])


  const memoValue = useMemo(() => {
    let tempMemo = {
      title: '',
      description: '',
      type: dlgState?.type,
      visibleQuestion: false,
      pageInfo: null
    }
    const gptResponse = documentDetailState?.GptResponse[dlgState.topicIndex]

    const setApprovalStatus = (val: any) => {
      if (val === approvalConst[1])
        setState(prevState => ({ ...prevState, approval: 1 }))
      else if (val === approvalConst[2])
        setState(prevState => ({ ...prevState, approval: 2 }))
      else
        setState(prevState => ({ ...prevState, approval: 0 }))
    }

    switch (dlgState.type) {
      case EDocumentApprovalDlg.document:
        tempMemo.title = 'Document Approval'
        tempMemo.description = `Book ${documentState?.Name}`
        setApprovalStatus(documentState?.ModeratorApprovalStatus)
        break
      case EDocumentApprovalDlg.topic:
        tempMemo.title = 'Topic Approval'
        tempMemo.description = `Book ${documentState?.Name}, Topic ${gptResponse?.Topic?.Name}`
        setApprovalStatus(gptResponse?.AiApproval)
        break
      case EDocumentApprovalDlg.question:
        tempMemo.title = 'Question Approval'
        tempMemo.description = `Question: ${gptResponse?.answers[dlgState?.questionIndex]?.question}`
        tempMemo.visibleQuestion = true
        setApprovalStatus(gptResponse?.answers[dlgState?.questionIndex]?.ModeratorApprovalStatus)
        break
      case EDocumentApprovalDlg.page:
        console.log(dlgState?.pageIndex)
        console.log(gptResponse?.answers[dlgState?.questionIndex]?.pageNumbers)
        tempMemo.title = `Page ${gptResponse?.answers[dlgState?.questionIndex]?.pageNumbers[dlgState?.pageIndex]?.pageNumber} Approval`
        tempMemo.pageInfo = gptResponse?.answers[dlgState?.questionIndex]?.pageNumbers[dlgState?.pageIndex] as TResDocument.TGptAnswerPageNumber
        tempMemo.description = `Question: ${gptResponse?.answers[dlgState?.questionIndex]?.question}`
        tempMemo.visibleQuestion = true
        setApprovalStatus(gptResponse?.answers[dlgState?.questionIndex]?.pageNumbers[dlgState?.pageIndex]?.ModeratorApprovalStatus)
        break
      default:
        break
    }
    return tempMemo
  }, [dlgState?.type, dlgState?.questionIndex, dlgState?.pageIndex, dlgState?.docIndex, dlgState?.topicIndex, documentDetailState?.GptResponse[dlgState.topicIndex]?.answers[dlgState?.questionIndex]?.pageNumbers[dlgState?.pageIndex]?.pageNumber])


  return (
    <React.Fragment>
      {/*----------- document approval dialog ---------*/}
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
            '& .MuiTypography-root':{
                fontSize:'.9rem'
            },
          }}
        >
          {/*---------title-----------*/}
          <Box sx={{ display: 'flex', pt: '2rem', pb:'1rem' }}>
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

          {/*---------- Document description ----------*/}
          <Box sx={{ paddingBottom: '1rem' }}>
            <Typography sx={{ textAlign: 'center' }}>
              {memoValue.description}
            </Typography>
          </Box>

          {/*-------------Dialog main content------------*/}

          {memoValue.type === EDocumentApprovalDlg.page ?
            /*
            * Dialog content while there is a specific page
            * */
            <Box sx={{
              height: '620px',
              overflow: 'auto',
              border: '1px solid #e2e2e2',
              borderRadius: '0.5rem',
              backgroundColor: 'white',
              width:'100%'
            }}
            >
              {/*
                Main grid of dialog
              */}
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
                {/*
                Left side content of Dialog
                */}
                <Grid item xs={12} md={3} sx={{
                  '& .MuiGrid-item': {
                    flexBasis: '10%',
                    paddingTop: '1rem'
                  }
                }}>
                  {/*------ai opinion----------*/}
                  <Grid item xs={12} md={10}>
                    <Typography>
                      Ai Opinion&nbsp;:
                    </Typography>
                    <Typography sx={{ paddingLeft: '2rem' }}>
                      The page portrays the question in
                      a <strong>{memoValue.pageInfo?.opinion ? memoValue.pageInfo?.opinion : 'no'}</strong> way based on
                      the Ai findings

                    </Typography>
                  </Grid>
                  {/*------snippet----------*/}
                  <Grid item xs={12} md={10}>
                    <Typography>
                      Snippet&nbsp;:
                    </Typography>
                    <Typography sx={{ paddingLeft: '2rem' }}>
                      {memoValue.pageInfo?.snippet}
                    </Typography>
                  </Grid>
                  {/*-------moderator approval---------*/}
                  <Grid item xs={12} md={10}>
                    <Typography>Moderator Approval :</Typography>
                    <CustomToggleButtonGroup
                      groupName={approvalConst}
                      sx={{
                        marginTop: '.5rem',
                        '& button': {
                          fontSize: '.75rem',
                          whiteSpace: 'nowrap',
                          padding: '.4rem .6rem'
                        }
                      }}
                      value={vState.approval}
                      handleChange={(val) => setState({ ...vState, approval: val })}
                    />
                  </Grid>
                  {/*------answer for the book----------*/}
                  <Grid item xs={12} md={10} sx={{ marginTop: '1rem' }}>
                    <Typography>Did you find an answer for this question in the book ?</Typography> <RadioGroup
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
                    <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                    {/*<FormControlLabel value="Audio" control={<Radio />} label="Audio" />*/}
                    <FormControlLabel value='No' control={<Radio />} label='No' sx={{ marginLeft: '1rem' }} />
                  </RadioGroup>
                  </Grid>
                  {/*------notes----------*/}
                  <Grid item xs={12} md={10} sx={{ marginTop: '1rem', marginBottom: '2rem' }}>
                    <Typography>Notes:</Typography>
                    <PrimaryTextField
                      sx={{
                        marginTop: '.5rem'
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
                      placeholder='Enter the notes' />
                  </Grid>
                </Grid>

                {/*
                Right side content of Dialog - preview the page
                */}
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
                      width:'100% !important',
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
                          // position:'relative',
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
                        // overflowY: 'auto',
                        height: '600px',
                        width:'100%',
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
            /*----------Dialog content ------------*/
            : <Box  sx={{
              overflow: 'auto',
              border: '1px solid #e2e2e2',
              borderRadius: '0.5rem',
              backgroundColor: 'white',
              padding:'2rem'
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
                {/*------moderator approval-----------*/}
                <Grid item xs={12} md={12}>
                  <Typography sx={{pb:'.3rem'}}>Moderator Approval :</Typography>
                  <CustomToggleButtonGroup
                    groupName={approvalConst}
                    sx={{
                      marginTop: '.5rem',
                      '& button': {
                        fontSize: '.75rem',
                        whiteSpace: 'nowrap',
                        padding: '.4rem .6rem',
                        minWidth: '33.3%'
                      }
                    }}
                    value={vState.approval}
                    handleChange={(val) => setState({ ...vState, approval: val })}
                  />
                </Grid>
                {/*------------answer for the book------------*/}
                {
                  memoValue.visibleQuestion ?

                    <Grid item
                          xs={12}
                          md={12}
                          sx={{ marginTop: '1rem' }}>
                      <Typography>Did you find an answer for this question in the book ?</Typography>
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
                          label='Yes' />
                        <FormControlLabel
                          value='No'
                          control={<Radio />}
                          label='No' />
                      </RadioGroup>
                    </Grid>
                    : null
                }
                {/*----------notes-----------*/}
                <Grid item xs={12} md={12}>
                  <Typography>Notes:</Typography>
                  <PrimaryTextField
                    sx={{
                      marginTop: '.5rem'
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
                    placeholder='Enter the notes' />
                </Grid>
              </Grid>
            </Box>
          }

          <PrimaryButton
            sx={{
              mt: '2rem',
              padding: '.5rem 2rem'
            }}
            onClick={handleUpdate}
          >
            Update
          </PrimaryButton>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}
