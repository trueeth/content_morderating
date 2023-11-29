import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material'
import { TVideoRowType, TVideoSubRowType } from '@interfaces/types'
import TowType from '@components/multi-media/common/type-item'
import RowStatus from '@components/multi-media/common/status-item'
import RowRating from '@components/multi-media/common/rating-item'
import RowClassification from '@components/multi-media/common/classification-item'
import RowApproval from '@components/multi-media/common/approval-item'
import RowFlaggedscenes from '@components/multi-media/common/flaggedscenes-item'
import RowAction from '@components/multi-media/common/action-item'
import VideoSubtable from './subtable'
import { Typography } from '@mui/material'
import { format, parseISO } from 'date-fns'
import { apiGetVideoScenes } from '@interfaces/apis/videos'
import { TResVideo } from '@interfaces/apis/videos.types'
import mappingResVideoSubRow from '@interfaces/apis/mapping/video-sub-row'

function VideoRow(props: {
  row: TVideoRowType
  videoContent: TResVideo.TMeidaContent
}) {
  const { row, videoContent } = props

  const [vState, setState] = React.useState<{
    openSummary: boolean
    subRow: TVideoSubRowType[]
    subRowSummaries: TResVideo.TMeidaSummaries[]
  }>({ openSummary: false, subRow: [], subRowSummaries: [] })

  const rowActions = [
    { title: 'Classification' },
    { title: 'Reports' },
    { title: 'Insights' }
  ]

  const handleDetail = async () => {
    if (vState.subRow.length > 0) {
      if (vState.openSummary) setState({ ...vState, openSummary: false })
      else setState({ ...vState, openSummary: true })
    } else {
      const videoSummaries: any = await apiGetVideoScenes(videoContent)
      if (videoSummaries) {
        let tempSubRow = mappingResVideoSubRow(videoSummaries.Content)
        tempSubRow = tempSubRow.filter((val, index) => index < 5)
        setState({
          ...vState,
          openSummary: true,
          subRow: tempSubRow,
          subRowSummaries: videoSummaries.Content
        })
      }
    }
  }

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
            aria-label="expand row"
            size="small"
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
          <RowStatus status={row.status}></RowStatus>
        </TableCell>

        <TableCell>
          <RowRating rating={row.rating}></RowRating>
        </TableCell>

        <TableCell>
          <Box className={'flex'}>
            <RowClassification
              classifications={row.classification}
            ></RowClassification>
          </Box>
        </TableCell>

        <TableCell>
          <Box className={'flex justify-center item-center approval'}>
            <RowApproval approval={row.moderator_approval}></RowApproval>
          </Box>
        </TableCell>
        <TableCell>
          <Box className={'flex justify-center item-center approval'}>
            <RowApproval approval={row.ai_approval}></RowApproval>
          </Box>
        </TableCell>
        <TableCell>
          <Box className={'flex'} maxWidth={'100px'}>
            {row.submissionDate !== null
              ? format(parseISO(row.submissionDate), 'MM/dd/yyyy hh:mm:ss a')
              : ''}
          </Box>
        </TableCell>

        <TableCell>
          <RowFlaggedscenes
            value={row.flaggedScenes ? row.flaggedScenes : 0}
          ></RowFlaggedscenes>
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
          <Collapse in={vState.openSummary} timeout="auto" unmountOnExit>
            <VideoSubtable
              subRows={vState.subRow}
              summaries={vState.subRowSummaries}
              row={row}
            ></VideoSubtable>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default VideoRow
