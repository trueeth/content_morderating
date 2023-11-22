export enum EVideoData {
  name = 'NAME',
  type = 'TYPE',
  status = 'STATUS',
  rating = 'RATING',
  classification = 'CLASSIFICATION',
  submissionDate = 'SUBMISSION DATE',
  approval = 'APPROVAL',
  flaggedScenes = 'FLAGGED SCENES',
  actions = 'ACTIONS'
}

export enum ENewVideoData {
  name = 'NAME',
  date = 'DATE',
  rating = 'RATING',
  classification = 'CLASSIFICATION',
  approval = 'APPROVAL'
}

export enum EReportHistory {
  name = 'REPORT NAME',
  type = 'TYPE',
  date = 'DATE',
  createdby = 'CREATED BY',
  status = 'STATUS',
  action = 'ACTIONS'
}

export enum EUserRole {
  admin = 'Admin',
  user = 'User',
  manager = 'Manager'
}
export enum EUserData {
  name = 'NAME',
  email = 'EMAIL ADDRESS',
  number = 'MOBILE NUMBER',
  group = 'GROUP NAME',
  role = 'ROLE',
  type = 'TYPE',
  actions = 'ACTIONS'
}

export enum EUserType {
  saml = 'SAML',
  ldap = 'LDAP',
  local = 'Local'
}

export enum EGroupData {
  name = 'Group Name',
  owner = 'Group Owner',
  member = 'Number of Member',
  action = 'Actions'
}

export enum EReportHistoryStatus {
  processing = 'Processing',
  view = 'View Report '
}

export enum EScheduleType {
  daily = 'Daily',
  weekly = 'Weekly',
  monthly = 'Monthly'
}

export enum EReportType {
  company = 'Company',
  event = 'Events'
}

export enum EHistoryData {
  name = 'NAME',
  source = 'SOURCE',
  data = 'DATA',
  status = 'STATUS'
}

export enum EVideoDetail {
  sceneNumber = 'SCENE NUMBER',
  violationType = 'VIOLATION TYPE',
  category = 'CATEGORY',
  description = 'DESCRIPTION'
}

export enum EVideoType {
  video = 'Video'
}

export enum EStatus {
  new = 'NEW',
  processed = 'PROCESSED',
  failed = 'FAILED'
}

export enum ERating {
  r18 = 'R18',
  missing = 'MISSING'
}

export enum EClassification {
  h = 'H',
  s = 'S',
  sh = 'SH'
}

export enum EApporval {
  review = 'In Review',
  approve = 'Approved',
  reject = 'Rejected',
  pending = 'Pending'
}

export enum EAlert {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning'
}
