import { TableCell, TableRow } from '@mui/material';
import * as React from 'react';
import TableActionWrapper from '@components/common/table-wrapper';
import { RoleData } from '@interfaces/apis/_mock';

/**
 * Functional component representing the Roles table.
 */
export default function Roles() {
  // Header data for the table
  const headerData = {
    title: 'Roles',
    sort: { group: ['All Roles', 'Approved Role'] },
    // Left button is not visible for this table
    leftButton: {
      visible: false,
    },
  };

  // Table header data
  const tableHeader = ['Role Name', 'Role Description'];

  return (
    <TableActionWrapper header={headerData} tableHeader={tableHeader}>
      {/* Mapping over RoleData to render table rows */}
      {RoleData.map((item, index) => (
        <TableRow key={index}>
          {/* Table cell for Role Name */}
          <TableCell>{item.name}</TableCell>
          {/* Table cell for Role Description */}
          <TableCell>{item.description}</TableCell>
        </TableRow>
      ))}
    </TableActionWrapper>
  );
}
