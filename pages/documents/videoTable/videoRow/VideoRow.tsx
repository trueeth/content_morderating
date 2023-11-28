import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material'
import { TVideoRowType, TVideoSubRowType } from '@/interfaces/types'
import RowType from '@/components/multi-media/RowType'
import RowStatus from '@/components/multi-media/RowStatus'
import RowRating from '@/components/multi-media/RowRating'
import RowClassification from '@/components/multi-media/RowClassification'
import RowApproval from '@/components/multi-media/RowApproval'
import RowFlaggedScenes from '@/components/multi-media/RowFlaggedScenes'
import RowAction from '@/components/multi-media/RowAction'
import VideoSubTable from './DetailRow'
import { Typography } from '@mui/material'
import { format, parseISO } from 'date-fns'
import { apiGetVideoScenes } from '@/interfaces/apis/videos'
import { TResVideo } from '@/interfaces/apis/videos.types'
import { EViolationType } from '@/interfaces/enums'

const mappingResSubRow = (res: TResVideo.TVideoSummary[]) => {
  const tempRes = res
  let result: TVideoSubRowType[] = []
  if (tempRes.length > 0) {
    result = tempRes.map((value, index) => {
      let tempResult: TVideoSubRowType = {}
      tempResult.sceneNumber = (index + 1) * 3
      tempResult.category = 'Content Document'
      tempResult.description =
        'Later, Muhammad bin Abdulaziz is appointed Crown Prince and assumes many tasks and responsibilities in the government.'

      let vioRand = Math.floor(Math.random() * 5) + 1
      if (vioRand > 2) tempResult.violationType = EViolationType.saudi
      else tempResult.violationType = EViolationType.religion
      return tempResult
    })
  }
  return result
}

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

  const handleDetail = async () => {
    if (vState.subRow.length > 0) {
      if (vState.openSummary) setState({ ...vState, openSummary: false })
      else setState({ ...vState, openSummary: true })
    } else {
      const videoSummaries: any = await apiGetVideoScenes(videoContent)
      if (videoSummaries) {
        let tempSubRow = mappingResSubRow(videoSummaries.Content)
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
          <RowType type={row.type}></RowType>
        </TableCell>

        <TableCell>
          <RowStatus status={row.status}></RowStatus>
        </TableCell>

        {/* <TableCell>
          <RowRating rating={row.rating}></RowRating>
        </TableCell> */}

        {/* <TableCell>
          <Box className={'flex'}>
            <RowClassification
              classifications={row.classification}
            ></RowClassification>
          </Box>
        </TableCell> */}

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
            {format(parseISO(row.submissionDate), 'MM/dd/yyyy hh:mm:ss a')}
          </Box>
        </TableCell>

        <TableCell>
          <RowFlaggedScenes
            value={row.flaggedScenes ? row.flaggedScenes : 0}
          ></RowFlaggedScenes>
        </TableCell>

        <TableCell>
          <RowAction></RowAction>
        </TableCell>
      </TableRow>

      {/*---------sub rows--------*/}
      <TableRow>
        <TableCell
          style={{
            border: 'none'
          }}
          sx={{ p: 0 }}
          colSpan={12}
        >
          <Collapse in={vState.openSummary} timeout="auto" unmountOnExit>
            <VideoSubTable
              subRows={vState.subRow}
              summaries={vState.subRowSummaries}
              row={row}
            ></VideoSubTable>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default VideoRow
