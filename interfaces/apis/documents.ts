import request from '@interfaces/apis/base-api/request'
import { TResDocument } from '@interfaces/apis/api.types'

export const apiGetDocumentContents = (params?: object) => {
  return request.get<TResDocument.TDocumentContents>('analysis/documents', { params: params })
}

export const apiGetDocumentContentDetails = (documentId: string) => {
  return request.get<TResDocument.TDocumentContentDetail>('analysis/documents/' + documentId)
}

export const apiUpdateApprovalDocument = (urlConfig?: any, params?:object) => {
  return request.post<any>(`analysis/documents/${urlConfig.documentId}/approval`, params)
}


export const apiUpdateApprovalDocQuestion = (urlConfig?: any, params?:object) => {
  return request.post<any>(`analysis/documents/${urlConfig.documentId}/topics/${urlConfig.topicId}/questions/${urlConfig.questionId}/approval`, params)
}

export const apiUpdateApprovalDocPage = (urlConfig?: any, params?:object) => {
  return request.post<any>(`analysis/documents/${urlConfig.documentId}/topics/${urlConfig.topicId}/questions/${urlConfig.questionId}/pages/${urlConfig.pageNumber}/approval`, params)
}

