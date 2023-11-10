import { AppBar, Toolbar, Box, Typography } from '@mui/material'
import * as React from 'react'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import Image from 'next/image'
import LogoImage from '../assets/images/logo.png'
import UserLogo from '../assets/images/Ellipse 1.png'
import {
  FileUpload,
  GridViewRounded,
  HeadsetMic,
  InsertDriveFileOutlined,
  MoreHoriz,
  Settings,
  Slideshow, Update,
} from '@mui/icons-material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TopButton from './styled/TopButton'




function UserAction() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHoriz className={'action-more-horiz'}></MoreHoriz>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Log Out</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
      </Menu>
    </div>
  );
}

const Header = () => {
  const router = useRouter()
  const [anchorState, setAnchorState] = React.useState<any | null>({
    btn1: null,
    btn2: null,
  })

  const handleClick = (e) => {
    setAnchorState({ [e.target.name]: e.currentTarget })
  }

  return (
    <AppBar
      position="relative"
      elevation={0}
      className={'top-header w-full'}
    >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#ececec',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {/*-----logo----*/}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <Box>
              <Image src={LogoImage} alt="logo"  />
            </Box>
          </Box>

          {/*----tool bar------*/}
          <Box className={'flex h-full justify-center item-center'} sx={{flexDirection: { xs: 'column', md: 'row' },}}>
            <Box>
              <TopButton>
                <GridViewRounded></GridViewRounded>
                <div>
                  Dashboard
                </div>
              </TopButton>
            </Box>
            <Box>
              <TopButton>
                <Slideshow></Slideshow>
                <div>
                  Videos
                </div>
              </TopButton>
            </Box>
            <Box>
              <TopButton>
                <InsertDriveFileOutlined></InsertDriveFileOutlined>
                <div>
                  Documents
                </div>
              </TopButton>
            </Box>
            <Box>
              <TopButton>
                <Update></Update>
                <div>
                  Reports
                </div>
              </TopButton>
            </Box>
            <Box>
              <TopButton>
                <HeadsetMic></HeadsetMic>
                <div>
                  Support
                </div>
              </TopButton>
            </Box>
            <Box>
              <TopButton>
                <Settings></Settings>
                <div>
                  Settings
                </div>
              </TopButton>
            </Box>
            <Box>
              <TopButton>
                <FileUpload></FileUpload>
                <div>
                  Upload
                </div>
              </TopButton>
            </Box>

            <Box className={'flex user-logo p-10'}>
              <Image src={UserLogo} alt="logo"  />
              <Box sx={{
                // display:{xs:'none', md:'flex'}
              }}>
                <div>Mathew Salomon</div>
                <div>Admin</div>
              </Box>
              <Box>
                <UserAction></UserAction>
              </Box>
            </Box>
          </Box>

        </Box>
    </AppBar>
  )
}

export default Header
