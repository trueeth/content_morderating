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


export default function Users() {
  const [vState, setState] = useState({ openDlg: false, sortBy: 0 });

  const closeDlg = () => {
    setState({ ...vState, openDlg: false });
  };

  const headerData = {
    title: 'Users',
    sort: { group: ['All Users', 'Approved Users'] },
    leftButton: {
      icon: <Person sx={{ color: 'white' }} />,
      action: () => setState({ ...vState, openDlg: true }),
      title: 'Add New User',
    },
  };

  const tableHeader = Object.values(EUserData);

  const rowActions = [{ title: 'Edit' }, { title: 'Delete' }];

  return (
    <TableActionWrapper
      header={headerData}
      tableHeader={tableHeader}
      openDialog={<AddUserDlg open={vState.openDlg} onClose={closeDlg} />}
    >
      {UserData.map((item, index) => (
        <TableRow key={index}>
          <TableCell
            sx={{
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
            }}
          >
            <Checkbox color="primary" />
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
            {item.name}
          </TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>{item.number}</TableCell>
          <TableCell>{item.group}</TableCell>
          <TableCell>{item.role}</TableCell>
          <TableCell>{item.type}</TableCell>
          <TableCell>
            <RowAction actions={rowActions} />
          </TableCell>
        </TableRow>
      ))}
    </TableActionWrapper>
  );
}
