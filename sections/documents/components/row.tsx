import * as React from 'react'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { KeyboardArrowDown, KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material'
import { TDocumentRowType } from '@interfaces/types'
import RowApproval from '@components/multi-media/common/approval-item'
import { Button, Typography } from '@mui/material'
import { TResDocument } from '@interfaces/apis/api.types'
import DocumentSubrow from './subrow'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { apiGetDocumentContentDetails } from '@interfaces/apis/documents'
import { openSnackbarError, openSnackbarWarning } from '@store/reducers/snackbar/reducers'
import { openDocumentApproval } from '@store/reducers/dialog/reducers'
import { EDocumentApprovalDlg, EProcessingStatus } from '@interfaces/enums'
import RowStatus from '@components/multi-media/common/status-item'
import { openMediaSubDrawer } from '@store/reducers/drawer/reducers'
import { setRefreshSubDoc } from '@store/reducers/api/reducers'
import { useTranslate } from '../../../locales'

function DocumentRow(props: {
  row: TDocumentRowType
  rowIndex?: number
}) {

  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const { row } = props
  const dispatch = useDispatch()
  const { t, i18n } = useTranslate()


  const [vState, setState] = React.useState<{
    openSummary: boolean
    rowDetails?: TResDocument.TDocumentContentDetail
  }>({
    openSummary: false,
    rowDetails: null
  })


  useEffect(() => {
    setState(prevState => {
      return { ...prevState, openSummary: false }
    })
  }, [appState.pagination.pageIndex])


  const fetchDetails = async () => {
    const documentContent = appState.api.data[props.rowIndex]
    let documentDetails = null
    try {
      documentDetails = (await apiGetDocumentContentDetails(documentContent.Id))
    } catch (e) {
      await Promise.reject(e)
    }
    if (documentDetails?.data?.GptResponse?.length == 0) {
      dispatch(openSnackbarWarning('This document has no topics'))
      return
    }
    setState(prevState => ({
      ...prevState,
      rowDetails: documentDetails.data,
      openSummary: !prevState.openSummary
    }))
    return documentDetails
  }


  const handleDetail = async () => {
    if (vState.openSummary) {
      setState(prevState => {
        return { ...prevState, openSummary: !prevState.openSummary }
      })
    } else {
      try {
        await fetchDetails()
      } catch (e) {
        console.error(e)
        dispatch(openSnackbarError('Get error, while fetching document details'))
        return
      }

    }
  }

  /*eslint-disable*/
  useEffect(() => {
    if (vState.openSummary && props.rowIndex === appState.drawer.rowIndex) {
      (async () => {
        try {
          const resDetails = await fetchDetails()
          dispatch(openMediaSubDrawer({ drawerData: resDetails.data }))
          setState(prevState => ({ ...prevState, openSummary: true }))
        } catch (e) {
          console.error(e)
          return
        }
        dispatch(setRefreshSubDoc(false))
      })()
    }
  }, [appState.api.refreshSubDoc])
/*eslint-enable*/

  const rowActions = [
    // { title: 'Classification' },
    // { title: 'Reports' },
    {
      title: t(`rowActions.approval`),
      action: () => dispatch(openDocumentApproval({
        type: EDocumentApprovalDlg.document,
        docIndex: props.rowIndex
      }))
    }
  ]

  const isArabic = i18n.language === 'ar'

  return (
    <React.Fragment>
      {/*-------main row-----------*/}
      <TableRow
        sx={{
          '& > .MuiTableCell-root': {
            '&:first-of-type': {
              borderBottomLeftRadius: vState.openSummary
                ? '0px !important'
                : '10px',
              '& .MuiSvgIcon-root' : {
                marginLeft: '0px !important',
              }
            },
            '&:last-of-type': {
              borderBottomRightRadius: vState.openSummary
                ? '0px !important'
                : '10px'
            }
          }
        }}
      >
        <TableCell>
          {row.processingStatus === EProcessingStatus.processed && <IconButton
            aria-label='expand row'
            size='small'
            onClick={handleDetail}
          >
            {vState.openSummary ? <KeyboardArrowDown sx={{
              fontSize: '1.2rem'
            }} /> : isArabic ? <KeyboardArrowLeft sx={{ fontSize: '1.2rem' }} /> :
            <KeyboardArrowRight sx={{ fontSize: '1.2rem', marginLeft: '0' }} />}
          </IconButton>}
        </TableCell>

        <TableCell sx={{ minWidth: '200px', maxWidth: '250px' }}>
          <Typography
            sx={{
              margin: 0,
              whiteSpace: 'wrap',
              fontSize: '0.875rem',
              overflow: 'hidden'
            }}
          >
            {row.name}
          </Typography>
        </TableCell>

        {/*<TableCell>*/}
        {/*  <RowType type={row.type}></RowType>*/}
        {/*</TableCell>*/}

        <TableCell>
          <RowStatus status={row.processingStatus}></RowStatus>
        </TableCell>

        <TableCell>
          <Typography className={'text-capitalize text-8'}>
            {t(row.language.toLowerCase())}
          </Typography>
        </TableCell>

        <TableCell>
          <Box className={'item-left approval'}>
            <RowApproval approval={row.moderator_approval}></RowApproval>
          </Box>
        </TableCell>
        <TableCell>
          <Box className={'item-left approval'}>
            <RowApproval approval={row.ai_approval}></RowApproval>
          </Box>
        </TableCell>
        <TableCell>
          <Typography
            sx={{
              margin: 0,
              whiteSpace: 'wrap',
              fontSize: '0.875rem',
              overflow: 'hidden'
            }}
          >
            {row.submissionDate}
          </Typography>
        </TableCell>
        <TableCell>
          {/*<RowAction actions={rowActions} />*/}
          {row.processingStatus === EProcessingStatus.processed ? <Button
            sx={{
              backgroundColor: 'var(--Primary1)',
              padding: '2px 10px',
              minWidth: '40px',
              color: '#fff',
              fontSize: '.7rem',
              '&:hover': {
                backgroundColor: '#4fc1d7'
              },
              textTransform:'capitalize !important'
            }}
            // onClick={() => props.handlePageNum(val.pageNumber, questionIndex)}
            onClick={rowActions[0].action}
          >
            {rowActions[0].title}
          </Button>:
            <Typography sx={{fontSize:'.7rem'}} className='text-capitalize'>{t('processing')}</Typography>
          }
        </TableCell>
      </TableRow>

      {/*---------sub common--------*/}
      <TableRow className='media-row'>
        <TableCell
          style={{
            border: 'none'
          }}
          sx={{ p: 0 }}
          colSpan={12}
        >
          <Collapse in={vState.openSummary} timeout='auto' unmountOnExit>
            <DocumentSubrow rowDetails={vState.rowDetails} rowIndex={props.rowIndex}></DocumentSubrow>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default DocumentRow
