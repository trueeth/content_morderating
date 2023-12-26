import request from '@interfaces/apis/base-api/request'
import { TResDocument, TResVideo } from '@interfaces/apis/api.types'

type TUploadInfo=  TResVideo.TVideoContent & {
  ModeratorNotes?: string,
  Rating?:string,
}

export const apiGetUploadMediaId = (params: TUploadInfo) => {
  return request.post<TResVideo.TVideoContent>('analysis/videos', params)
}

export const apiUploadVideo = (params: any, formData: FormData, options) => {
  return request.post<TResVideo.TVideoContent>(
    'analysis/videos/' +
    params.Id +
    '/upload',
    formData,
    options
  )
}

export const apiUploadedVideoProcess = (params: any) => {
  return request.post<TResVideo.TVideoContent>(
    'analysis/videos/' +
    params +
    '/analyses/process'
  )
}

export const apiUploadDocument = (params:any, options)=>{
  return request.post<TResDocument.TDocumentContent>('analysis/documents', { ...params },options)
}


export const apiUploadDocumentProcess = (params:any)=>{
  return request.post<TResDocument.TDocumentContent>(
    'analysis/documents/' +
    params +
    '/analyses/transcribe'
  )
}
