import { TableCell, TableRow } from '@mui/material';
import * as React from 'react';
import TableActionWrapper from '@components/common/table-wrapper';
import { RoleData } from '@interfaces/apis/_mock';


export default function Roles() {
  const headerData = {
    title: 'Roles',
    sort: { group: ['All Roles', 'Approved Role'] },
    leftButton: {
      visible: false,
    },
  };

  const tableHeader = ['Role Name', 'Role Description'];

  return (
    <TableActionWrapper header={headerData} tableHeader={tableHeader}>
      {RoleData.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.description}</TableCell>
        </TableRow>
      ))}
    </TableActionWrapper>
  );
}
