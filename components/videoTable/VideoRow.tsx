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
import { ERating, EStatus, EVideoType, TVideoRowType } from '../../interfaces'
import { Icon } from '@mui/material'
import { Slideshow } from '@mui/icons-material'


const RowType=(props:{type:number})=>{
  if(props.type===EVideoType.video){
    return(
      <React.Fragment>
        <Box sx={{ display: 'flex' }}>
          <Slideshow />
          Video
        </Box>
      </React.Fragment>
    )
  }
}

const RowStatus=(props: { status:number })=>{
  if(props.status===EStatus.new){
    return(
      <React.Fragment>
        <Box className={'status-new'}>
          new
        </Box>
      </React.Fragment>
    )
  } else if(props.status===EStatus.failed){
    return(
      <React.Fragment>
        <Box className={'status-failed'}>
          failed
        </Box>
      </React.Fragment>
    )
  } else if(props.status===EStatus.processed){
    return(
      <React.Fragment>
        <Box className={'status-processed'}>
          processed
        </Box>
      </React.Fragment>
    )
  }
}


const RowRating=(props: { rating:number })=>{
  if(props.rating===ERating.r18){
    return(
      <React.Fragment>
        <Box className={'rating-r18'}>
          r18
        </Box>
      </React.Fragment>
    )
  } else if(props.rating===ERating.missing){
    return(
      <React.Fragment>
        <Box className={'rating-missing'}>
          missing
        </Box>
      </React.Fragment>
    )
  }
}


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

        </TableRow>

        {/*---------sub rows--------*/}
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/*{row.subRows.map((historyRow) => (*/}
                    {/*  <TableRow key={historyRow.date}>*/}
                    {/*    <TableCell component="th" scope="row">*/}
                    {/*      {historyRow.date}*/}
                    {/*    </TableCell>*/}
                    {/*    <TableCell>{historyRow.customerId}</TableCell>*/}
                    {/*    <TableCell align="right">{historyRow.amount}</TableCell>*/}
                    {/*    <TableCell align="right">*/}
                    {/*      {Math.round(historyRow.amount * row.price * 100) / 100}*/}
                    {/*    </TableCell>*/}
                    {/*  </TableRow>*/}
                    {/*))}*/}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  export default VideoRow;