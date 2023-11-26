import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material'
import { TVideoRowType } from '../../../../interfaces'
import RowType from './RowType'
import RowStatus from './RowStatus'
import RowRating from './RowRating'
import RowClassification from './RowClassification'
import RowApproval from './RowApproval'
import RowFlaggedScenes from './RowFlaggedScenes'
import RowAction from './RowAction'
import VideoSubTable from './DetailRow'
import { Typography } from '@mui/material'
import {format, parseISO} from 'date-fns'
import { openVideoSubDrawer } from '../../../../store/reducers/drawer.reducers'
import { useDispatch } from 'react-redux'

function VideoRow(props: { row: TVideoRowType }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const dispatch=useDispatch()
  const handleDetail = () => {
    dispatch(openVideoSubDrawer({ open: true }))
  }

  return (
    <React.Fragment>
      {/*-------main row-----------*/}
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open)
              handleDetail()
            }}
          >
            {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
          </IconButton>
        </TableCell>

        <TableCell sx={{ minWidth: '200px' ,maxWidth:'250px', }}><Typography sx={{margin:0, whiteSpace:'wrap', fontSize:'0.875rem', overflow:'hidden'}}>{row.name}</Typography></TableCell>

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
          <Box className={'flex'} maxWidth={'100px'}>{format(parseISO(row.submissionDate),'MM/dd/yyyy hh:mm:ss a')}</Box>
        </TableCell>

        <TableCell>
          <Box className={'flex justify-center item-center approval'}>
            <RowApproval approval={row.approval}></RowApproval>
          </Box>
        </TableCell>

        <TableCell>
          <RowFlaggedScenes value={row.flaggedScenes?row.flaggedScenes:0 }></RowFlaggedScenes>
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
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <VideoSubTable value={row.subRows}></VideoSubTable>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default VideoRow
