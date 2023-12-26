import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import useTablePagination from '@hooks/use-table-pagination'
import MediaDrawer from '@components/multi-media/drawer'
import { TDocumentRowType, TVideoRowType } from '@interfaces/types'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { EDocumentColumn, EVideoColumn } from '@interfaces/enums'
import VideoRow from '@sections/videos/components/row'
import DocumentRow from '@sections/documents/components/row'
import { useDispatch, useSelector } from 'react-redux'
import { resToVideoRowAdapter } from '@interfaces/apis/data-adapter/data-video'
import { apiGetVideoContents } from '@interfaces/apis/videos'
import { setPaginationTotalCount } from '@store/reducers/page/reducers'
import { setApiData, setApiError, setApiLoading, setRefresh, setRefreshSubDoc } from '@store/reducers/api/reducers'
import { apiGetDocumentContents } from '@interfaces/apis/documents'
import { resToDocumentRowAdapter } from '@interfaces/apis/data-adapter/data-document'
import DocumentApprovalDlg from '@components/dialog/document-approval-dlg'
import VideoApprovalDlg from '@components/dialog/video-approval-dlg'
import { useTranslate } from '../../locales'

interface IMediaProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

export const MediaWrapper = (props: IMediaProps) => {
  const { CustomPagination } = useTablePagination()


  return (
    <Box
      sx={{
        backgroundColor: 'white',
        boxShadow: '0px 0px 25px 0px #F3F3F3;',
        borderRadius: '.4rem',
        border: '1px solid var(--Stroke, #E8E8E8)',
        overflow: 'hidden',
        mt: 1,
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
      <DocumentApprovalDlg />
      <VideoApprovalDlg />
    </Box>
  )
}

interface IActionPros {
  type: 'video' | 'document';
}

export const MediaActionwrapper = (props: IActionPros) => {
  const [vState, setState] = useState<{
    rows: (TVideoRowType | TDocumentRowType)[];
  }>({
    rows: []
  })

  const { t } = useTranslate()

  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const take = appState.pagination.pageSize
  const refresh = appState.api.refresh
  const skip = appState.pagination.pageSize * (appState.pagination.pageIndex - 1)

  const fetchPageData = async () => {
    try {
      dispatch(setApiLoading(true))

      const apiFunction = props.type === 'video' ? apiGetVideoContents : apiGetDocumentContents

      const resData = await apiFunction({ '$take': take, '$skip': skip, '$orderbyexpression': 'UploadedOnUtc desc' })

      if (resData.data !== null) {
        dispatch(setPaginationTotalCount(resData.data.TotalCount))
        dispatch(setApiData(resData.data.Content))

        let mappingRows = []
        let resToRowAdapter = props.type === 'video' ? resToVideoRowAdapter : resToDocumentRowAdapter

        mappingRows = resToRowAdapter(resData.data.Content)

        setState(prevState => ({ ...prevState, rows: mappingRows }))
      } else {
        setState(prevState => ({ ...prevState, rows: [] }))
      }
    } catch (e) {
      console.error('Error of getContents:', e)
      dispatch(setApiError(e))
      setState(prevState => ({ ...prevState, rows: [] }))
    } finally {
      dispatch(setRefresh(false))
      if (props.type!=='video')
      dispatch(setRefreshSubDoc(undefined))
    }
  }
  /* eslint-disable */
  useEffect(() => {
    fetchPageData()
  }, [dispatch, take, skip, props.type])

  useEffect(() => {
    if (refresh)
      fetchPageData()
  }, [refresh])
  /* eslint-enable */

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
          borderCollapse: 'separate',
          px: '0rem'
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.values(
              props.type === 'video' ? EVideoColumn : EDocumentColumn
            ).map((item, index) => {
              return (
                <TableCell key={index} sx={{ padding: '8px'}}>
                  <Typography
                    sx={{
                      padding: 0,
                      whiteSpace: 'wrap',
                      fontSize: '12px',
                      color: '#808080',
                      fontWeight: '500 !important'
                    }}
                    className='text-uppercase'
                  >
                    {t(`column.${item.toLowerCase()}`)}
                  </Typography>
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {vState.rows.map((row, index) => (
            props.type === 'video' ? (
              <VideoRow key={index} row={row as TVideoRowType} rowIndex={index} />
            ) : (
              <DocumentRow key={index} row={row as TDocumentRowType} rowIndex={index} />
            )
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
