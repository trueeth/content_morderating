import {
  AppBar,
  Box,
  ClickAwayListener,
  Drawer,
  Grow,
  IconButton,
  MenuList,
  Popper,
  SvgIcon,
  Typography
} from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import LogoImage from '../../public/assets/images/logo.png'
import UserLogo from '../../public/assets/images/user.png'
import { ExpandMore, Slideshow } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { TopButton } from '@components/common/styled-button'
import { CHeaderTabs } from '@interfaces/index'
import { useDispatch } from 'react-redux'
import { openVideoUploadDialog } from '@store/reducers/dialog/reducers'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'
import useMounted from '../../hooks/use-mounted'
import Paper from '@mui/material/Paper'
import { useAuthContext } from '@components/auth/hooks'
import RowAction from '@components/multi-media/common/action-item'
import { openSnackbarInfo } from '@store/reducers/snackbar/reducers'

function UserAction() {
  const { logout } = useAuthContext()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleLogout = async () => {
    try {
      setAnchorEl(null)
      await logout()
    } catch (error) {
      console.error(error)
    }
  }

  const rowActions = [
    {
      title: 'Log Out',
      action: handleLogout
    }
    // {
    //   title: 'Profile'
    // }
  ]

  return (
    <div>
      <RowAction actions={rowActions} sx={{ '& svg': { color: 'white' } }} />
    </div>
  )
}

const DropMenu = () => {
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const dispatch = useDispatch()
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  const handleMenuClose = (
    event: Event | React.SyntheticEvent,
    type: string
  ) => {
    router.push({ pathname: '../' + type.toLowerCase(), query: null })
    handleClose(event)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }
    prevOpen.current = open
  }, [open])
  return (
    <React.Fragment>
      <TopButton
        ref={anchorRef}
        id='composition-button'
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        main={true}
        active={
          router.pathname === `/videos` || router.pathname === `/documents`
        }
      >
        <SvgIcon component={Slideshow} />
        <Typography ml={0.5} className='menu-title'>Multimedia</Typography>
        <SvgIcon component={ExpandMore} className='ml-5' />
      </TopButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-start'
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}
          >
            <Paper
              sx={{
                marginLeft: 2
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='composition-menu'
                  aria-labelledby='composition-button'
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem className='menu-title' onClick={(e) => handleMenuClose(e, 'videos')}>
                    Videos
                  </MenuItem>
                  <MenuItem className='menu-title' onClick={(e) => handleMenuClose(e, 'documents')}>
                    Documents
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  )
}

const Header = () => {
  const hasMounted = useMounted()
  const isDesktop = useMediaQuery('(min-width: 1224px)')
  const username = localStorage.getItem('username')

  const router = useRouter()

  const [vState, setState] = useState({ mobileMenuOpen: false })

  const dispatch = useDispatch()

  const handleHeader = (title: string, url?: string) => () => {
    switch (title) {
      case 'Upload':
        dispatch(openVideoUploadDialog({ open: true }))
        if (!isDesktop) setState({ ...vState, mobileMenuOpen: false })
        break
      case 'Videos':
        router.push({ pathname: `../${url.toLowerCase()}`, query: null })
        if (!isDesktop) setState({ ...vState, mobileMenuOpen: false })
        break
      // default:
      //   router.push({pathname:`../${url.toLowerCase()}`, query:null})
      //   if (!isDesktop) setState({ ...vState, mobileMenuOpen: false })
      //   break
      default:
        dispatch(openSnackbarInfo('Sorry, this part will come soon.'))
        break
    }
  }

  const handleMobileDrawer = (open: boolean) => () => {
    setState({ ...vState, mobileMenuOpen: open })
  }

  const HeaderDesktop = () => {
    return (
      <AppBar
        position='fixed'
        elevation={0}
        sx={{ bgcolor: 'var(--Secondary)', width: '100%' }}
      >
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
            <Image src={LogoImage} alt='logo' />
          </Box>

          <Box
            className={'flex h-full justify-center item-center'}
            sx={{ flexDirection: { xs: 'column', md: 'row' } }}
          >
            {CHeaderTabs.map((item, index) => {
              if (item.title === 'Videos') {
                return <DropMenu key={index}></DropMenu>
              } else if (item.title === 'Documents') {
                return <div key={index} />
              } else {
                return (
                  <Box key={index} onClick={handleHeader(item.title, item.url)}>
                    <TopButton
                      main={'Upload' !== item.title}
                      active={
                        router.pathname === `/${item.title.toLowerCase()}`
                      }
                    >
                      <SvgIcon component={item.icon} />
                      <Typography ml={0.5} className='menu-title'>{item.title}</Typography>
                    </TopButton>
                  </Box>
                )
              }
            })}
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
              <Image src={UserLogo} alt='logo' />
              <Box sx={{ ml: 1 }}>
                {username && <Typography fontSize={14} whiteSpace='nowrap' width={120}>
                  {username}
                </Typography>}
                <Typography fontSize={10}>Admin</Typography>
              </Box>
              <UserAction />
            </Box>
            <Box sx={{ px: 2.5, bgcolor: 'var(--Secondary)', py: 2.5 }}>
              {/* <Image src={Headset} alt={'headset'} width={24}></Image> */}
            </Box>
          </Box>
        </Box>
      </AppBar>
    )
  }

  const HeaderMobile = () => {
    return (
      <AppBar
        position='fixed'
        elevation={0}
        sx={{ bgcolor: 'var(--Secondary)', width: '100%' }}
      >
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
            color='inherit'
            aria-label='open drawer'
            onClick={handleMobileDrawer(true)}
            edge='start'
            sx={{ ml: 2, ...(isDesktop && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor='top'
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
                <Image src={LogoImage} alt='logo' />
              </Box>

              {CHeaderTabs.map((item, index) => (
                <Box key={index} onClick={handleHeader(item.title, item?.url)}>
                  <TopButton
                    main={item.title !== 'Upload'}
                    active={router.pathname === `/${item.title.toLowerCase()}`}
                  >
                    <SvgIcon component={item.icon} />
                    <Typography ml={0.5} className='menu-title'>{item.title}</Typography>
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
              <Image src={UserLogo} alt='logo' />
              <Box sx={{ ml: 1 }}>
                {username && <Typography fontSize={14} whiteSpace='nowrap'>
                  {username}
                </Typography>}
                <Typography fontSize={10}>Admin</Typography>
              </Box>
            </Box>
            <Box sx={{ px: 1, bgcolor: 'var(--Secondary)', py: 2.5 }}>
              {/* <HeadsetMicIcon /> */}
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
