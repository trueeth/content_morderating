import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  SvgIcon,
  Typography
} from '@mui/material'
import * as React from 'react'
import Button from '@mui/material/Button'
import Image from 'next/image'
import LogoImage from '../assets/images/logo.png'
import UserLogo from '../assets/images/user.png'
import { MoreHoriz } from '@mui/icons-material'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TopButton from './styled/TopButton'
import { CHeaderTabs } from 'interfaces'
import { useDispatch } from 'react-redux'
import { openVideoUploadDialog } from '../store/reducers/dialog.reducers'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'
import useMounted from '../hooks/useMounted'
import { useState } from 'react'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'

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
  const hasMounted = useMounted()
  const isDesktop = useMediaQuery('(min-width: 1224px)')

  const router = useRouter()

  const [vState, setState] = useState({ mobileMenuOpen: false })

  const dispatch = useDispatch()

  const handleHeader = (title: string) => () => {
    switch (title) {
      case 'Upload':
        dispatch(openVideoUploadDialog({ open: true }))
        if (!isDesktop) setState({ ...vState, mobileMenuOpen: false })
        break
      default:
        router.push(`${title.toLowerCase()}`)
        if (!isDesktop) setState({ ...vState, mobileMenuOpen: false })
        break
    }
  }

  const handleMobileDrawer = (open: boolean) => () => {
    setState({ ...vState, mobileMenuOpen: open })
  }

  const HeaderDesktop = () => {
    return (
      <AppBar position="fixed" elevation={0} className={'top-header w-full'}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#ececec',
            flexDirection: { md: 'row' }
          }}
        >
          {/*-----logo----*/}
          <Box ml={4}>
            <Image src={LogoImage} alt="logo" />
          </Box>

          <Box
            className={'flex h-full justify-center item-center'}
            sx={{ flexDirection: { xs: 'column', md: 'row' } }}
          >
            {CHeaderTabs.map((item, index) => (
              <Box key={index} onClick={handleHeader(item.title)}>
                <TopButton
                  primary={item.title !== 'Upload'}
                  active={router.pathname === `/${item.title.toLowerCase()}`}
                >
                  <SvgIcon component={item.icon} />
                  <Typography ml={0.5}>{item.title}</Typography>
                </TopButton>
              </Box>
            ))}
          </Box>
          {/* ---- profile --- */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right',
              bgcolor: 'var(--Primary3)',
              width: '330px'
            }}
          >
            <Box sx={{ p: 2, display: 'flex' }}>
              <Image src={UserLogo} alt="logo" />
              <Box sx={{ ml: 1 }}>
                <Typography fontSize={14} whiteSpace="nowrap">
                  Mathew Salomon
                </Typography>
                <Typography fontSize={10}>Admin</Typography>
              </Box>
              <UserAction />
            </Box>
            <Box sx={{ px: 2, bgcolor: 'var(--Secondary)', py: 2.5 }}>
              <HeadsetMicIcon />
            </Box>
          </Box>
        </Box>
      </AppBar>
    )
  }

  const HeaderMobile = () => {
    return (
      <AppBar position="fixed" elevation={0} className={'top-header w-full'}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#ececec',
            flexDirection: { md: 'row' }
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleMobileDrawer(true)}
            edge="start"
            sx={{ ml: 2, ...(isDesktop && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="top"
            open={vState.mobileMenuOpen}
            onClose={handleMobileDrawer(false)}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: 'var(--Primary3)'
              }
            }}
          >
            {/*-----logo----*/}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 1,
                my: 2,
                '& .MuiBox-root': {
                  width: '150px'
                }
              }}
            >
              <Box>
                <Image src={LogoImage} alt="logo" />
              </Box>

              {CHeaderTabs.map((item, index) => (
                <Box key={index} onClick={handleHeader(item.title)}>
                  <TopButton
                    primary={item.title !== 'Upload'}
                    active={router.pathname === `/${item.title.toLowerCase()}`}
                  >
                    <SvgIcon component={item.icon} />
                    <Typography ml={0.5}>{item.title}</Typography>
                  </TopButton>
                </Box>
              ))}
            </Box>
          </Drawer>

          {/* ---- profile --- */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right',
              bgcolor: 'var(--Primary3)',
              maxWidth: '300px'
            }}
          >
            <Box sx={{ py: 2, px: 1, display: 'flex' }}>
              <Image src={UserLogo} alt="logo" />
              <Box sx={{ ml: 1 }}>
                <Typography fontSize={14} whiteSpace="nowrap">
                  Mathew Salomon
                </Typography>
                <Typography fontSize={10}>Admin</Typography>
              </Box>
            </Box>
            <Box sx={{ px: 1, bgcolor: 'var(--Secondary)', py: 2.5 }}>
              <HeadsetMicIcon />
            </Box>
          </Box>
        </Box>
      </AppBar>
    )
  }

  return (
    <React.Fragment>
      {hasMounted && isDesktop ? <HeaderDesktop /> : <HeaderMobile />}
    </React.Fragment>
  )
}

export default Header
