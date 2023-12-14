import { TGroupData, TReportHistory, TRole, TUserData } from '@interfaces/types'
import { EReportHistoryStatus, EUserRole, EUserType } from '@interfaces/enums'
import avatar1 from '@public/assets/images/avatar/1.svg'
import avatar2 from '@public/assets/images/avatar/2.svg'
import avatar3 from '@public/assets/images/avatar/3.svg'
import avatar4 from '@public/assets/images/avatar/4.svg'
import avatar5 from '@public/assets/images/avatar/5.svg'

export const HistoryData: Array<TReportHistory> = [
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.view
  },
  {
    name: 'Content Mordertion System UI/UX Report',
    type: 'Company',
    date: 'Sep, 30, 2023 05:35PM',
    createdby: 'Mark Mohammad',
    status: EReportHistoryStatus.processing
  }
]

export const GroupData: Array<TGroupData> = [
  {
    name: 'Moderators Group 1',
    owner: 'Mark Mohammad',
    member: 231
  },
  {
    name: 'Moderators Group Backend Development',
    owner: 'Mark Mohammad',
    member: 758
  },
  {
    name: 'Moderators Frontend Development',
    owner: 'Hamza M',
    member: 6
  },
  {
    name: 'Moderators Group 1',
    owner: 'Hamza M',
    member: 43
  },
  {
    name: 'Moderators Group 1',
    owner: 'Mark Mohammad',
    member: 231
  },
  {
    name: 'Moderators Group 1',
    owner: 'Mark Mohammad',
    member: 21
  },
  {
    name: 'Moderators Group 1',
    owner: 'Mark Mohammad',
    member: 90
  },
  {
    name: 'Moderators Group UI/UX',
    owner: 'Hamza M',
    member: 231
  },
  {
    name: 'Moderators Group 1',
    owner: 'Mark Mohammad',
    member: 100
  },
  {
    name: 'Moderators Group UI/UX',
    owner: 'Mark Mohammad',
    member: 45
  }
]



export const RoleData: Array<TRole> = [
  {
    name: 'Administrator',
    description:
      'Your role as a Group administrator determines what you are able to do for that Group, like managing the users of the group dashboard.'
  },
  {
    name: 'Auditor',
    description:
      'The group auditor must plan the audit procedures to be performed on the consolidation process.'
  },
  {
    name: 'Viewer',
    description:
      'The group auditor must plan the audit procedures to be performed on the consolidation process.'
  }
]



export const UserData: Array<TUserData> = [
  {
    name: 'Floyd Miles',
    photo: avatar1,
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.admin,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: avatar2,
    email: 'Darlene Robertson',
    number: '(209) 555-0104',
    group: 'Moderators Group 2',
    role: EUserRole.admin,
    type: EUserType.saml
  },
  {
    name: 'Floyd Miles',
    photo: avatar3,
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.user,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: avatar4,
    email: 'Darlene Robertson',
    number: '(209) 555-0104',
    group: 'Moderators Group 2',
    role: EUserRole.user,
    type: EUserType.saml
  },
  {
    name: 'Floyd Miles',
    photo: avatar2,
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.admin,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: avatar5,
    email: 'Darlene Robertson',
    number: '(209) 555-0104',
    group: 'Moderators Group 2',
    role: EUserRole.user,
    type: EUserType.saml
  },
  {
    name: 'Floyd Miles',
    photo: avatar1,
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.manager,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: avatar2,
    email: 'Darlene Robertson',
    number: '(209) 555-0104',
    group: 'Moderators Group 2',
    role: EUserRole.manager,
    type: EUserType.saml
  },
  {
    name: 'Floyd Miles',
    photo: avatar3,
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.manager,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: avatar4,
    email: 'Darlene Robertson',
    number: '(209) 555-0104',
    group: 'Moderators Group 2',
    role: EUserRole.admin,
    type: EUserType.saml
  },
  {
    name: 'Floyd Miles',
    photo: avatar1,
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.admin,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: avatar5,
    email: 'Darlene Robertson',
    number: '(209) 555-0104',
    group: 'Moderators Group 2',
    role: EUserRole.admin,
    type: EUserType.saml
  },
  {
    name: 'Floyd Miles',
    photo: avatar3,
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.admin,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: avatar4,
    email: 'Darlene Robertson',
    number: '(209) 555-0104',
    group: 'Moderators Group 2',
    role: EUserRole.admin,
    type: EUserType.saml
  }
]

export const DrawerHistories = [

]
