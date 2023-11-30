import { useState } from 'react'
import { TableCell, TableRow } from '@mui/material'
import { TRole } from '@interfaces/index'
import * as React from 'react'
import TableActionWrapper from '@components/common/table-wrapper'
import { RoleData } from '@interfaces/apis/_mock'

export default function Users() {
  const [vState, setState] = useState({ openDlg: false, sortBy: 0 })

  const headerData = {
    title: 'Roles',
    sort: { group: ['All Roles', 'Approved Role'] },
    leftButton: {
      visible: false
    }
  }

  const tableHeader = ['Role Name', 'Role Description']

  return (
    <TableActionWrapper header={headerData} tableHeader={tableHeader}>
      {RoleData.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.description}</TableCell>
        </TableRow>
      ))}
    </TableActionWrapper>
  )
}
