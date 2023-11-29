'use client'

import * as React from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material'
import useTablePagination from '@hooks/useTablePagination'
import MediaDrawer from '@components/multi-media/drawer'
import { TResVideo } from '@interfaces/apis/videos.types'
import { TDocumentRowType, TVideoRowType } from '@interfaces/types'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { setPageinit, setPaginationTotalCount } from '@store/reducers/page/reducers'
import { apiGetMediaContents } from '@interfaces/apis/videos'
import mappingResToVideoRow from '@interfaces/apis/mapping/video-row'
import { EDocumentColumn, EMediaType, EVideoColumn } from '@interfaces/enums'
import mappingResToDocumentRow from '@interfaces/apis/mapping/document-row'
import { setApiData } from '@store/reducers/api/reducers'
import VideoRow from '@sections/videos/components/row'
import DocumentRow from '@sections/documents/components/row'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface IMediaProps {
  header: React.ReactNode
  content: React.ReactNode
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
  )
}



interface IActionPros {
  type: 'video' | 'document'
}



export  function MediaActionwrapper(props: IActionPros) {
  const [vState, setState] = useState<{
    mediaContents: TResVideo.getMediaContents
    rows: (TVideoRowType | TDocumentRowType)[]
  }>({
    mediaContents: {},
    rows: []
  })

  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  useEffect(() => {
    ;(async () => {
      dispatch(setPageinit())

      const tempContents: any = await apiGetMediaContents()
      if (tempContents != undefined) {
        if (props.type == 'video') {
          let tempRows = mappingResToVideoRow(tempContents)

          const videoContents = tempContents.Content?.filter(
            (val) => val.MediaType === EMediaType.video
          )

          dispatch(
            setPaginationTotalCount({ totalCount: videoContents.length })
          )
          setState({ ...vState, mediaContents: videoContents, rows: tempRows })
        } else {
          let tempRows = mappingResToDocumentRow(tempContents)

          const documentContents = tempContents.Content?.filter(
            (val) => val.MediaType === EMediaType.document
          )

          dispatch(
            setPaginationTotalCount({ totalCount: documentContents.length })
          )

          setState({
            ...vState,
            mediaContents: documentContents,
            rows: tempRows
          })
        }
      }
      dispatch(setApiData({ data: tempContents }))
    })()
  }, [props])

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: '15px', px: 2, boxShadow: 'none' }}
    >
      <Table
        aria-label="collapsible table"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none'
          },
          borderSpacing: '0 0.3rem',
          borderCollapse: 'separate'
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.values(props.type == 'video' ? EVideoColumn : EDocumentColumn).map((item, index) => (
              <TableCell
                key={index}
                sx={{
                  whiteSpace: 'wrap',
                  fontSize: '12px',
                  color: '#888',
                  maxWidth: '70px'
                }}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vState.rows
            .filter((val, index) => {
              let pageIndex = appState.pagination.pageIndex
              let pageSize = appState.pagination.pageSize
              let result = (pageIndex - 1) * pageSize < index
              result = result && pageIndex * pageSize >= index
              return result
            })
            .map((row, index) => {
              if (props.type == 'video')
                return (
                  <VideoRow
                    key={index}
                    row={row}
                    videoContent={vState.mediaContents[index]}
                  />
                )
              else
                return (
                  <DocumentRow
                    key={index}
                    row={row}
                    documentContent={vState.mediaContents[index]}
                  />
                )
            })}</TableBody>
      </Table>
    </TableContainer>
  )
}

