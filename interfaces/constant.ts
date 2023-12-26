
const iconUrl = (icon: string) => `/assets/images/icon/${icon}.svg`;


export const CHeaderTabs: Array<{ icon:string; title: string, url?: string, dialog?: string, key?:string }> = [
  { icon: iconUrl('dashboard'), title: 'Dashboard', key: 'Dashboard', url: 'dashboard' },
  { icon: iconUrl('dashboard'), title: 'Videos',  key: 'Videos',url: 'videos' },
  { icon: iconUrl('dashboard'), title: 'Documents',key: 'Documents', url: 'documents' },
  { icon: iconUrl('report'), title: 'Reports',key: 'Reports', url: 'reports' },
  { icon: iconUrl('access'), title: 'Access', key: 'Access', url: 'access' },
  { icon: iconUrl('setting'), title: 'Settings',key: 'Settings', url: 'settings' },
  { icon: iconUrl('upload'), title: 'Upload', key: 'Upload', url: 'upload' }
]



export const CSceneState = [
  'Approved',
  'Rejected'
]

export const CDrawerVideoTabs = [
  'Play the Scene',
  'Activities'
]

export const CDrawerDocumentTabs = [
  'Overview',
  'Questions',
  'Activities'
]

export const CQuestionsColumns = [
  'Question',
  'Moderator Approval',
  'Ai Approval',
  'Ai Detection',
  'Pages',
  'Actions'
]

export const CMediaType = ['Video', 'Document']

export const CLanguage = ['English', 'Arabic']

export const CFlaggedScenesMax = 10000

export const CUploadSteps = ['MEDIA TYPE', 'NEW OR OLD', 'SOURCE', 'LAUNCH']

export const Months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
]

