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

export const VApproval = ['In Review', 'Approved', 'Rejected', 'Pending']

export const VHeaderTabs: Array<{ icon: SvgIconComponent; title: string }> = [
  { icon: GridViewRounded, title: 'Dashboard' },
  { icon: Slideshow, title: 'Videos' },
  { icon: InsertDriveFileOutlined, title: 'Documents' },
  { icon: Update, title: 'Reports' },
  { icon: HeadsetMic, title: 'Support' },
  { icon: Settings, title: 'Settings' },
  { icon: FileUpload, title: 'Upload' },
]

export const CFlaggedScenesMax = 200
