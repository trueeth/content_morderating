import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import { TVideoRowType } from '@interfaces/types';
import TowType from '@components/multi-media/common/type-item';
import RowStatus from '@components/multi-media/common/status-item';
import RowRating from '@components/multi-media/common/rating-item';
import RowClassification from '@components/multi-media/common/classification-item';
import RowApproval from '@components/multi-media/common/approval-item';
import RowFlaggedscenes from '@components/multi-media/common/flaggedscenes-item';
import RowAction from '@components/multi-media/common/action-item';
import VideoSubtable from './subtable';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { IReduxState } from '@store/index';
import { IAppSlice } from '@store/reducers';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function VideoRow(props: {
  row: TVideoRowType,
  rowIndex: number
}) {

  const [vState, setState] = React.useState<{
    openSummary: boolean
  }>({ openSummary: false });

  const router = useRouter();

  // app state
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app);

  // To reset the openSummary state when pageIndex changes
  useEffect(() => {
    setState(prevState => ({ ...prevState, openSummary: false }));
  }, [appState.pagination.pageIndex]);

  // Handler openSummary state
  const handleDetail = () => {
    if (props.row.subRows.length > 0) {
      setState(prevState => ({ ...prevState, openSummary: !prevState.openSummary }));
    }
  };

  // Actions to be displayed for each row
  const rowActions = [
    // { title: 'Classification' },
    // { title: 'Reports' },
    {
      title: 'Insights',
      action: () => router.push(`/videos/${appState.api.data[props.rowIndex].Id}`)
    }
  ];

  return (
    <React.Fragment>
      {/* Main row */}
      <TableRow
        sx={{
          '& > .MuiTableCell-root': {
            '&:first-of-type': {
              borderBottomLeftRadius: vState.openSummary ? '0px !important' : '10px'
            },
            '&:last-of-type': {
              borderBottomRightRadius: vState.openSummary ? '0px !important' : '10px'
            }
          }
        }}
      >
        {/* Expand/Collapse button */}
        <TableCell>
          {props.row.subRows.length>0?
            <IconButton
            aria-label='expand row'
            size='small'
            onClick={handleDetail}
        >
          {vState.openSummary ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
        </IconButton>:
            null}
        </TableCell>

        {/* Name cell */}
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

        {/* Type, Status, Rating, Classification, Approvals, Submission Date, Flagged Scenes, Actions */}
        <TableCell><TowType type={props.row.type}></TowType></TableCell>
        <TableCell><RowStatus status={props.row.status}></RowStatus></TableCell>
        <TableCell><RowRating rating={props.row.rating}></RowRating></TableCell>
        <TableCell>
          <Box className={'flex'}>
            <RowClassification classifications={props.row.classification}></RowClassification>
          </Box>
        </TableCell>
        <TableCell><Box className={'flex justify-center item-center approval'}><RowApproval approval={props.row.moderator_approval}></RowApproval></Box></TableCell>
        <TableCell><Box className={'flex justify-center item-center approval'}><RowApproval approval={props.row.ai_approval}></RowApproval></Box></TableCell>
        <TableCell><Box className={'flex'} maxWidth={'100px'}>{props.row.submissionDate}</Box></TableCell>
        {/* <TableCell><RowFlaggedscenes value={props.row.flaggedScenes ? props.row.flaggedScenes : 0}></RowFlaggedscenes></TableCell> */}
        <TableCell><RowAction actions={rowActions} /></TableCell>
      </TableRow>

      {/* Subrow */}
      <TableRow>
        <TableCell
          style={{
            border: 'none'
          }}
          sx={{ p: 0 }}
          colSpan={12}
        >
          {/* Subtable */}
          <Collapse in={vState.openSummary} timeout='auto' unmountOnExit>
            <VideoSubtable rows={props.row.subRows} rowIndex={props.rowIndex}></VideoSubtable>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default VideoRow;
