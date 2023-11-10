export enum EVideoColumns {
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

export enum EVideoSubColumns {
  sceneNumber = 'SCENE NUMBER',
  violationType = 'VIOLATION TYPE',
  category = 'CATEGORY',
  description = 'DESCRIPTION',
}

export enum EVideoType {
  video,
}

export enum EStatus {
  new,
  processed,
  failed,
}

export enum ERating {
  r18,
  missing,
}

export enum EClassification {
  h = 'H',
  s = 'S',
  sh = 'SH',
}

export enum EApporval {
  review,
  approve,
  reject,
  pending,
}
