import {
  EApporval,
  EClassificationType,
  ERating,
  EReportHistoryStatus,
  EScheduleType,
  EProcessingStatus,
  EUserRole,
  EUserType,
  EMediaType, EModeratorApprovalStatus
} from './enums'

export type TVideoRowType = {
  name?: string
  type?: EMediaType
  status?: EProcessingStatus
  rating?: ERating
  classification?: EClassificationType[]
  submissionDate?: string
  approval?: EModeratorApprovalStatus
  flaggedScenes?: number
  subRows?: TVideoSubRowType[]
}

export type TNewVideoRowType = {
  name: string
  rating: ERating
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
  sceneNumber: number
  violationType: string
  category: string
  description: string
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


