import request from '@interfaces/apis/base-api/request'
import { TResVideo } from '@interfaces/apis/api.types'


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
    params.videoId +
    '/analyses/' +
    '/process'
  )
}
