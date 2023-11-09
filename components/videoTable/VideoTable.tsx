import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
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

const rows:TVideoRowType[]=[
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.new,rating:ERating.r18,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.failed,rating:ERating.r18,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.failed,rating:ERating.missing,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.failed,rating:ERating.missing,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.new,rating:ERating.missing,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.new,rating:ERating.r18,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.new,rating:ERating.r18,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.processed,rating:ERating.r18,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.processed,rating:ERating.r18,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.processed,rating:ERating.r18,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.new,rating:ERating.missing,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.new,rating:ERating.missing,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.failed,rating:ERating.missing,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
  {name:'Content Moderation System UI/UX Design', type:EVideoType.video,status:EStatus.failed,rating:ERating.r18,classification:[EClassification.h,EClassification.s],submissionDate:'Sep, 26, 2023 07:55PM',approval:EApporval.pending,flaggedScenes:120},
]

export default function VideoTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.values(EVideoColumns).map((cell,index)=>(
              <TableCell key={index} align="left">{cell}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <VideoRow key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
