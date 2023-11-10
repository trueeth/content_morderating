import {
  FileUpload,
  GridViewRounded,
  HeadsetMic,
  InsertDriveFileOutlined,
  Settings,
  Slideshow,
  SvgIconComponent,
  Update,
} from '@mui/icons-material'
import { EVideoColumns } from './enums'

export const CHeaderTabs: Array<{ icon: SvgIconComponent; title: string }> = [
  { icon: GridViewRounded, title: 'Dashboard' },
  { icon: Slideshow, title: 'Videos' },
  { icon: InsertDriveFileOutlined, title: 'Documents' },
  { icon: Update, title: 'Reports' },
  { icon: HeadsetMic, title: 'Support' },
  { icon: Settings, title: 'Settings' },
  { icon: FileUpload, title: 'Upload' },
]

export const CDrawerState = [{ title: EVideoColumns.status, value: 1 }]

// @TODO can be delete
export const CSceneState = ['Processing', 'Approved', 'Unapproved']

export const CFlaggedScenesMax = 200

export const CUploadSteps = ['MEDIA TYPE', 'NEW OR OLD', 'SOURCE', 'LAUNCH'];
