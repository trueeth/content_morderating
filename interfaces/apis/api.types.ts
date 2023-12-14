import { EApproval, EMediaRating, EModeratorApprovalStatus, EProcessingStatus } from '@interfaces/enums'

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
    AutomaticApprovalStatus?: EModeratorApprovalStatus
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
    results?: TVideoAnalysisResult[],
    nextPage?: {
      pageSize?: number,
      skip?: number,
      done?: boolean
    }
  }

  type TVideoAnalysisResult = {
    accountId?: string,
    id?: string,
    partition?: string,
    externalId?: string,
    metadata?: string,
    name?: string,
    description?: string,
    created?: string,
    lastModified?: string,
    lastIndexed?: string,
    PrivacyMode?: string,
    userName?: string,
    isOwned?: true,
    isBase?: true,
    State?: string,
    ModerationState?: string,
    ReviewState?: string,
    processingProgress?: string,
    durationInSeconds?: number,
    thumbnailVideoId?: string,
    thumbnailId?: string,
    social?: {
      likedByUser?: true,
      likes?: number,
      views?: number
    },
    searchMatches?: [
      {
        startTime?: string,
        type?: string,
        text?: string,
        exactText?: string
      }
    ],
    indexingPreset?: string,
    streamingPreset?: string,
    sourceLanguage?: string,
    sourceLanguages?: [
      string
    ],
    personModelId?: string,
    animationModelId?: string,
    logoGroupId?: string
  }

  type TVideoAnalysisStreamingUrl = {
    url?: string,
    jwt?: string,
  }


}


export declare namespace TResDocument {

  type TDocumentContents = {
    Content?: TDocumentContent[],
    PageSize?: number,
    TotalCount?: number
  }

  type TDocumentContent = {
    AiApproval?: EApproval
    CompletionTokens?: number
    CreateLanguageProjectEndTime?: string
    CreateLanguageProjectStartTime?: string
    CreateLanguageProjectStatus?: EProcessingStatus
    CreateSearchIndexEndTime?: string
    CreateSearchIndexStartTime?: string
    CreateSearchIndexStatus?: EProcessingStatus
    Description?: string
    DocumentBytes?: string
    DocumentSummarizationEndTime?: string
    DocumentSummarizationStartTime?: string
    DocumentSummarizationStatus?: EProcessingStatus
    DocumentUrl?: string
    EstimatedTokens?: number
    FileName?: string
    GptResponse?: TGptResponse | any[]
    Id?: string
    Language?: string
    MediaSourceId?: string
    ModeratorApprovalStatus?: EApproval
    ModeratorNotes?: string
    ModeratorResponse?: TModeratorResponse | any[]
    Name?: string
    Notes?: string
    OpenAIAnalysisEndTime?: string
    OpenAIAnalysisStartTime?: string
    OpenAIAnalysisStatus?: EProcessingStatus
    OpenAiModelDeployment?: string
    OriginalFileName?: string
    PdfUrl?: string
    PromptTokens?: number
    Rating?: EMediaRating
    RecognizeDocumentEndTime?: string
    RecognizeDocumentStartTime?: string
    RecognizeDocumentStatus?: EProcessingStatus
    Summary?: string
    TotalProcessingStatus?: EProcessingStatus
    TotalTokens?: number
    UploadedOnUtc?: string
    VersionNumber?: number
  }

  type TGptResponse = {
    answers?: TGptAnswer[],
    Topic?: {
      Id?: string,
      Name?: string
    },
    AiApproval?: EApproval
  }

  type TGptAnswer ={
    questionId?: number,
    question?: string,
    answerFound?: true,
    AiApproval?: EApproval,
    ModeratorAnswerFound?: true,
    ModeratorApprovalStatus?: EModeratorApprovalStatus,
    ModeratorNotes?: string,
    pageNumbers?: TGptAnswerPageNumber[]
  }

  type TGptAnswerPageNumber={
    pageNumber?: number,
    opinion?: string,
    snippet?: string,
    AiApproval?: EApproval,
    ModeratorAnswerFound?: true,
    ModeratorApprovalStatus?: EModeratorApprovalStatus,
    ModeratorLikeStatus?: EModeratorApprovalStatus,
    ModeratorNotes?: string
  }


  type TModeratorResponse = {
    Id?: string,
    DocumentId?: string,
    DocumentChunkId?: string,
    TopicId?: string,
    QuestionModeratorAction?: [
      {
        Id?: string,
        Question?: string,
        ApprovalStatus?: EApproval,
        AnswerFound?: string,
        Notes?: string
      }
    ]
  }



  type TDocumentContentDetail = {
    Id?: string,
    Name?: string,
    Description?: string,
    Notes?: string,
    MediaSourceId?: string,
    Rating?: EMediaRating,
    ModeratorApprovalStatus?: EModeratorApprovalStatus,
    ModeratorNotes?: string,
    Language?: string,
    TotalProcessingStatus?: EProcessingStatus,
    DocumentBytes?: string,
    DocumentUrl?: string,
    OriginalFileName?: string,
    FileName?: string,
    VersionNumber?: number,
    UploadedOnUtc?: string,
    RecognizeDocumentStatus?: EProcessingStatus,
    CreateSearchIndexStatus?: EProcessingStatus,
    CreateLanguageProjectStatus?: EProcessingStatus,
    RecognizeDocumentStartTime?: string,
    RecognizeDocumentEndTime?: string,
    CreateSearchIndexStartTime?: string,
    CreateSearchIndexEndTime?: string,
    CreateLanguageProjectStartTime?: string,
    CreateLanguageProjectEndTime?: string,
    OpenAIAnalysisStatus?: EProcessingStatus,
    OpenAIAnalysisStartTime?: string,
    OpenAIAnalysisEndTime?: string,
    DocumentSummarizationStatus?: EProcessingStatus,
    DocumentSummarizationStartTime?: string,
    DocumentSummarizationEndTime?: string,
    Summary?: string,
    ModeratorResponse?: TModeratorResponse[],
    EstimatedTokens?: number,
    TotalTokens?: number,
    PromptTokens?: number,
    CompletionTokens?: number,
    AiApproval?: EApproval,
    OpenAiModelDeployment?: string,
    PdfUrl?: string,
    GptResponse?: TGptResponse[]
  }


}
