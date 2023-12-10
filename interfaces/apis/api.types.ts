import { EApporval, EMediaRating, EModeratorApprovalStatus, EProcessingStatus } from '@interfaces/enums'

export declare namespace TReqVideo {

}

export declare namespace TResVideo {

  type TVideoContents = {
    Content?: TVideoContent[],
    PageSize?: number,
    TotalCount?: number
  }

  type TVideoContent = {
    AIClassification?: EMediaRating
    AiClassificationEndTime?: string
    AiClassificationStartTime?: string
    AiClassificationStatus?: EProcessingStatus
    AzureIndexerEndTime?: string
    AzureIndexerStartTime?: string
    AzureIndexerStatus?: EProcessingStatus
    AzureIndexerVideoId?: string
    Classification?: any
    Description?: string
    Duration?: number
    FileName?: string
    FrameAnalyticsStatus?: EProcessingStatus
    FrameClassificationEndTime?: string
    FrameClassificationStartTime?: string
    FrameExractionEndTime?: string
    FrameExractionStartTime?: string
    FrameExtractionStatus?: string
    FrameRate?: number
    Id?: string
    InternalVideoPath?: string
    MediaSourceId?: string
    ModeratorApprovalStatus?: EModeratorApprovalStatus
    ModeratorClassification?: EMediaRating
    Name?: string
    Notes?: string
    OriginalFileName?: string
    ProcessingStatusPercentage?: string
    SaveToCosmosEndTime?: string
    SaveToCosmosStartTime?: string
    SaveToCosmosStatus?: EProcessingStatus
    Status?: EProcessingStatus
    TranscripClassificationEndTime?: string
    TranscripClassificationStartTime?: string
    TranscriptAnalyticsStatus?: EProcessingStatus
    TranscriptGenerationEndTime?: string
    TranscriptGenerationStartTime?: string
    TranscriptGenerationStatus?: EProcessingStatus
    UploadedOnUtc?: string
    VersionNumber?: number
    VideoSummary?: TVideoSummary
  }


  type TVideoSummary = {
    AdultScore?: number
    AutomaticApprovalStatus?: string
    HateSeverity?: string
    Id?: string
    IndexerVideoId?: string
    InvalidatedOnUtc?: string
    ModeratorApprovalStatus?: string
    ModeratorNotes?: string
    NumberOfFlaggedBrands?: number
    NumberOfFlaggedKeywords?: number
    NumberOfFlaggedLabels?: number
    NumberOfFlaggedNamedLocations?: number
    NumberOfFlaggedNamedPersons?: number
    NumberOfFlaggedObjects?: number
    NumberOfFlaggedTopics?: number
    NumberOfFragments?: number
    NumberOfOcrs?: number
    OnModeratorModifiedUtc?: string
    RacyScore?: number
    Rating?: EMediaRating
    SceneSummaries?: TVideoSceneSummary[]
    SelfHarmSeverity?: string
    SexualSeverity?: string
    SimpleUserId?: string
    VideoId?: string
    ViolenceSeverity?: string
  }

  type TVideoSceneSummary = {
    AdultScore?: number
    AutomaticApprovalStatus?: string
    HateSeverity?: string
    Id?: string
    IndexerSceneId?: number
    ModeratorApprovalStatus?: string
    ModeratorNotes?: string
    NumberOfFlaggedBrands?: number
    NumberOfFlaggedKeywords?: number
    NumberOfFlaggedLabels?: number
    NumberOfFlaggedNamedLocations?: number
    NumberOfFlaggedNamedPersons?: number
    NumberOfFlaggedObjects?: number
    NumberOfFlaggedTopics?: number
    NumberOfFragments?: number
    NumberOfOcrs?: number
    OnModeratorModifiedUtc?: string
    RacyScore?: number
    Rating?: string
    SceneStart?: string
    SelfHarmSeverity?: string
    SexualSeverity?: string
    SimpleUserId?: string
    VideoSummaryId?: string
    ViolenceSeverity?: string
  }

  type TVideoAnalysisSearchResult = {
    results: TVideoAnalysisResult[],
    nextPage: {
      pageSize: number,
      skip: number,
      done: boolean
    }
  }

  type TVideoAnalysisResult = {
    accountId: string,
    id: string,
    partition: string,
    externalId: string,
    metadata: string,
    name: string,
    description: string,
    created: string,
    lastModified: string,
    lastIndexed: string,
    PrivacyMode: string,
    userName: string,
    isOwned: true,
    isBase: true,
    State: string,
    ModerationState: string,
    ReviewState: string,
    processingProgress: string,
    durationInSeconds: number,
    thumbnailVideoId: string,
    thumbnailId: string,
    social: {
      likedByUser: true,
      likes: number,
      views: number
    },
    searchMatches: [
      {
        startTime: string,
        type: string,
        text: string,
        exactText: string
      }
    ],
    indexingPreset: string,
    streamingPreset: string,
    sourceLanguage: string,
    sourceLanguages: [
      string
    ],
    personModelId: string,
    animationModelId: string,
    logoGroupId: string
  }

  type TVideoAnalysisStreamingUrl = {
    url:string,
    jwt:string,
  }


}

export declare namespace TResDocument {

  type TDocumentContents = {
    Content?: TDocumentContent[],
    PageSize?: number,
    TotalCount?: number
  }

  type TDocumentContent = {}

}
