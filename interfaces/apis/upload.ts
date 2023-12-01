import request from '@interfaces/apis/base-api/request'
import { TResVideo } from '@interfaces/apis/videos.types'

export declare namespace TReqUpload {
  type TGetUploadId = {
    Description?: string
    Documents?: any
    Id?: string
    MediaSourceId?: string
    MediaType?: string
    ModeratorApprovalStatus?: string
    Name?: string
    Notes?: string
    Videos?: any
  }
}

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
export const apiGetUploadMediaId = (params: TReqUpload.TGetUploadId) => {
  return request.post('analysis/media', params)
}

export const apiUploadVideo = (params: any, formData: FormData, options) => {
  return request.post<TResVideo.TVideoContent>(
    'analysis/media/' +
      params.Id +
      '/videos/' +
      params.Videos[0]?.Id +
      '/upload',
    formData,
    options
  )
}
