import request from '../baseApi/request'
import { date } from 'yup'
import {
  EApporval,
  ERating,
  EProcessingStatus,
  EMediaType,
  EModeratorApprovalStatus,
  EClassificationType
} from '../enums'


export declare namespace TReqVideo{

  type getMediaContents={
  }

}

export declare namespace TResVideo{

  type getMediaContents={
    Content?:TMeidaContent[],
    PageSize?:number,
    TotalCount?:number
  }

  type TMeidaContent={
    Id:string,
    Name?:string,
    Description?:string,
    Documents?:[],
    MediaSourceId?:string,
    MediaType?:EMediaType,
    ModeratorApprovalStatus?:EModeratorApprovalStatus,
    Notes?:string,
    Videos?:TVideoContent[]
  }

  type TVideoContent={
    AIClassification?:EClassificationType,
    AIClassificationEndTime?:string,
    AIClassificationStartTime?:string,
    AIClassificationStatus?:string,
    AzureIndexerEndTime?:string,
    AzureIndexerStartTime?:string,
    AzureIndexerStatus?:string,
    AzureIndexerVideoId?:string,
    Duration?:number,
    FileName?:string,
    Fragments?:[],
    FrameAnalyticsStatus?:string,
    FramEClassificationTypeEndTime?:string,
    FramEClassificationTypeStartTime?:string,
    FrameExractionStartTime?:string,
    FrameExractionEndTime?:string,
    FrameExractionStatus?:string,
    FrameRate?:number,
    Id:string,
    InternalVideoPath?:string,
    MediaId?:string,
    ModeratorApprovalStatus?:EModeratorApprovalStatus,
    ModeratorClassification?:EClassificationType,
    OriginalFileName?:string,
    ProcessingStatusPercentage?:string,
    SaveToCosmosEndTime?:string,
    SaveToCosmosStartTime?:string,
    SaveToCosmosStatus?:string,
    Status?:EProcessingStatus,
    TranscripClassificationEndTime?:string,
    TranscripClassificationStartTime?:string,
    TranscripGenerationEndTime?:string,
    TranscripGenerationStartTime?:string,
    TranscripGenerationStatus?:string,
    UploadedOnUtc?:string,
    VersionNumber?:string,
    VideoSummaries?:TVideoSummary[],
  }

 type TVideoSummary={
    AdulScore?:number,
    AutomaticApprovalStatus?:EApporval,
    HateServerity?:string,
    Id:string,
    IndexerVideoId?:string,
    InvalidatedOnUtc?:string,
    ModeratorApprovalStatus?:EModeratorApprovalStatus,
    ModeratorNotes?:string,
    ModeratorScore?:string,
    NumberOfFlaggedBrands?:number,
    NumberOfFlaggedKeywords?:number,
    NumberOfFlaggedLabels?:number,
    NumberOfFlaggedNamedLocations?:number,
    NumberOfFlaggedNamedPersons?:number,
    NumberOfFlaggedObjects?:number,
    NumberOfFlaggedTopics?:number,
    NumberOfFragments?:number,
    NumberOfOcrs?:number,
    OnModeratorModifiedUtc?:string,
    RacyScore?:number,
    Rating?:ERating,
    SceneSummaries?:[],
    SelfHarmSeverity?:string,
    SexualSeverity?:string,
    SimpleUserId?:string,
    VideoId?:string,
    ViolenceSeverity?:string,
 }

}


export const apiGetMediaContents = () => {
  return request.get<TResVideo.getMediaContents>('analysis/media')
}
