import React from 'react'
import Paper from '@mui/material/Paper'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Box, Table, TableContainer, Typography } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import {
  EApproval,
  EClassificationType, EMediaRating,
  ENewVideoData
} from '@interfaces/enums'
import { TNewVideoRowType } from '@interfaces/types'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import RowRating from '@components/multi-media/common/rating-item'
import RowApproval from '@components/multi-media/common/approval-item'

const rows = [
  {
    name: 'Content Moderation System UI/UX Design',
    date: '25/10/2023',
    rating: EMediaRating.r18,
    classification: [
      EClassificationType.hate,
      EClassificationType.sexual,
      EClassificationType.selfHarm
    ],
    approval: EApproval.review
  },
  {
    name: 'Test Video for the system',
    date: '25/10/2023',
    rating: EMediaRating.r18,
    classification: [
      EClassificationType.hate,
      EClassificationType.sexual,
      EClassificationType.selfHarm
    ],
    approval: EApproval.review
  },
  {
    name: 'Content Moderation System UI/UX Design',
    date: '25/10/2023',
    rating: EMediaRating.missing,
    classification: [
      EClassificationType.hate,
      EClassificationType.sexual,
      EClassificationType.selfHarm
    ],
    approval: EApproval.reject
  },
  {
    name: 'Test Video for the system',
    date: '25/10/2023',
    rating: EMediaRating.missing,
    classification: [
      EClassificationType.hate,
      EClassificationType.sexual,
      EClassificationType.selfHarm
    ],
    approval: EApproval.pending
  },
  {
    name: 'Content Moderation System UI/UX Design',
    date: '25/10/2023',
    rating: EMediaRating.r18,
    classification: [
      EClassificationType.hate,
      EClassificationType.sexual,
      EClassificationType.selfHarm
    ],
    approval: EApproval.approve
  }
]

const NewVideoRow = (props: { row: TNewVideoRowType }) => {
  return (
    <TableRow>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{props.row.name}</TableCell>
      <TableCell>{props.row.date}</TableCell>
      <TableCell>
        <RowRating rating={props.row.rating}></RowRating>
      </TableCell>
      <TableCell>H.SH.V</TableCell>
      <TableCell>
        <RowApproval approval={props.row.approval}></RowApproval>
      </TableCell>
    </TableRow>
  )
}

export default function AnalyticVideos() {
  return (
    <Box className="bg-white border-radius-5 h-full p-15 text-black">
      <Typography
        sx={{
          color: '#1A2057',
          fontWeight: '600',
          ml: 2
        }}
      >
        New Videos
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          width: '100%',
          mt: '0rem',

          '&  td': {
            borderRadius: `0 !important`,
            borderStyle: 'dashed !important',
            borderBottom: 'none !important',
            borderLeft: 'none !important',
            borderRight: 'none !important'
          }
        }}
      >
        <Table
          aria-label="collapsible table"
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none'
            }
          }}
        >
          <TableHead>
            <TableRow>
              {Object.values(ENewVideoData).map((item, index) => (
                <TableCell
                  key={index}
                  sx={{ whiteSpace: 'nowrap', fontSize: '12px', color: '#888' }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <NewVideoRow key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
