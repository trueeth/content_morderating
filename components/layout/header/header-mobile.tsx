import { AppBar, Box, Drawer, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import LogoImage from '@public/assets/images/logo.png'
import { CHeaderTabs } from '@interfaces/constant'
import { TopButton } from '@components/common/styled-button'
import SvgColor from '@components/common/svg-color'
import LanguagePopover from '@components/layout/header/language-popover'
import UserLogo from '@public/assets/images/user.png'
import * as React from 'react'
import { useRouter } from 'next/router'
import { useTranslate } from '../../../locales'
import { UserAction } from '@components/layout/header/index'
import MenuIcon from '@mui/icons-material/Menu'


interface IProps {
  handleHeader:(key?:string, url?:string)=>void
  username:string
  mobileMenuOpen:boolean
  handleMobileDrawer:(open?:boolean)=>void
}

const HeaderMobile = (props:IProps) => {


  const router= useRouter()
  const {t}=useTranslate()


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
          onClick={()=>props.handleMobileDrawer(true)}
          edge='start'
          sx={{ ml: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor='top'
          open={props.mobileMenuOpen}
          onClose={()=>props.handleMobileDrawer(false)}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: 'var(--Primary3)'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 1,
              my: 2,
            }}
          >
            <Box>
              <Image src={LogoImage} alt='logo' />
            </Box>

            {CHeaderTabs.map((item, index) => (
              <Box key={index} onClick={()=>props.handleHeader(item.title, item?.url)}>
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
                      color: router.pathname === `/${item.url.toLowerCase()}` ? 'var(--Primary1)' : 'white'
                    }}
                  />
                  <Typography ml={0.5} className='menu-title'>{t(item.title.toLowerCase())}</Typography>
                </TopButton>
              </Box>
            ))}
          </Box>
        </Drawer>

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

          <Box
            sx={{
              p: {
                sm: 2,
                xs: 1
              },
              display: 'flex',

            }}>
            <Box
              className='user-logo'
            >
              <Image src={UserLogo} width={33} alt='logo' />
            </Box>
            <Box sx={{ ml: 2 }}>
              {props.username &&
                <Typography fontSize={14} whiteSpace='nowrap' width={70}
                            sx={{ fontWeight: '500 !important', textTransform: 'capitalize !important' }}>
                  {props.username}
                </Typography>}
              <Typography fontSize={10} sx={{ fontWeight: '400 !important' }} className='text-capitalize'>
                {t('admin')}
              </Typography>
            </Box>

            <UserAction />
          </Box>
        </Box>
      </Box>
    </AppBar>
  )
}

export default HeaderMobile