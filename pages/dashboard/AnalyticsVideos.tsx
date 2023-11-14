import React from 'react'
import Paper from '@mui/material/Paper'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import {
  EApporval,
  EClassification,
  ENewVideoData,
  ERating,
  EVideoData,
  TNewVideoRowType
} from '../../interfaces'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import RowRating from '../videos/videoTable/videoRow/RowRating'
import RowClassification from '../videos/videoTable/videoRow/RowClassification'
import RowApproval from '../videos/videoTable/videoRow/RowApproval'

const rows = [
  {
    name: 'Content Moderation System UI/UX Design',
    date: '25/10/2023',
    rating: ERating.r18,
    classification: [EClassification.h, EClassification.s, EClassification.sh],
    approval: EApporval.review
  },
  {
    name: 'Test Video for the system',
    date: '25/10/2023',
    rating: ERating.r18,
    classification: [EClassification.h, EClassification.s, EClassification.sh],
    approval: EApporval.review
  },
  {
    name: 'Content Moderation System UI/UX Design',
    date: '25/10/2023',
    rating: ERating.missing,
    classification: [EClassification.h, EClassification.s, EClassification.sh],
    approval: EApporval.reject
  },
  {
    name: 'Test Video for the system',
    date: '25/10/2023',
    rating: ERating.missing,
    classification: [EClassification.h, EClassification.s, EClassification.sh],
    approval: EApporval.pending
  },
  {
    name: 'Content Moderation System UI/UX Design',
    date: '25/10/2023',
    rating: ERating.r18,
    classification: [EClassification.h, EClassification.s, EClassification.sh],
    approval: EApporval.approve
  }
]

const NewVideoRow = (props: { row: TNewVideoRowType }) => {
  return (
    <React.Fragment>
      <TableRow
        sx={{
          '& > .MuiTableCell-root': {
            textAlign: 'center',
            borderTop: '1px solid #ccc',
            borderBottom: '1px solid #ccc',
            '&:first-of-type': {
              borderLeft: '1px solid #ccc',
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px'
            },
            '&:last-of-type': {
              borderRight: '1px solid #ccc',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px'
            }
          }
        }}
      >
        <TableCell>{props.row.name}</TableCell>
        <TableCell>{props.row.date}</TableCell>
        <TableCell>
          <RowRating rating={props.row.rating}></RowRating>
        </TableCell>
        <TableCell>
          <RowClassification
            classifications={props.row.classification}
          ></RowClassification>
        </TableCell>
        <TableCell>
          <RowApproval approval={props.row.approval}></RowApproval>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function () {
  return (
    <div className="bg-white border-radius-5 h-full p-15 text-black">
      <div>New Videos</div>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: '15px', px: 2, width: 'fit-content' }}
      >
        <Table
          aria-label="collapsible table"
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none'
            },
            borderCollapse: 'unset'
          }}
        >
          <TableHead>
            <TableRow>
              {Object.values(ENewVideoData).map((item, index) => (
                <TableCell
                  key={index}
                  align="center"
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
    </div>
  )
}
