import { useState } from 'react';
import { Person } from '@mui/icons-material';
import { Box, TableCell, TableRow, Checkbox } from '@mui/material';
import { EUserData } from '@interfaces/index';
import * as React from 'react';
import TableActionWrapper from '@components/common/table-wrapper';
import RowAction from '@components/multi-media/common/action-item';
import Image from 'next/image';
import { UserData } from '@interfaces/apis/_mock';
import AddUserDlg from '@components/dialog/add-user-dlg';

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
    title: 'Users',
    sort: { group: ['All Users', 'Approved Users'] },
    leftButton: {
      // Icon for adding a new user
      icon: <Person sx={{ color: 'white' }} />,
      action: () => setState({ ...vState, openDlg: true }),
      title: 'Add New User',
    },
  };

  // Table header data from enum
  const tableHeader = Object.values(EUserData);

  // Row actions for each table row
  const rowActions = [{ title: 'Edit' }, { title: 'Delete' }];

  return (
    <TableActionWrapper
      header={headerData}
      tableHeader={tableHeader}
      // Dialog component to add a new user
      openDialog={<AddUserDlg open={vState.openDlg} onClose={closeDlg} />}
    >
      {/* Mapping over UserData to render table rows */}
      {UserData.map((item, index) => (
        <TableRow key={index}>
          {/* Table cell for user details */}
          <TableCell
            sx={{
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
            }}
          >
            {/* Checkbox for each row */}
            <Checkbox color="primary" />
            {/* Avatar image */}
            <Box
              sx={{
                width: 30,
                height: 30,
                overflow: 'hidden',
                position: 'relative',
                borderRadius: '50%',
                mx: 2,
              }}
            >
              <Image
                src={item.photo}
                alt="avatar"
                style={{
                  width: 30,
                  height: 'auto',
                  position: 'absolute',
                }}
              />
            </Box>
            {/* User name */}
            {item.name}
          </TableCell>
          {/* Table cell for user email */}
          <TableCell>{item.email}</TableCell>
          {/* Table cell for user number */}
          <TableCell>{item.number}</TableCell>
          {/* Table cell for user group */}
          <TableCell>{item.group}</TableCell>
          {/* Table cell for user role */}
          <TableCell>{item.role}</TableCell>
          {/* Table cell for user type */}
          <TableCell>{item.type}</TableCell>
          {/* Table cell for row actions */}
          <TableCell>
            {/* RowAction component for additional actions */}
            <RowAction actions={rowActions} />
          </TableCell>
        </TableRow>
      ))}
    </TableActionWrapper>
  );
}
