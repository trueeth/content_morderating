import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {
  KeyboardArrowDown,
  KeyboardArrowRight,
  KeyboardArrowLeft,
} from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import RowApproval from '@components/multi-media/common/approval-item';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '@store/index';
import { IAppSlice } from '@store/reducers';
import {
  apiGetDocumentContentDetails,
} from '@interfaces/apis/documents';
import {
  openSnackbarError,
  openSnackbarWarning,
} from '@store/reducers/snackbar/reducers';
import {
  openDocumentApproval,
} from '@store/reducers/dialog/reducers';
import { setRefreshSubDoc } from '@store/reducers/api/reducers';
import { useTranslate } from '../../../locales';
import DocumentSubrow from './subrow';
import RowStatus from '@components/multi-media/common/status-item'
import { EDocumentApprovalDlg, EProcessingStatus } from '@interfaces/enums'
import { openMediaSubDrawer } from '@store/reducers/drawer/reducers'


function DocumentRow(props) {
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app);
  const { row } = props;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslate();

  const [vState, setState] = useState({
    openSummary: false,
    rowDetails: null,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, openSummary: false }));
  }, [appState.pagination.pageIndex]);

  const fetchDetails = async () => {
    const documentContent = appState.api.data[props.rowIndex];
    try {
      const documentDetails = await apiGetDocumentContentDetails(
        documentContent.Id
      );

      if (documentDetails?.data?.GptResponse?.length === 0) {
        dispatch(openSnackbarWarning('This document has no topics'));
        return;
      }

      setState((prevState) => ({
        ...prevState,
        rowDetails: documentDetails.data,
        openSummary: !prevState.openSummary,
      }));

      return documentDetails;
    } catch (e) {
      await Promise.reject(e);
    }
  };

  const handleDetail = async () => {
    if (vState.openSummary) {
      setState((prevState) => ({
        ...prevState,
        openSummary: !prevState.openSummary,
      }));
    } else {
      try {
        await fetchDetails();
      } catch (e) {
        console.error(e);
        dispatch(
          openSnackbarError('Get error while fetching document details')
        );
      }
    }
  };

  /*eslint-disable*/
  useEffect(() => {
    if (vState.openSummary && props.rowIndex === appState.drawer.rowIndex) {
      (async () => {
        try {
          const resDetails = await fetchDetails();
          dispatch(openMediaSubDrawer({ drawerData: resDetails.data }));
          setState((prevState) => ({ ...prevState, openSummary: true }));
        } catch (e) {
          console.error(e);
          return;
        }
        dispatch(setRefreshSubDoc(false));
      })();
    }
  }, [appState.api.refreshSubDoc]);
  /*eslint-enable*/

  const rowActions = [
    {
      title: t('rowActions.approval'),
      action: () =>
        dispatch(
          openDocumentApproval({
            type: EDocumentApprovalDlg.document,
            docIndex: props.rowIndex,
          })
        ),
    },
  ];

  const isArabic = i18n.language === 'ar';

  return (
    <React.Fragment>
      <TableRow
        sx={{
          '& > .MuiTableCell-root': {
            '&:first-of-type': {
              borderBottomLeftRadius: vState.openSummary
                ? '0px !important'
                : '10px',
              '& .MuiSvgIcon-root': {
                marginLeft: '0px !important',
              },
            },
            '&:last-of-type': {
              borderBottomRightRadius: vState.openSummary
                ? '0px !important'
                : '10px',
            },
          },
        }}
      >
        <TableCell>
          {row.processingStatus === EProcessingStatus.processed && (
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={handleDetail}
            >
              {vState.openSummary ? (
                <KeyboardArrowDown sx={{ fontSize: '1.2rem' }} />
              ) : isArabic ? (
                <KeyboardArrowLeft sx={{ fontSize: '1.2rem' }} />
              ) : (
                <KeyboardArrowRight
                  sx={{ fontSize: '1.2rem', marginLeft: '0' }}
                />
              )}
            </IconButton>
          )}
        </TableCell>

        <TableCell sx={{ minWidth: '200px', maxWidth: '250px' }}>
          <Typography
            sx={{
              margin: 0,
              whiteSpace: 'wrap',
              fontSize: '0.875rem',
              overflow: 'hidden',
            }}
          >
            {row.name}
          </Typography>
        </TableCell>
        <TableCell>
          <RowStatus status={row.processingStatus}></RowStatus>
        </TableCell>

        <TableCell>
          <Typography className={'text-capitalize text-8'}>
            {t(row.language.toLowerCase())}
          </Typography>
        </TableCell>

        <TableCell>
          <Box className={'item-left approval'}>
            <RowApproval approval={row.moderator_approval}></RowApproval>
          </Box>
        </TableCell>
        <TableCell>
          <Box className={'item-left approval'}>
            <RowApproval approval={row.ai_approval}></RowApproval>
          </Box>
        </TableCell>
        <TableCell>
          <Typography
            sx={{
              margin: 0,
              whiteSpace: 'wrap',
              fontSize: '0.875rem',
              overflow: 'hidden',
            }}
          >
            {row.submissionDate}
          </Typography>
        </TableCell>
        <TableCell>
          {row.processingStatus === EProcessingStatus.processed ? (
            <Button
              sx={{
                backgroundColor: 'var(--Primary1)',
                padding: '2px 10px',
                minWidth: '40px',
                color: '#fff',
                fontSize: '.7rem',
                '&:hover': {
                  backgroundColor: '#4fc1d7',
                },
                textTransform: 'capitalize !important',
              }}
              onClick={rowActions[0].action}
            >
              {rowActions[0].title}
            </Button>
          ) : (
            <Typography sx={{ fontSize: '.7rem' }} className='text-capitalize'>
              {t('processing')}
            </Typography>
          )}
        </TableCell>
      </TableRow>
      <TableRow className='media-row'>
        <TableCell
          style={{
            border: 'none',
          }}
          sx={{ p: 0 }}
          colSpan={12}
        >
          <Collapse in={vState.openSummary} timeout='auto' unmountOnExit>
            <DocumentSubrow
              rowDetails={vState.rowDetails}
              rowIndex={props.rowIndex}
            ></DocumentSubrow>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default DocumentRow;
