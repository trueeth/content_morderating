import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  EApporval,
  EClassification,
  ERating,
  EStatus,
  EVideoColumns,
  EVideoType,
  TVideoRowType,
} from '../../interfaces'
import VideoRow from './VideoRow'

const rows: TVideoRowType[] = [
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.new,
    rating: ERating.r18,
    classification: [EClassification.h, EClassification.s],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.pending,
    flaggedScenes: 20,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text best Ipsum has been the industry's standard",
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text best Ipsum has been the industry's standard",
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text best Ipsum has been the industry's standard",
      },
    ],
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.failed,
    rating: ERating.r18,
    classification: [EClassification.h, EClassification.sh, EClassification.s],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.pending,
    flaggedScenes: 20,
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.failed,
    rating: ERating.missing,
    classification: [EClassification.s],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.reject,
    flaggedScenes: 120,
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.failed,
    rating: ERating.missing,
    classification: [EClassification.s],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.reject,
    flaggedScenes: 80,
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.new,
    rating: ERating.missing,
    classification: [EClassification.s],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.reject,
    flaggedScenes: 80,
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.new,
    rating: ERating.r18,
    classification: [EClassification.sh, EClassification.s],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.pending,
    flaggedScenes: 120,
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.new,
    rating: ERating.r18,
    classification: [EClassification.sh, EClassification.s],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.pending,
    flaggedScenes: 30,
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.processed,
    rating: ERating.r18,
    classification: [EClassification.sh, EClassification.s],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.review,
    flaggedScenes: 170,
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.processed,
    rating: ERating.r18,
    classification: [EClassification.h, EClassification.s],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.review,
    flaggedScenes: 170,
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.processed,
    rating: ERating.r18,
    classification: [EClassification.h],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.pending,
    flaggedScenes: 120,
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.new,
    rating: ERating.missing,
    classification: [EClassification.h],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.pending,
    flaggedScenes: 120,
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.new,
    rating: ERating.missing,
    classification: [EClassification.h],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.approve,
    flaggedScenes: 30,
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.failed,
    rating: ERating.missing,
    classification: [EClassification.h],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.approve,
    flaggedScenes: 30,
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EVideoType.video,
    status: EStatus.failed,
    rating: ERating.r18,
    classification: [EClassification.h, EClassification.s],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EApporval.pending,
    flaggedScenes: 120,
  },
]

export default function VideoTable() {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '15px', px: 2 }}>
      <Table
        aria-label="collapsible table"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.values(EVideoColumns).map((item, index) => (
              <TableCell
                key={index}
                align="center"
                sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <VideoRow key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
