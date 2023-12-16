export enum EVideoColumn {
  name = 'NAME',
  // type = 'TYPE',
  status = 'STATUS',
  rating = 'RATING',
  classification = 'CLASSIFICATION',
  moderator_approval = 'MODERATOR STATUS',
  ai_approval = 'AI APPROVAL',
  submissionDate = 'SUBMISSION DATE',
  // flaggedScenes = 'FLAGGED SCENES',
  actions = 'ACTIONS'
}
export enum EDocumentColumn {
  name = 'NAME',
  processingStatus = 'ProcessingStatus',
  // type = 'TYPE',
  // status = 'SUBMITED BY',
  language = 'LANGUAGE',
  moderator_approval = 'MODERATOR STATUS',
  ai_approval = 'AI APPROVAL',
  submissionDate = 'SUBMISSION DATE',
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
  pageNumber = 'SCENE NUMBER',
  violationType = 'VIOLATION TYPE',
  category = 'SCENE STATUS',
  // description = 'DESCRIPTION',
  // action = 'ACTIONS'
}

export enum EDocDetail {
  // topicNumber = 'TOPIC NUMBER',
  topic = 'TOPIC NAME',
  status = 'STATUS',
  action = 'ACTIONS'
}

export enum EMediaType {
  video = 'Video',
  document = 'Document'
}

export enum EDocumentRecognitionStatus {
  new = 'New',
  processed = 'Processed',
  failed = 'Failed',
  processing = 'Processing'
}

// @TODO wil modify
export enum EModeratorApprovalStatus {
  new = 'New',
  inReview = 'InReview',
  approved = 'Approved',
  rejected = 'Rejected'
}

export enum EMediaRating {
  none = 'None',
  g = 'G',
  pg = 'PG',
  pg12 = 'PG12',
  pg15 = 'PG15',
  r18 = 'R18',
  r15 = 'R15',
  missing = 'MISSING'
}

export enum EClassificationType {
  hate = 'H',
  sexual = 'S',
  selfHarm = 'SH',
  violance = 'V'
}

export enum EApproval {
  review = 'In Review',
  approve = 'Approved',
  reject = 'Rejected',
  pending = 'Pending',
  none='None',
}
export enum EAlert {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning'
}

export enum EProcessingStatus {
  new = 'New',
  uploaded = 'Uploaded',
  processing = 'Processing',
  processed = 'Processed',
  failed = 'Failed'
}

export enum EFlagType {
  keyword = 'KeyWord',
  ocr = 'Ocr',
  namedPerson = 'NamedPerson',
  namedLocation = 'NamedLocation',
  topic = 'Topic',
  brand = 'Brand',
  label = 'Label',
  detectedObject = 'DetectedObject',
  transcript = 'Transcript'
}

export enum EMatchType {
  transcript = 'Transcript',
  topic = 'Topic',
  ocr = 'Ocr',
  annotations = 'Annotations',
  title = 'Title',
  description = 'Description',
  face = 'Face',
  owner = 'Owner',
  brand = 'Brand',
  namedLocation = 'NamedLocation',
  namedPerson = 'NamedPerson',
  animatedCharacters = 'AnimatedCharacters'
}

export enum EAzureSearchType {
  singleVectorSearch = 'SingleVectorSearch',
  singleVectorSearchWithFilter = 'SingleVectorSearchWithFilter',
  simpleHybridSearch = 'SimpleHybridSearch',
  semanticHybridSearch = 'SemanticHybridSearch'
}

export enum EModeratedContentType {
  transcript = 'Transcript',
  ocr = 'Ocr',
  keyword = 'Keyword',
  label = 'Label',
  brand = 'Brand',
  topic = 'Topic'
}

export enum ESeverity {
  none = 'None',
  moderate = 'Moderate',
  severe = 'Severe',
  extreme = 'Extreme'
}

export enum EViolationType {
  saudi = 'Saudi Discrimination',
  religion = 'Religion Discrimination'
}

export enum EDocumentApprovalDlg {
  document='Document',
  topic='Topic',
  question='Question',
  page='Page',
}
