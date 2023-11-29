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
    Documents?: TDocumentContent[],
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



  type TDocumentContent = {
    CompletionTokens : number
    CreateLanguageProjectEndTime : string
    CreateLanguageProjectStartTime : string
    CreateLanguageProjectStatus : string
    CreateSearchIndexEndTime : string
    CreateSearchIndexStartTime : string
    CreateSearchIndexStatus : string
    DocumentBytes : string
    DocumentChunks : TDocumentCunk[]
    DocumentSummarizationEndTime : string
    DocumentSummarizationStartTime : string
    DocumentSummarizationStatus : number
    DocumentUrl : string
    EstimatedTokens : 0
    FileName : string
    Id : string
    Language : string
    MediaId : string
    ModeratorApprovalStatus : string
    ModeratorNotes : any
    ModeratorResponseJson : any
    OpenAIAnalysisEndTime : string
    OpenAIAnalysisStartTime : string
    OpenAIAnalysisStatus : string
    OpenAiModelDeployment : string
    OriginalFileName : string
    PromptTokens : number
    Rating : string
    RecognitionStatus : string
    RecognizeDocumentEndTime : string
    RecognizeDocumentStartTime : string
    RecognizeDocumentStatus : string
    Summary : string
    TotalTokens : number
    UploadedOnUtc : string
    VersionNumber : number
  }


  type TDocumentCunk ={
    AIChunkResponses : TDocumentAICunk[]
    AIResponseJson : any
    AnalysisEndTime : string
    AnalysisStartTime : string
    CompletionTokens : number
    DocumentId : string
    Id : string
    ModeratorApprovalStatus : string
    ModeratorNotes : any
    OpenAiModelDeployment : string
    PromptTokens : number
    Rating : string
    SequenceNumber : number
    TotalTokens : number
    VersionNumber : number
  }


  type TDocumentAICunk ={
    AnalysisEndTime : string
    AnalysisStartTime : string
    CompletionTokens : number
    DocumentChunk : any
    DocumentChunkId : string
    Id : string
    ModeratorResponseJson : any
    OpenAiModelDeployment : string
    PromptTokens : number
    ResponseJson : string
    Topic : TDocumentTopic
    TotalTokens : number
  }

  type TDocumentTopic={
    Id:string
    Name:string
  }


}
