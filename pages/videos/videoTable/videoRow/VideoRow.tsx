import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material'
import { TVideoRowType, TVideoSubRowType } from '../../../../interfaces'
import RowType from './RowType'
import RowStatus from './RowStatus'
import RowRating from './RowRating'
import RowClassification from './RowClassification'
import RowApproval from './RowApproval'
import RowFlaggedScenes from './RowFlaggedScenes'
import RowAction from './RowAction'
import VideoSubTable from './DetailRow'
import { Typography } from '@mui/material'
import { format, parseISO } from 'date-fns'
import { openVideoSubDrawer } from '../../../../store/reducers/drawer.reducers'
import { useDispatch } from 'react-redux'
import { apiGetVideoScenes } from '../../../../interfaces/apis/videos'
import { TResVideo } from '../../../../interfaces/apis/videos.types'

const mappingResSubRow = (res: TResVideo.TVideoSummary[]) => {
  const tempRes = res
  let result: TVideoSubRowType[] = []
  if (tempRes.length > 0) {
    result = tempRes.map((value, index) => {
      let tempResult: TVideoSubRowType = {}
      tempResult.sceneNumber = index + 1
      tempResult.category = 'Nudity'
      tempResult.description = ''
      tempResult.violationType = value.ViolenceSeverity
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
  }>({ openSummary: false, subRow: [] })

  const handleDetail = async () => {
    if (vState.subRow.length > 0) {
      if (vState.openSummary) setState({ ...vState, openSummary: false })
      else setState({ ...vState, openSummary: true })
    } else {
      const videoSummaries: any = await apiGetVideoScenes(videoContent)
      if (videoSummaries) {
        let tempSubRow = mappingResSubRow(videoSummaries.Content)
        tempSubRow = tempSubRow.filter((val, index) => index < 5)
        setState({ ...vState, openSummary: true, subRow: tempSubRow })
      }
    }
  }

  return (
    <React.Fragment>
      {/*-------main row-----------*/}
      <TableRow>
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
          <Box className={'flex'} maxWidth={'100px'}>
            {format(parseISO(row.submissionDate), 'MM/dd/yyyy hh:mm:ss a')}
          </Box>
        </TableCell>

        <TableCell>
          <Box className={'flex justify-center item-center approval'}>
            <RowApproval approval={row.approval}></RowApproval>
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
            paddingBottom: 5,
            paddingTop: 5,
            marginLeft: 20,
            border: 'none'
          }}
          colSpan={12}
        >
          <Collapse in={vState.openSummary} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <VideoSubTable value={vState.subRow}></VideoSubTable>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default VideoRow
