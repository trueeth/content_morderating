import {
  EApproval,
  EClassificationType,
  EReportHistoryStatus,
  EScheduleType,
  EProcessingStatus,
  EUserRole,
  EUserType,
  EMediaType,
  EModeratorApprovalStatus,
  EMediaRating
} from './enums'

export type TVideoRowType = {
  name?: string
  type?: EMediaType
  status?: EProcessingStatus
  rating?: EMediaRating
  classification?: EClassificationType[]
  classificationString?: string[]
  submissionDate?: string
  moderator_approval?: string
  ai_approval?: EModeratorApprovalStatus
  flaggedScenes?: number
  subRows?: TVideoSubRowType[]
}
export type TDocumentRowType = {
  name?: string
  type?: EMediaType
  processingStatus?: EProcessingStatus
  language?: string
  moderator_approval?: EApproval
  ai_approval?: EApproval
  submissionDate?: string
  subRows?: TDocumentSubRowType[]
}

export type TNewVideoRowType = {
  name: string
  rating: EMediaRating
  classification: EClassificationType[]
  date: string
  approval: EApproval
}

export type TReportHistory = {
  name: string
  type: string
  date: string
  createdby: string
  status: EReportHistoryStatus
}

export type TRole = {
  name: string
  description: string
}

export type TScheduledReports = {
  name: string
  type: string
  date: string
  createdby: string
  scheduleType: EScheduleType
}

export type THistoryRowType = {
  name: string
  source: EMediaType
  status: number
  date: string
}

export type TVideoSubRowType = {
  sceneNumber?: number
  moderatorStatus?: string
  violationType?: string
  status?: string
  description?: string
}

export type TDocumentSubRowType = {
  sceneNumber?: number
  topic?:string
  aiApproval?:EApproval
}

export type THistoryData = {
  name: string
  type: EMediaType
  status: EProcessingStatus
  submissionDate: string
}

export type TUserData = {
  name: string
  photo: string
  email: string
  number: string
  group: string
  role: EUserRole
  type: EUserType
}

export type TGroupData = {
  name: string
  owner: string
  member: number
}
