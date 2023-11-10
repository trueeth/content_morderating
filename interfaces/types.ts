import {
  EApporval,
  EClassification,
  ERating,
  EStatus,
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

export type TVideoSubRowType = {
  sceneNumber: number
  violationType: string
  category: string
  description: string
}
