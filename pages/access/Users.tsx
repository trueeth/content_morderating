import { useState } from 'react'
import { Person } from '@mui/icons-material'
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Table,
  tableCellClasses,
  Checkbox
} from '@mui/material'
import { PrimaryButton } from 'components/styled/StyledButton'
import { EUserData, EUserRole, EUserType, TUserData } from 'interfaces'
import Action from './components/Action'
import AddUserDlg from './components/AddUserDlg'
import SearchInput from 'components/styled/SearchInput'

import avatar1 from 'assets/images/avatar/1.svg'
import avatar2 from 'assets/images/avatar/2.svg'
import avatar3 from 'assets/images/avatar/3.svg'
import avatar4 from 'assets/images/avatar/4.svg'
import avatar5 from 'assets/images/avatar/5.svg'

import Image from 'next/image'

const UserData: Array<TUserData> = [
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




export default function Users() {
  const [vState, setState] = useState({ openDlg: false })

  const closeDlg = () => {
    setState({ ...vState, openDlg: false })
  }
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          color: 'black'
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 2,
            '& .MuiGrid-item': {
              display: 'flex',
              alignItems: 'center'
            }
          }}
        >
          <Grid item>
            <Typography>Users</Typography>
            <Button
              sx={{
                ml: 2,
                bgcolor: '#ff1313a0',
                color: 'white',
                '&:hover': { bgcolor: '#ff1313a0' }
              }}
            >
              Delete
            </Button>
          </Grid>
          <Grid item sx={{ flexGrow: 1, justifyContent: 'end' }}>
            <Typography whiteSpace="nowrap" mr={2}>
              Sort by:
            </Typography>
            <SearchInput />
          </Grid>
          <Grid item>
            <PrimaryButton
              onClick={() => setState({ ...vState, openDlg: true })}
              sx={{ whiteSpace: 'nowrap' }}
            >
              <Person sx={{ color: 'white' }} />
              Add New User
            </PrimaryButton>
            <AddUserDlg open={vState.openDlg} onClose={closeDlg} />
          </Grid>
        </Grid>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '15px',
          px: 2,
          width: '100%',
          '& .MuiTableCell-root': {
            textAlign: 'left',
            whiteSpace: 'nowrap'
          }
        }}
      >
        <Table
          aria-label="collapsible table"
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none'
            }
          }}
        >
          <TableHead>
            <TableRow>
              {Object.values(EUserData).map((item, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ whiteSpace: 'nowrap', fontSize: '12px', color: '#888' }}
                >
                  <Checkbox
                    color="primary"
                    sx={{ display: index !== 0 ? 'none' : 'inline' }}
                  />
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {UserData.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{
                  display:'flex',
                  justifyContent:'left',
                  alignItems:'center'
                }}>

                  <Checkbox color="primary" checked={false} />
                  <Box sx={{
                    width:30,
                    height:30,
                    overflow:'hidden',
                    position:'relative',
                    borderRadius:'50%',
                    mx:2
                  }}>
                    <Image
                      src={item.photo}
                      alt='avatar'
                      style={{
                        width:30,
                        height:'auto',
                        position:'absolute',
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
                  <Action />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
