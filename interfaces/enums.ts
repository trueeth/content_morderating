export enum EVideoData {
  name = 'NAME',
  type = 'TYPE',
  status = 'STATUS',
  rating = 'RATING',
  classification = 'CLASSIFICATION',
  submissionDate = 'SUBMISSION DATE',
  approval = 'APPROVAL',
  flaggedScenes = 'FLAGGED SCENES',
  actions = 'ACTIONS',
}

export enum EHistoryData {
  name = 'NAME',
  source = 'SOURCE',
  data = 'DATA',
  status = 'STATUS',
}

export enum EVideoDetail {
  sceneNumber = 'SCENE NUMBER',
  violationType = 'VIOLATION TYPE',
  category = 'CATEGORY',
  description = 'DESCRIPTION',
}

export enum EVideoType {
  video = 'Video',
}

export enum EStatus {
  new = 'NEW',
  processed = 'PROCESSED',
  failed = 'FAILED',
}

export enum ERating {
  r18 = 'R18',
  missing = 'MISSING',
}

export enum EClassification {
  h = 'H',
  s = 'S',
  sh = 'SH',
}

export enum EApporval {
  review = 'In Review',
  approve = 'Approved',
  reject = 'Rejected',
  pending = 'Pending',
}
