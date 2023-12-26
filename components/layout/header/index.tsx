import * as React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { openVideoUploadDialog } from '@store/reducers/dialog/reducers'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'
import useMounted from '@hooks/use-mounted'
import RowAction from '@components/multi-media/common/action-item'
import { openSnackbarInfo } from '@store/reducers/snackbar/reducers'
import { useTranslate } from '../../../locales'
import { useAuthContext } from '@components/auth/hooks/use-auth-context'
import HeaderDesktop from '@components/layout/header/header-desktop'
import HeaderMobile from '@components/layout/header/header-mobile'

export function UserAction() {
  const { logout } = useAuthContext()
  const { t } = useTranslate()

  const handleLogout = async () => {
    try {
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

  const handleHeader = async (title: string, url?: string) =>  {
    switch (title) {
      case 'Upload':
        dispatch(openVideoUploadDialog({ open: true }))
        if (!isDesktop) setState({ ...vState, mobileMenuOpen: false })
        break
      case 'Videos':
        await router.push({ pathname: `../${url.toLowerCase()}`, query: null })
        if (!isDesktop) setState({ ...vState, mobileMenuOpen: false })
        break
      case 'Dashboard':
        await router.push({ pathname: `../${url.toLowerCase()}`, query: null })
        if (!isDesktop) setState({ ...vState, mobileMenuOpen: false })
        break
      default:
        dispatch(openSnackbarInfo(t('This part will come soon')))
        break
    }
  }

  const handleMobileDrawer = (open: boolean) =>  {
    setState({ ...vState, mobileMenuOpen: open })
  }


  return (
    <React.Fragment>
      {
        hasMounted && isDesktop ?
          <HeaderDesktop username={username} handleHeader={handleHeader} /> :
          <HeaderMobile username={username} mobileMenuOpen={vState.mobileMenuOpen} handleMobileDrawer={handleMobileDrawer} handleHeader={handleHeader} />
      }
    </React.Fragment>
  )
}

export default Header
