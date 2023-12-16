import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material'
import { TDocumentRowType } from '@interfaces/types'
import RowApproval from '@components/multi-media/common/approval-item'
import RowAction from '@components/multi-media/common/action-item'
import { Button, Typography } from '@mui/material'
import { TResDocument } from '@interfaces/apis/api.types'
import DocumentSubrow from './subrow'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { useEffect } from 'react'
import { apiGetDocumentContentDetails } from '@interfaces/apis/documents'
import { openSnackbarError, openSnackbarWarning } from '@store/reducers/snackbar/reducers'
import { openDocumentApproval } from '@store/reducers/dialog/reducers'
import { EDocumentApprovalDlg } from '@interfaces/enums'

function DocumentRow(props: {
  row: TDocumentRowType
  rowIndex?: number
}) {

  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const { row } = props
  const dispatch = useDispatch()


  const [vState, setState] = React.useState<{
    openSummary: boolean
    rowDetails?: TResDocument.TDocumentContentDetail
  }>({ openSummary: false, rowDetails: null })


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
    return documentDetails
  }


  const handleDetail = async () => {
    if (vState.openSummary) {
      setState(prevState => {
        return { ...prevState, openSummary: !prevState.openSummary }
      })
    } else {
      let documentDetails = null
      try {
        documentDetails = await fetchDetails()
      } catch (e) {
        console.error(e)
        dispatch(openSnackbarError('Get error, while fetching document details'))
        return;
      }
      if (documentDetails.data?.GptResponse?.length==0){
        dispatch(openSnackbarWarning("Sorry, there isn't any Document's GptResponses!"))
        return;
      }
      setState(prevState => ({
        ...prevState,
        rowDetails: documentDetails.data,
        openSummary:!prevState.openSummary
      }))
    }
  }


  const rowActions = [
    // { title: 'Classification' },
    // { title: 'Reports' },
    {
      title: 'Reports',
      action:()=>dispatch(openDocumentApproval({
        type:EDocumentApprovalDlg.document,
        docIndex:props.rowIndex
      })),
    }
  ]

  return (
    <React.Fragment>
      {/*-------main row-----------*/}
      <TableRow
        sx={{
          '& > .MuiTableCell-root': {
            '&:first-of-type': {
              borderBottomLeftRadius: vState.openSummary
                ? '0px !important'
                : '10px'
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
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={handleDetail}
          >
            {vState.openSummary ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowRight />
            )}
          </IconButton>
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
          <Box className={'flex'} maxWidth={'100px'}>
            {row.processingStatus}
          </Box>
        </TableCell>

        <TableCell>
          <Box className={'flex'} maxWidth={'100px'}>
            {row.language}
          </Box>
        </TableCell>

        <TableCell>
          <Box className={'flex item-center approval'}>
            <RowApproval approval={row.moderator_approval}></RowApproval>
          </Box>
        </TableCell>
        <TableCell>
          <Box className={'flex item-center approval'}>
            <RowApproval approval={row.ai_approval}></RowApproval>
          </Box>
        </TableCell>
        <TableCell>
          <Box className={'flex'} maxWidth={'100px'}>
            {row.submissionDate}
          </Box>
        </TableCell>
        <TableCell>
          {/*<RowAction actions={rowActions} />*/}
          <Button
            sx={{
              backgroundColor: 'var(--Primary1)',
              padding: '2px 10px',
              minWidth: '40px',
              color: '#fff',
              fontSize:'.7rem',
              '&:hover': {
                backgroundColor: '#4fc1d7'
              }
            }}
            // onClick={() => props.handlePageNum(val.pageNumber, questionIndex)}
            onClick={rowActions[0].action}
          >
            {rowActions[0].title}
          </Button>
        </TableCell>
      </TableRow>

      {/*---------sub common--------*/}
      <TableRow>
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
