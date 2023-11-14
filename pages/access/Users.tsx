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

const UserData: Array<TUserData> = [
  {
    name: 'Floyd Miles',
    photo: '',
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.admin,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: '',
    email: 'Darlene Robertson',
    number: '(209) 555-0104',
    group: 'Moderators Group 2',
    role: EUserRole.admin,
    type: EUserType.saml
  },
  {
    name: 'Floyd Miles',
    photo: '',
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.user,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: '',
    email: 'Darlene Robertson',
    number: '(209) 555-0104',
    group: 'Moderators Group 2',
    role: EUserRole.user,
    type: EUserType.saml
  },
  {
    name: 'Floyd Miles',
    photo: '',
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.admin,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: '',
    email: 'Darlene Robertson',
    number: '(209) 555-0104',
    group: 'Moderators Group 2',
    role: EUserRole.user,
    type: EUserType.saml
  },
  {
    name: 'Floyd Miles',
    photo: '',
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.manager,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: '',
    email: 'Darlene Robertson',
    number: '(209) 555-0104',
    group: 'Moderators Group 2',
    role: EUserRole.manager,
    type: EUserType.saml
  },
  {
    name: 'Floyd Miles',
    photo: '',
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.manager,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: '',
    email: 'Darlene Robertson',
    number: '(209) 555-0104',
    group: 'Moderators Group 2',
    role: EUserRole.admin,
    type: EUserType.saml
  },
  {
    name: 'Floyd Miles',
    photo: '',
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.admin,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: '',
    email: 'Darlene Robertson',
    number: '(209) 555-0104',
    group: 'Moderators Group 2',
    role: EUserRole.admin,
    type: EUserType.saml
  },
  {
    name: 'Floyd Miles',
    photo: '',
    email: 'Darlene Robertson',
    number: '(671) 555-0110',
    group: 'Moderators Group 1',
    role: EUserRole.admin,
    type: EUserType.ldap
  },
  {
    name: 'Darlene Robertson',
    photo: '',
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
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 2
          }}
        >
          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
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

          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography>Sort by:</Typography>

            <SearchInput />
            <PrimaryButton
              onClick={() => setState({ ...vState, openDlg: true })}
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
                <TableCell>
                  <Checkbox color="primary" checked={false} />
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
