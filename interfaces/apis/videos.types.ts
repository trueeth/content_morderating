import {
  EApporval,
  EClassificationType,
  EMediaType,
  EModeratorApprovalStatus,
  EProcessingStatus,
  ERating, ESeverity
} from '../enums'
import { apiGetVideoScenes } from './videos'

export declare namespace TReqVideo {

  type getMediaContents = {}

}

export declare namespace TResVideo {

  type getMediaContents = {
    Content?: TMeidaContent[],
    PageSize?: number,
    TotalCount?: number
  }

  type apiGetVideoScenes = {
    Content?: TMeidaSummaries[],
    PageSize?: number,
    TotalCount?: number
  }

  type TMeidaContent = {
    Id: string,
    Name?: string,
    Description?: string,
    Documents?: [],
    MediaSourceId?: string,
    MediaType?: EMediaType,
    ModeratorApprovalStatus?: EModeratorApprovalStatus,
    Notes?: string,
    Videos?: TVideoContent[]
  }

  type TVideoContent = {
    AIClassification?: EClassificationType,
    AIClassificationEndTime?: string,
    AIClassificationStartTime?: string,
    AIClassificationStatus?: string,
    AzureIndexerEndTime?: string,
    AzureIndexerStartTime?: string,
    AzureIndexerStatus?: string,
    AzureIndexerVideoId?: string,
    Duration?: number,
    FileName?: string,
    Fragments?: [],
    FrameAnalyticsStatus?: string,
    FramEClassificationTypeEndTime?: string,
    FramEClassificationTypeStartTime?: string,
    FrameExractionStartTime?: string,
    FrameExractionEndTime?: string,
    FrameExractionStatus?: string,
    FrameRate?: number,
    Id: string,
    InternalVideoPath?: string,
    MediaId?: string,
    ModeratorApprovalStatus?: EModeratorApprovalStatus,
    ModeratorClassification?: EClassificationType,
    OriginalFileName?: string,
    ProcessingStatusPercentage?: string,
    SaveToCosmosEndTime?: string,
    SaveToCosmosStartTime?: string,
    SaveToCosmosStatus?: string,
    Status?: EProcessingStatus,
    TranscripClassificationEndTime?: string,
    TranscripClassificationStartTime?: string,
    TranscripGenerationEndTime?: string,
    TranscripGenerationStartTime?: string,
    TranscripGenerationStatus?: string,
    UploadedOnUtc?: string,
    VersionNumber?: string,
    VideoSummaries?: TVideoSummary[],
  }

  type TVideoSummary = {
    AdulScore?: number,
    AutomaticApprovalStatus?: EApporval,
    HateServerity?: string,
    Id: string,
    IndexerVideoId?: number,
    InvalidatedOnUtc?: string,
    ModeratorApprovalStatus?: EModeratorApprovalStatus,
    ModeratorNotes?: string,
    ModeratorScore?: string,
    NumberOfFlaggedBrands?: number,
    NumberOfFlaggedKeywords?: number,
    NumberOfFlaggedLabels?: number,
    NumberOfFlaggedNamedLocations?: number,
    NumberOfFlaggedNamedPersons?: number,
    NumberOfFlaggedObjects?: number,
    NumberOfFlaggedTopics?: number,
    NumberOfFragments?: number,
    NumberOfOcrs?: number,
    OnModeratorModifiedUtc?: string,
    RacyScore?: number,
    Rating?: ERating,
    SceneSummaries?: [],
    SelfHarmSeverity?: string,
    SexualSeverity?: string,
    SimpleUserId?: string,
    VideoId?: string,
    ViolenceSeverity?: string,
  }

  type TMeidaSummaries = {
    AdultScore: number
    AutomaticApprovalStatus: EModeratorApprovalStatus
    HateSeverity:ESeverity
    Id: string
    IndexerSceneId: number
    ModeratorApprovalStatus: EModeratorApprovalStatus
    ModeratorNotes: string
    ModeratorScore: string
    NumberOfFlaggedBrands: number
    NumberOfFlaggedKeywords: number
    NumberOfFlaggedLabels: number
    NumberOfFlaggedNamedLocations: number
    NumberOfFlaggedNamedPersons: number
    NumberOfFlaggedObjects: number
    NumberOfFlaggedTopics: number
    NumberOfFragments: number
    NumberOfOcrs: number
    OnModeratorModifiedUtc: string
    RacyScore: string
    Rating: ERating
    SceneStart: string
    SelfHarmSeverity: ESeverity
    SexualSeverity: ESeverity
    SimpleUserId: string
    VideoSummaryId: string
    ViolenceSeverity: ESeverity
  }

}
