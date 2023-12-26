import TabPanel from '@components/common/tab-panel';
import { useState } from 'react';
import Users from '@sections/access/tab-users';
import Groups from '@sections/access/tab-group';
import Roles from '@sections/access/tab-roles';
import CustomToggleButtonGroup from '@components/common/toggle-button';

/**
 * Functional component representing the AccessSection.
 * It provides a tabbed interface to switch between Users, Groups, and Roles.
 */
export default function AccessSection() {
  // State to manage the selected tab index
  const [vState, setState] = useState({ tabIndex: 0 });

  // Array representing the available access groups
  const accessGroups = ['Users', 'Groups', 'Roles'];

  return (
    <div>
      {/* ToggleButtonGroup to switch between access groups */}
      <CustomToggleButtonGroup
        groupName={accessGroups}
        handleChange={(val) => setState({ ...vState, tabIndex: val })}
      />

      {/* TabPanel for Users */}
      <TabPanel value={vState.tabIndex} index={0}>
        <Users />
      </TabPanel>

      {/* TabPanel for Groups */}
      <TabPanel value={vState.tabIndex} index={1}>
        <Groups />
      </TabPanel>

      {/* TabPanel for Roles */}
      <TabPanel value={vState.tabIndex} index={2}>
        <Roles />
      </TabPanel>
    </div>
  );
}
