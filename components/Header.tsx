import { AppBar, Box, SvgIcon, Typography } from '@mui/material'
import * as React from 'react'
import Button from '@mui/material/Button'
import Image from 'next/image'
import LogoImage from '../assets/images/logo.png'
import UserLogo from '../assets/images/user.png'
import { MoreHoriz } from '@mui/icons-material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TopButton from './styled/TopButton'
import { CHeaderTabs } from 'interfaces'
import { useDispatch } from 'react-redux'
import { openVideoUploadDialog } from '../store/reducers/dialog.reducers'
import { useRouter } from 'next/router'

function UserAction() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHoriz sx={{ color: 'white' }}></MoreHoriz>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Log Out</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
      </Menu>
    </div>
  )
}

const Header = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleHeader = (title: string) => () => {
    switch (title) {
      case 'Upload':
        dispatch(openVideoUploadDialog({ open: true }))
        break
      default:
        router.push(`${title.toLowerCase()}`)
    }
  }

  return (
    <AppBar position="fixed" elevation={0} className={'top-header w-full'}>
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
        <Box ml={4}>
          <Image src={LogoImage} alt="logo" />
        </Box>

        {/*----tool bar------*/}
        <Box
          className={'flex h-full justify-center item-center'}
          sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        >
          {CHeaderTabs.map((item, index) => (
            <Box key={index} onClick={handleHeader(item.title)}>
              <TopButton>
                <SvgIcon component={item.icon} />
                <Typography ml={0.5}>{item.title}</Typography>
              </TopButton>
            </Box>
          ))}
        </Box>

        {/* ---- profile --- */}
        <Box className={'flex user-logo p-10'}>
          <Image src={UserLogo} alt="logo" />
          <Box sx={{ ml: 1 }}>
            <Typography fontSize={14}>Mathew Salomon</Typography>
            <Typography fontSize={10}>Admin</Typography>
          </Box>
          <Box>
            <UserAction />
          </Box>
        </Box>
      </Box>
    </AppBar>
  )
}

export default Header
