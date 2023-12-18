import request from '@interfaces/apis/base-api/request'
import { TResVideo } from './api.types'

export const apiGetVideoContents = (params?:object) => {
  return request.get<TResVideo.TVideoContents>('analysis/videos', { params:params })
}

export const apiUpdateVideoSceneSummary = (urlParam?:any,params?:any) => {
  return request.post('analysis/videos/' +urlParam?.videoId+
    '/scenes/'+urlParam.summaryId+
    '/approval', params)
}

export const apiGetVideoAnalysesSearch = (videoId?:string) => {
  return request.get<TResVideo.TVideoAnalysisSearchResult>(`analysis/videos/${videoId}/analyses/search`)
}

export const apiGetVideoAnalysesStreamUrl = (videoId?: string | string[]) => {
  return request.get<TResVideo.TVideoAnalysisStreamingUrl>(`analysis/videos/${videoId}/analyses/streaming-url`)
}

export const apiGetVideoAnalysesWidgetPlayer = (videoId?: string | string[]) => {
  return request.get<{ Url:string }>(`analysis/videos/${videoId}/analyses/widget/player`)
}

export const apiGetVideoAnalysesWidgetInsight = (videoId?: string | string[]) => {
  return request.get<{Url:string}>(`analysis/videos/${videoId}/analyses/widget/insights`)
}

export const apiGetVideoAnalysesAccessToken = (videoId?: string | string[]) => {
  return request.get<{accessToken:string}>(`analysis/videos/${videoId}/analyses/access-token`)
}

export const apiUpdateApprovalVideoSummary = (urlConfig?: any, params?:object) => {
  return request.post<any>(`analysis/videos/${urlConfig.videoId}/approval`, params)
}


