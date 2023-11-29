import React, { useEffect, useState } from 'react'
import MediaTable from '@components/multi-media/table'
import { EDocumentColumn, EMediaType, EVideoColumn } from '@interfaces/enums'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { apiGetMediaContents } from '@interfaces/apis/videos'
import {
  setPageinit,
  setPaginationTotalCount
} from '@store/reducers/page/reducers'
import { setApiData } from '@store/reducers/api/reducers'
import { TResVideo } from '@interfaces/apis/videos.types'
import { TDocumentRowType, TVideoRowType } from '@interfaces/types'
import mappingResToVideoRow from '@interfaces/apis/mapping/video-row'
import VideoRow from '@sections/videos/components/row'
import DocumentRow from '@sections/documents/components/row'
import mappingResToDocumentRow from '@interfaces/apis/mapping/document-row'

interface IPros {
  type: 'video' | 'document'
}

export default function MediaTablewrapper(props: IPros) {
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
    <MediaTable
      headerColumn={props.type == 'video' ? EVideoColumn : EDocumentColumn}
    >
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
        })}
    </MediaTable>
  )
}
