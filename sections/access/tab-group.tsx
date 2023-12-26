import { useState } from 'react';
import { Group } from '@mui/icons-material';
import { TableCell, TableRow, Checkbox } from '@mui/material';
import { EGroupData } from '@interfaces/index';
import * as React from 'react';
import TableActionWrapper from '@components/common/table-wrapper';
import RowAction from '@components/multi-media/common/action-item';
import { GroupData } from '@interfaces/apis/_mock';
import AddGroupDlg from '@components/dialog/add-group-dlg';


export default function Users() {
  const [vState, setState] = useState({ openDlg: false, sortBy: 0 });

  const closeDlg = () => {
    setState({ ...vState, openDlg: false });
  };

  const headerData = {
    title: 'Groups',
    sort: { group: ['All Group', 'Approved Group'] },
    leftButton: {
      icon: <Group sx={{ color: 'white' }} />,
      action: () => setState({ ...vState, openDlg: true }),
      title: 'Add New Group',
    },
  };

  const tableHeader = Object.values(EGroupData);

  const rowActions = [{ title: 'Edit' }, { title: 'Delete' }];

  return (
    <TableActionWrapper
      header={headerData}
      tableHeader={tableHeader}
      openDialog={<AddGroupDlg open={vState.openDlg} onClose={closeDlg} />}
    >
      {GroupData.map((item, index) => (
        <TableRow key={index}>
          <TableCell>
            <Checkbox color="primary" checked={false} />
            {item.name}
          </TableCell>
          <TableCell>{item.owner}</TableCell>
          <TableCell>{item.member}</TableCell>

          <TableCell>
            <RowAction actions={rowActions} />
          </TableCell>
        </TableRow>
      ))}
    </TableActionWrapper>
  );
}
