import request from '@interfaces/apis/base-api/request'
import { TResDocument, TResVideo } from '@interfaces/apis/api.types'

export const apiGetDocumentContents = (params?:object) => {
  return request.get<TResDocument.TDocumentContents>('analysis/documents', { params:params })
}

