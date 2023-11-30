import { useState } from 'react'
import { NoteAdd } from '@mui/icons-material'
import { Box, TableCell, TableRow, Checkbox } from '@mui/material'
import { EReportHistory, EReportHistoryStatus } from '@interfaces/index'
import * as React from 'react'
import TableActionWrapper from '@components/common/table-wrapper'
import RowAction from '@components/multi-media/common/action-item'
import AddReportDlg from '@components/dialog/add-report-dlg'
import { HistoryData } from '@interfaces/apis/_mock'

export default function ReportHistory() {
  const [vState, setState] = useState({ openDlg: false, sortBy: 0 })

  const closeDlg = () => {
    setState({ ...vState, openDlg: false })
  }

  const headerData = {
    title: 'Reports History',
    sort: { group: ['All Reports', 'Approved Reports'] },
    leftButton: {
      icon: <NoteAdd sx={{ color: 'white', mr: 0.5 }} />,
      action: () => setState({ ...vState, openDlg: true }),
      title: 'Add New Report'
    }
  }

  const tableHeader = Object.values(EReportHistory)

  const rowActions = [{ title: 'Edit' }, { title: 'Delete' }]

  return (
    <TableActionWrapper
      header={headerData}
      tableHeader={tableHeader}
      openDialog={<AddReportDlg open={vState.openDlg} onClose={closeDlg} />}
    >
      {HistoryData.map((item, index) => (
        <TableRow key={index}>
          <TableCell>
            <Checkbox color="primary" />
            {item.name}
          </TableCell>
          <TableCell>{item.type}</TableCell>
          <TableCell>{item.date}</TableCell>
          <TableCell>{item.createdby}</TableCell>
          <TableCell>
            <Box
              sx={{
                p: '4px 10px',
                borderRadius: '5px',
                width: 'fit-content',
                fontSize: '0.7rem',
                bgcolor:
                  item.status === EReportHistoryStatus.processing
                    ? '#FFE6C9'
                    : 'var(--Primary1-L)',
                color:
                  item.status === EReportHistoryStatus.processing
                    ? '#FF9432'
                    : 'var(--Primary1)'
              }}
            >
              {item.status}
            </Box>
          </TableCell>
          <TableCell>
            <RowAction actions={rowActions} />
          </TableCell>
        </TableRow>
      ))}
    </TableActionWrapper>
  )
}
