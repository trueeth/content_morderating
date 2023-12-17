import {
  InsertDriveFileOutlined,
} from '@mui/icons-material'

const iconUrl = (icon: string) => `/assets/images/icon/${icon}.svg`;


export const CHeaderTabs: Array<{ icon:string; title: string, url?: string, dialog?: string }> = [
  { icon: iconUrl('dashboard'), title: 'Dashboard', url: 'dashboard' },
  { icon: iconUrl('dashboard'), title: 'Videos', url: 'videos' },
  { icon: iconUrl('dashboard'), title: 'Documents', url: 'documents' },
  { icon: iconUrl('report'), title: 'Reports', url: 'reports' },
  { icon: iconUrl('access'), title: 'Access', url: 'access' },
  { icon: iconUrl('setting'), title: 'Settings', url: 'settings' },
  { icon: iconUrl('upload'), title: 'Upload', dialog: 'upload' }
]


export const CSceneState = [
  // 'Not Assigned',
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
  // 'Summary',
  'Activities'
]

export const CQuestionsColumns = [
  'Question',
  'Moderator Approval',
  'Ai Approval',
  'Ai Detection',
  // 'Moderator Detection',
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

