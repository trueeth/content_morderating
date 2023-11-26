import {
  FileUpload,
  GridViewRounded,
  InsertDriveFileOutlined,
  Settings,
  Slideshow,
  SvgIconComponent,
  Update,
  Lock
} from '@mui/icons-material'
import { EVideoData } from './enums'

export const CHeaderTabs: Array<{ icon: SvgIconComponent; title: string }> = [
  { icon: GridViewRounded, title: 'Dashboard' },
  { icon: Slideshow, title: 'Videos' },
  { icon: InsertDriveFileOutlined, title: 'Documents' },
  { icon: Update, title: 'Reports' },
  { icon: Lock, title: 'Access' },
  { icon: Settings, title: 'Settings' },
  { icon: FileUpload, title: 'Upload' }
]

export const CDrawerState = [{ title: EVideoData.status, value: 1 }]

// @TODO can be delete
export const CSceneState = ['Processing', 'Approved', 'Unapproved']

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

