import {
  EApporval,
  EClassification,
  ERating,
  EReportHistoryStatus,
  EScheduleType,
  EStatus,
  EUserRole,
  EUserType,
  EVideoType,
} from './enums'

export type TVideoRowType = {
  name: string
  type: EVideoType
  status: EStatus
  rating: ERating
  classification: EClassification[]
  submissionDate: string
  approval: EApporval
  flaggedScenes: number
  subRows?: TVideoSubRowType[]
}

export type TReportHistory = {
  name: string
  type: string
  date: string
  createdby: string
  status: EReportHistoryStatus
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
  source: EVideoType
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
  type: EVideoType
  status: EStatus
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
