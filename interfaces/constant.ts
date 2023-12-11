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
import { EVideoColumn } from './enums'

export const CHeaderTabs: Array<{ icon: SvgIconComponent; title: string , url?:string , dialog?:string}> = [
  // { icon: GridViewRounded, title: 'Dashboard', url:'dashboard' },
  { icon: Slideshow, title: 'Videos', url:'videos' },
  // { icon: InsertDriveFileOutlined, title: 'Documents', url:'documents' },
  // { icon: Update, title: 'Reports', url:'reports' },
  // { icon: Lock, title: 'Access', url:'access' },
  // { icon: Settings, title: 'Settings', url:'settings' },
  { icon: FileUpload, title: 'Upload' , dialog:'upload'}
]



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

