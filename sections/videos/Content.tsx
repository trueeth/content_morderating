import React, { useState } from 'react'
import MediaTable from '@components/multi-media/table.tsx'
import { EMediaType, EVideoColumn } from '@interfaces/enums'
import VideoRow from '@sections/videos/videoRow/TableRow'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import useMount from '@hooks/useMount'
import { apiGetMediaContents } from '@interfaces/apis/videos'
import {
  setPageinit,
  setPaginationTotalCount
} from '@store/reducers/page/reducers'
import { setApiData } from '@store/reducers/api/reducers'
import { TResVideo } from '@interfaces/apis/videos.types'
import { TVideoRowType } from '@interfaces/types'
import mappingResToVideoRow from '@interfaces/apis/mapping/video-row'

export default function Content() {
  const [vState, setState] = useState<{
    mediaContents: TResVideo.getMediaContents
    rows: TVideoRowType[]
  }>({
    mediaContents: {},
    rows: []
  })

  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  useMount(() => {
    ;(async () => {
      dispatch(setPageinit())

      const tempContents: any = await apiGetMediaContents()
      if (tempContents != undefined) {
        let tempRows = mappingResToVideoRow(tempContents)

        const videoContents = tempContents.Content?.filter(
          (val) => val.MediaType === EMediaType.video
        )

        dispatch(setPaginationTotalCount({ totalCount: videoContents.length }))
        setState({ ...vState, mediaContents: videoContents, rows: tempRows })
      }
      dispatch(setApiData({ data: tempContents }))
    })()
  })

  return (
    <MediaTable headerColumn={EVideoColumn}>
      {vState.rows
        .filter((val, index) => {
          let pageIndex = appState.pagination.pageIndex
          let pageSize = appState.pagination.pageSize
          let result = (pageIndex - 1) * pageSize < index
          result = result && pageIndex * pageSize >= index
          return result
        })
        .map((row, index) => (
          <VideoRow
            key={index}
            row={row}
            videoContent={vState.mediaContents[index]}
          />
        ))}
    </MediaTable>
  )
}
