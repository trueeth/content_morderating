import TabPanel from '@components/common/tab-panel';
import { useState } from 'react';
import Users from '@sections/access/tab-users';
import Groups from '@sections/access/tab-group';
import Roles from '@sections/access/tab-roles';
import CustomToggleButtonGroup from '@components/common/toggle-button';


export default function AccessSection() {
  const [vState, setState] = useState({ tabIndex: 0 });

  const accessGroups = ['Users', 'Groups', 'Roles'];

  return (
    <div>
      <CustomToggleButtonGroup
        groupName={accessGroups}
        handleChange={(val) => setState({ ...vState, tabIndex: val })}
      />
      <TabPanel value={vState.tabIndex} index={0}>
        <Users />
      </TabPanel>
      <TabPanel value={vState.tabIndex} index={1}>
        <Groups />
      </TabPanel>
      <TabPanel value={vState.tabIndex} index={2}>
        <Roles />
      </TabPanel>
    </div>
  );
}
