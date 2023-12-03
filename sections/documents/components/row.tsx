import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material'
import { TDocumentRowType, TDocumentSubRowType } from '@interfaces/types'
import TowType from '@components/multi-media/common/type-item'
import RowApproval from '@components/multi-media/common/approval-item'
import RowAction from '@components/multi-media/common/action-item'
import { Typography } from '@mui/material'
import { format, parseISO } from 'date-fns'
import { TResVideo } from '@interfaces/apis/videos.types'
import DocumentSubrow from './subrow'
import mappingResDocumentSubRow from '@interfaces/apis/mapping/document-sub-row'
import { useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { useEffect } from 'react'

function DocumentRow(props: {
  row: TDocumentRowType
  documentContent: TResVideo.TMeidaContent
}) {

  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const { row, documentContent } = props

  const [vState, setState] = React.useState<{
    openSummary: boolean
    subRow: TDocumentSubRowType[]
    subRowSummaries: TResVideo.TDocumentAICunk[]
  }>({ openSummary: false, subRow: [], subRowSummaries: [] })


  useEffect(() => {
    setState(prevState => {
      return { ...prevState, openSummary: false }
    })
  }, [appState.pagination.pageIndex])

  const handleDetail = async () => {
    if (vState.subRow.length > 0) {
     setState(prevState => {
       return {...prevState, openSummary:!prevState.openSummary}
     })
    } else {
      const documentSummaries: any =
        documentContent?.Documents[0]?.DocumentChunks[0]?.AIChunkResponses
      if (documentSummaries) {
        let tempSubRow = mappingResDocumentSubRow(documentSummaries)
        tempSubRow = tempSubRow.filter((val, index) => index < 5)
        setState({
          ...vState,
          openSummary: true,
          subRow: tempSubRow,
          subRowSummaries: documentSummaries
        })
      }
    }
  }


  const rowActions = [
    { title: 'Classification' },
    { title: 'Reports' },
    { title: 'Insights' }
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

        <TableCell>
          <TowType type={row.type}></TowType>
        </TableCell>

        <TableCell>
          <Box className={'flex'} maxWidth={'100px'}>
            {row.submittedBy}
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
            {row.submissionDate !== null && row.submissionDate !== ''
              ? format(parseISO(row.submissionDate), 'MM/dd/yyyy hh:mm:ss a')
              : ''}
          </Box>
        </TableCell>
        <TableCell>
          <RowAction actions={rowActions} />
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
            <DocumentSubrow subRows={vState.subRow} row={row}></DocumentSubrow>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default DocumentRow
