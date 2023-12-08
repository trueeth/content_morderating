import * as React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  Typography
} from '@mui/material';
import useTablePagination from '@hooks/use-table-pagination';
import MediaDrawer from '@components/multi-media/drawer';
import { TDocumentRowType, TVideoRowType } from '@interfaces/types';
import { IReduxState } from '@store/index';
import { IAppSlice } from '@store/reducers';
import { EDocumentColumn, EMediaType, EVideoColumn } from '@interfaces/enums';
import VideoRow from '@sections/videos/components/row';
import DocumentRow from '@sections/documents/components/row';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resToVideoRowAdapter } from '@interfaces/apis/data-adapter/data-video';
import { apiGetVideoContents } from '@interfaces/apis/videos';
import { setPaginationTotalCount } from '@store/reducers/page/reducers';
import { setApiData, setApiError, setApiLoading } from '@store/reducers/api/reducers';
import { apiGetDocumentContents } from '@interfaces/apis/documents';

// MediaWrapper component
interface IMediaProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

export const MediaWrapper = (props: IMediaProps) => {
  const { CustomPagination } = useTablePagination();

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        boxShadow: '0px 0px 25px 0px #F3F3F3;',
        borderRadius: '.4rem',
        border: '1px solid var(--Stroke, #E8E8E8)',
        overflow: 'hidden',
        mt: 1
      }}
    >
      {props.header}
      <Box
        mt={2}
        sx={{
          width: '100%',
          minHeight: '60vh'
        }}
      >
        {props.content}
      </Box>
      <CustomPagination />
      <MediaDrawer />
    </Box>
  );
};

// MediaActionwrapper component
interface IActionPros {
  type: 'video' | 'document';
}

export const MediaActionwrapper = (props: IActionPros) => {
  const [vState, setState] = useState<{
    rows: (TVideoRowType | TDocumentRowType)[];
  }>({
    rows: []
  });

  const dispatch = useDispatch();
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app);

  const take = appState.pagination.pageSize;
  const data = appState.api.data;
  const skip = appState.pagination.pageSize * (appState.pagination.pageIndex - 1);

  useEffect(() => {
    // Fetch data when component mounts or pagination change
    (async () => {
      try {
        dispatch(setApiLoading(true));

        // Choose the correct API function based on the media type
        const apiFunction = props.type === 'video' ? apiGetVideoContents : apiGetDocumentContents;

        const resData = await apiFunction({ '$take': take, '$skip': skip });

        if (resData.data !== null) {
          // Update pagination information and API data
          dispatch(setPaginationTotalCount(resData.data.TotalCount));
          dispatch(setApiData(resData.data.Content));

          // Adapt API response data and update local state
          const mappingRows = resToVideoRowAdapter(resData.data.Content);
          setState(prevState => ({ ...prevState, rows: mappingRows }));
        } else {
          // No data available
          setState(prevState => ({ ...prevState, rows: [] }));
        }
      } catch (e) {
        // Handle API error
        console.error("Error of getContents:", e);
        dispatch(setApiError(e));
        setState(prevState => ({ ...prevState, rows: [] }));
      }
    })();
  }, [dispatch, take, skip, props.type]);

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: '15px', px: 2, boxShadow: 'none' }}
    >
      <Table
        aria-label='collapsible table'
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none'
          },
          borderSpacing: '0 0.3rem',
          borderCollapse: 'separate'
        }}
      >
        {/* TableHead */}
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.values(
              props.type === 'video' ? EVideoColumn : EDocumentColumn
            ).map((item, index) => (
              <TableCell key={index}>
                <Typography
                  sx={{
                    padding: 0,
                    whiteSpace: 'wrap',
                    fontSize: '12px',
                    color: '#888',
                    maxWidth: '70px'
                  }}
                >
                  {item}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* TableBody */}
        <TableBody>
          {vState.rows.map((row, index) => (
            // Render VideoRow or DocumentRow based on the media type
            props.type === 'video' ? (
              <VideoRow key={index} row={row as TVideoRowType} rowIndex={index} />
            ) : (
              <DocumentRow key={index} row={row as TDocumentRowType} />
            )
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
