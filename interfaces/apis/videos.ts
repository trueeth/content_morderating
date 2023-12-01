import request from '@interfaces/apis/base-api/request'
import { TResVideo } from './videos.types'

export const apiGetMediaContents = () => {
  return request.get<TResVideo.getMediaContents>('analysis/media')
}

export const apiGetVideoScenes = (mediaContent: TResVideo.TMeidaContent) => {
  return request.get<TResVideo.apiGetVideoScenes>(
    'analysis/media/' +
      mediaContent.Id +
      '/videos/' +
      mediaContent.Videos[0]?.Id +
      '/summaries/' +
      mediaContent.Videos[0]?.VideoSummaries[0]?.Id +
      '/scenes/summaries'
  )
}
