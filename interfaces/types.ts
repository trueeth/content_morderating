import {
  EApporval,
  EClassificationType,
  EReportHistoryStatus,
  EScheduleType,
  EProcessingStatus,
  EUserRole,
  EUserType,
  EMediaType,
  EModeratorApprovalStatus,
  EViolationType, EMediaRating
} from './enums'

export type TVideoRowType = {
  name?: string
  type?: EMediaType
  status?: EProcessingStatus
  rating?: EMediaRating
  classification?: EClassificationType[]
  submissionDate?: string
  moderator_approval?: EModeratorApprovalStatus
  ai_approval?: EModeratorApprovalStatus
  flaggedScenes?: number
  subRows?: TVideoSubRowType[]
}
export type TDocumentRowType = {
  name?: string
  type?: EMediaType
  submittedBy?: string
  moderator_approval?: EModeratorApprovalStatus
  ai_approval?: EApporval
  submissionDate?: string
  subRows?: TDocumentSubRowType[]
}

export type TNewVideoRowType = {
  name: string
  rating: EMediaRating
  classification: EClassificationType[]
  date: string
  approval: EApporval
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
  violationType?: string
  category?: string
  description?: string
}

export type TDocumentSubRowType = {
  sceneNumber?: number
  violationType?: EViolationType
  category?: string
  description?: string
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
