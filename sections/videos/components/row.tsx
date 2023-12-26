import * as React from 'react'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { TVideoRowType } from '@interfaces/types'
import RowStatus from '@components/multi-media/common/status-item'
import RowRating from '@components/multi-media/common/rating-item'
import RowApproval from '@components/multi-media/common/approval-item'
import RowAction from '@components/multi-media/common/action-item'
import VideoSubtable from './subtable'
import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { useRouter } from 'next/navigation'
import { openVideoApproval } from '@store/reducers/dialog/reducers'
import { EProcessingStatus } from '@interfaces/enums'
import { useTranslate } from '../../../locales'

function VideoRow(props: {
  row: TVideoRowType,
  rowIndex: number
}) {

  const [vState, setState] = React.useState<{
    openSummary: boolean
  }>({ openSummary: false })

  const router = useRouter()

  const { t, i18n } = useTranslate()

  const dispatch = useDispatch()

  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  useEffect(() => {
    setState(prevState => ({ ...prevState, openSummary: false }))
  }, [appState.pagination.pageIndex])

  const handleDetail = () => {
    if (props.row.subRows.length > 0) {
      setState(prevState => ({ ...prevState, openSummary: !prevState.openSummary }))
    }
  }

  const rowActions = [
    {
      title: t(`rowActions.insight`),
      action: () => router.push(`/videos/${appState.api.data[props.rowIndex].Id}`)
    },
    {
      title: t('rowActions.approval'),
      action: () => dispatch(openVideoApproval({ rowIndex: props.rowIndex }))
    }
  ]

  const isArabic = i18n.language === 'ar'

  return (
    <React.Fragment>
      <TableRow
        sx={{
          '& > .MuiTableCell-root': {
            '&:first-of-type': {
              borderBottomLeftRadius: vState.openSummary ? '0px !important' : '10px',
              '& .MuiSvgIcon-root': {
                marginLeft: '0px !important'
              }
            },
            '&:last-of-type': {
              borderBottomRightRadius: vState.openSummary ? '0px !important' : '10px'
            }
          }
        }}
      >
        <TableCell>
          {props.row.subRows.length > 0 ?
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={handleDetail}
            >
              {vState.openSummary ? <KeyboardArrowDown sx={{
                fontSize: '1.2rem'
              }} /> : isArabic ? <KeyboardArrowLeft sx={{ fontSize: '1.2rem' }} /> :
                <KeyboardArrowRight sx={{ fontSize: '1.2rem' }} />}
            </IconButton> :
            null}
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
            {props.row.name}
          </Typography>
        </TableCell>
        <TableCell><RowStatus status={props.row.status}></RowStatus></TableCell>
        <TableCell><RowRating rating={props.row.rating}></RowRating></TableCell>
        <TableCell>
          <Box className='flex'>
            {
              props.row.classificationString.length>0?(

                <Typography sx={{fontSize:'.8rem'}} className='text-capitalize'>
                  {props.row.classificationString.map(item=>t(`violence-classification.${item}`)).join(", ")}
                </Typography>
              ):
                <Typography sx={{fontSize:'.7rem', color:'#00000091'}} className='text-capitalize' >
                  {t('not assigned')}
                </Typography>
            }

          </Box>
        </TableCell>
        <TableCell><Box className={'approval'}><RowApproval
          approval={props.row.moderator_approval}></RowApproval></Box></TableCell>
        <TableCell><Box className={'approval'}><RowApproval
          approval={props.row.ai_approval}></RowApproval></Box></TableCell>
        <TableCell><Box minWidth={'180px'}>{props.row.submissionDate}</Box></TableCell>
        <TableCell>
          {
            props.row.status === EProcessingStatus.processed ?
              <RowAction actions={rowActions} /> :
              <Typography sx={{ fontSize: '.7rem' }} className='text-capitalize'> {t('processing')} </Typography>
          }
        </TableCell>
      </TableRow>
      <TableRow className='media-row'>
        <TableCell
          style={{
            border: 'none',
            padding: '0 !important'
          }}
          colSpan={12}
        >
          <Collapse in={vState.openSummary} timeout='auto' unmountOnExit>
            <VideoSubtable rows={props.row.subRows} rowIndex={props.rowIndex}></VideoSubtable>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default VideoRow
