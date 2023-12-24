import { AppBar, Box, Drawer, IconButton, Typography } from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import LogoImage from '@public/assets/images/logo.png'
import UserLogo from '@public/assets/images/user.png'
import MenuIcon from '@mui/icons-material/Menu'
import { TopButton } from '@components/common/styled-button'
import { useDispatch } from 'react-redux'
import { openVideoUploadDialog } from '@store/reducers/dialog/reducers'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'
import useMounted from '@hooks/use-mounted'
import { useAuthContext } from '@components/auth/hooks'
import RowAction from '@components/multi-media/common/action-item'
import { openSnackbarInfo } from '@store/reducers/snackbar/reducers'
import SvgColor from '@components/common/svg-color'
import DropMenu from '@components/layout/header/drop-menu'
import LanguagePopover from '@components/layout/header/language-popover'
import { useTranslate } from '../../../locales'
import { CHeaderTabs } from '@interfaces/constant'

function UserAction() {
  const { logout } = useAuthContext()
  const {t}=useTranslate()
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleLogout = async () => {
    try {
      // setAnchorEl(null)
      await logout()
    } catch (error) {
      console.error(error)
    }
  }

  const rowActions = [
    {
      title: t('rowActions.log out'),
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


const Header = () => {

  const { t } = useTranslate()

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
      case 'Dashboard':
        router.push({ pathname: `../${url.toLowerCase()}`, query: null })
        if (!isDesktop) setState({ ...vState, mobileMenuOpen: false })
        break
      // default:
      //   router.push({pathname:`../${url.toLowerCase()}`, query:null})
      //   if (!isDesktop) setState({ ...vState, mobileMenuOpen: false })
      //   break
      default:
        dispatch(openSnackbarInfo(t('This part will come soon')))
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
          <Box ml={4} mr={2}>
            <Image src={LogoImage} alt='logo' />
          </Box>

          <Box
            className={'flex h-full justify-center item-center'}
            sx={{ flexDirection: { xs: 'column', md: 'row' } }}
          >
            {CHeaderTabs.map((item, index) => {
              if (item.key === 'Videos') {
                return <DropMenu key={index}></DropMenu>
              } else if (item.key === 'Documents') {
                return <div key={index} />
              } else {
                return (
                  <Box key={index} onClick={handleHeader(item.key, item.url)}>
                    <TopButton
                      main={'Upload' !== item.key}
                      active={
                        router.pathname === `/${item.url.toLowerCase()}`
                      }
                    >

                      <SvgColor
                        src={item.icon}
                        sx={{
                          width: 20,
                          height: 20,
                          flexShrink: 0,
                          color: router.pathname === `/${item.url.toLowerCase()}`?'var(--Primary1)':'white'
                        }}
                      />
                      <Typography ml={0.5} className='menu-title text-capitalize'>{t(item.title.toLowerCase())}</Typography>
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
              bgcolor: 'var(--Primary3)'
            }}
          >

            <Box sx={{ bgcolor: 'var(--Secondary)', display: 'flex' }}>
              <LanguagePopover />
            </Box>

            <Box sx={{ p: 2, display: 'flex' }}>
              <Box
                className='user-logo'
              >
                <Image src={UserLogo} width={33} alt='logo' />
              </Box>
              <Box sx={{ ml: 2 }}>
                {username &&
                  <Typography fontSize={14} whiteSpace='nowrap' width={70}
                              sx={{ fontWeight: '500 !important', textTransform: 'capitalize !important' }}>
                    {username}
                  </Typography>}
                <Typography fontSize={10} sx={{ fontWeight: '400 !important' }} className='text-capitalize'>
                  {t('admin')}
                </Typography>
              </Box>

              <UserAction />
            </Box>

            {/*<Box sx={{ px: 2.5, bgcolor: 'var(--Secondary)', py: 2.5 }}>
              <Image src={Headset} alt={'headset'} width={24}></Image>
            </Box>*/}
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
                    <SvgColor
                      src={item.icon}
                      sx={{
                        width: 20,
                        height: 20,
                        flexShrink: 0,
                        color: router.pathname === `/${item.url.toLowerCase()}`?'var(--Primary1)':'white'
                      }}
                    />
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
