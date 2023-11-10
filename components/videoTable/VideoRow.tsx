import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { EApporval, EClassification, ERating, EStatus, EVideoType, TVideoRowType } from '../../interfaces'
import RowType from './videoRows/RowType'
import RowStatus from './videoRows/RowStatus'
import RowRating from './videoRows/RowRating'
import RowClassification from './videoRows/RowClassification'
import RowApproval from './videoRows/RowApproval'
import RowFlaggedScenes from './videoRows/RowFlaggedScenes'
import RowAction from './videoRows/RowAction'
import VideoSubTable from './VideoSubTable'




function VideoRow(props: { row: TVideoRowType }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);



    return (
      <React.Fragment>
        {/*-------main row-----------*/}
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
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
            <div className={'flex'}>

            <RowClassification classifications={row.classification}></RowClassification>
            </div>
          </TableCell>

          <TableCell>
            <div className={'flex'}>
              {row.submissionDate}
            </div>
          </TableCell>

          <TableCell >
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
          <TableCell style={{ paddingBottom: 5, paddingTop: 5, marginLeft:20 }} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
               <VideoSubTable value={row.subRows}></VideoSubTable>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  export default VideoRow;