import request from '@interfaces/apis/base-api/request'
import { TResDocument, TResVideo } from '@interfaces/apis/api.types'


export declare namespace TResUpload {
  type getMediaSources = {
    Content: TMediaSource[]
    PageSize: number
    TotalCount: number
  }

  type TMediaSource = {
    Name: string
    Id: string
    Description: string
  }
}

export const apiGetMediaSourceItems = () => {
  return request.get<TResUpload.getMediaSources>('application/media-sources')
}

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

