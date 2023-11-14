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

function VideoRow(props: { row: TVideoRowType }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      {/*-------main row-----------*/}
      <TableRow
        sx={{
          '& > .MuiTableCell-root': {
            textAlign: 'center',
            borderTop: '1px solid #ccc',
            borderBottom: '1px solid #ccc',
            '&:first-of-type': {
              borderLeft: '1px solid #ccc',
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
            },
            '&:last-of-type': {
              borderRight: '1px solid #ccc',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
            },
          },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
          </IconButton>
        </TableCell>

        <TableCell sx={{ minWidth: '200px' }}>{row.name}</TableCell>

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
          <div className={'flex'}>
            <RowClassification
              classifications={row.classification}
            ></RowClassification>
          </div>
        </TableCell>

        <TableCell>
          <div className={'flex'}>{row.submissionDate}</div>
        </TableCell>

        <TableCell>
          <div className={'flex justify-center item-center approval'}>
            <RowApproval approval={row.approval}></RowApproval>
          </div>
        </TableCell>

        <TableCell>
          <RowFlaggedScenes value={row.flaggedScenes}></RowFlaggedScenes>
        </TableCell>

        <TableCell>
          <RowAction></RowAction>
        </TableCell>
      </TableRow>

      {/*---------sub rows--------*/}
      <TableRow>
        <TableCell
          style={{ paddingBottom: 5, paddingTop: 5, marginLeft: 20 }}
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
