import { AppBar, Box, Typography } from '@mui/material'
import Image from 'next/image'
import LogoImage from '@public/assets/images/logo.png'
import { CHeaderTabs } from '@interfaces/constant'
import DropMenu from '@components/layout/header/drop-menu'
import { TopButton } from '@components/common/styled-button'
import SvgColor from '@components/common/svg-color'
import LanguagePopover from '@components/layout/header/language-popover'
import UserLogo from '@public/assets/images/user.png'
import * as React from 'react'
import { useRouter } from 'next/router'
import { useTranslate } from '../../../locales'
import { UserAction } from '@components/layout/header/index'


interface IProps {
  handleHeader:(key?:string, url?:string)=>void
  username:string
}

const HeaderDesktop = (props:IProps) => {

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
                <Box key={index} onClick={()=>props.handleHeader(item.key, item.url)}>
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
                        color: router.pathname === `/${item.url.toLowerCase()}` ? 'var(--Primary1)' : 'white'
                      }}
                    />
                    <Typography ml={0.5}
                                className='menu-title text-capitalize'>{t(item.title.toLowerCase())}</Typography>
                  </TopButton>
                </Box>
              )
            }
          })}
        </Box>
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

export default HeaderDesktop