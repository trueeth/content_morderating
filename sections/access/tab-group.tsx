import { useState } from 'react';
import { Group } from '@mui/icons-material';
import { TableCell, TableRow, Checkbox } from '@mui/material';
import { EGroupData } from '@interfaces/index';
import * as React from 'react';
import TableActionWrapper from '@components/common/table-wrapper';
import RowAction from '@components/multi-media/common/action-item';
import { GroupData } from '@interfaces/apis/_mock';
import AddGroupDlg from '@components/dialog/add-group-dlg';

/**
 * Functional component representing the Users table.
 */
export default function Users() {
  // State to manage the dialog's open state and sorting
  const [vState, setState] = useState({ openDlg: false, sortBy: 0 });

  // Function to close the dialog
  const closeDlg = () => {
    setState({ ...vState, openDlg: false });
  };

  // Header data for the table
  const headerData = {
    title: 'Groups',
    sort: { group: ['All Group', 'Approved Group'] },
    leftButton: {
      icon: <Group sx={{ color: 'white' }} />,
      action: () => setState({ ...vState, openDlg: true }),
      title: 'Add New Group',
    },
  };

  // Table header data from enum
  const tableHeader = Object.values(EGroupData);

  // Row actions for each table row
  const rowActions = [{ title: 'Edit' }, { title: 'Delete' }];

  return (
    <TableActionWrapper
      header={headerData}
      tableHeader={tableHeader}
      // Dialog component to add a new group
      openDialog={<AddGroupDlg open={vState.openDlg} onClose={closeDlg} />}
    >
      {/* Mapping over GroupData to render table rows */}
      {GroupData.map((item, index) => (
        <TableRow key={index}>
          <TableCell>
            {/* Checkbox for each row */}
            <Checkbox color="primary" checked={false} />
            {item.name}
          </TableCell>
          <TableCell>{item.owner}</TableCell>
          <TableCell>{item.member}</TableCell>

          <TableCell>
            {/* RowAction component for additional actions */}
            <RowAction actions={rowActions} />
          </TableCell>
        </TableRow>
      ))}
    </TableActionWrapper>
  );
}
