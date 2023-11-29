import React, { useState } from 'react'
import MediaTable from '@components/multi-media/table.tsx'
import { EDocumentColumn, EMediaType } from '@interfaces/enums'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import useMount from '@hooks/useMount'
import { apiGetMediaContents } from '@interfaces/apis/videos'
import { setPageinit, setPaginationTotalCount } from '@store/reducers/page/reducers'
import { setApiData } from '@store/reducers/api/reducers'
import { TResVideo } from '@interfaces/apis/videos.types'
import { TDocumentRowType } from '@interfaces/types'
import mappingResToDocumetRow from '@interfaces/apis/mapping/document-row'
import DocumentRow from '@sections/documents/documentRow/DocumentRow'

export default function Content() {



  const [vState, setState] = useState<{
    mediaContents: TResVideo.getMediaContents
    rows: TDocumentRowType[]
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

        let tempRows = mappingResToDocumetRow(tempContents)

        const documentContents = tempContents.Content?.filter(
          (val) => val.MediaType === EMediaType.document
        )

        dispatch(setPaginationTotalCount({ totalCount: documentContents.length }))

        setState({ ...vState, mediaContents: documentContents, rows: tempRows })
      }
      dispatch(setApiData({ data: tempContents }))
    })()
  })

  return (
    <MediaTable headerColumn={EDocumentColumn}>
      {vState.rows
        .filter((val, index) => {
          let pageIndex = appState.pagination.pageIndex
          let pageSize = appState.pagination.pageSize
          let result = (pageIndex - 1) * pageSize < index
          result = result && pageIndex * pageSize >= index
          return result
        })
        .map((row, index) => (
          <DocumentRow
            key={index}
            row={row}
            documentContent={vState.mediaContents[index]}
          />
        ))}
    </MediaTable>
  )
}
